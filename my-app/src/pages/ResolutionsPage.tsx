// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPollingResolutions, stopPollingResolutions, setFilters, setIsPolling } from '../redux/spResSlice.tsx';
import ResolutionCard from '../components/ResCard.tsx';
import './ResolutionsPage.css';
import { completeUpdateResolution } from '../redux/resolutionSlice.tsx';
import { RootState } from "../redux/store.tsx";

const ResolutionsPage = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { filters, resolutions, status, error } = useSelector(state => state.resolutions);
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const username = useSelector((state: RootState) => state.user.login);

    // Локальное состояние для фильтров (даты, статус)
    const [localDateFrom, setLocalDateFrom] = useState(filters.dateFrom);
    const [localDateTo, setLocalDateTo] = useState(filters.dateTo);
    const [localStatus, setLocalStatus] = useState(filters.status);
    // Фильтр по пользователю доступен только для админа
    const [userNameFilter, setUserNameFilter] = useState('');

    useEffect(() => {
        dispatch(setIsPolling(true));
        // @ts-ignore
        dispatch(startPollingResolutions());
        return () => {
            // @ts-ignore
            dispatch(stopPollingResolutions());
        };
    }, [dispatch]);

    // @ts-ignore
    const handleFinishResolution = (id) => {
        // @ts-ignore
        dispatch(completeUpdateResolution(id));
    };

    // @ts-ignore
    const renderResolution = (resolution) => (
        <ResolutionCard
            key={resolution.Resolution_ID}
            resolution={resolution}
            onFinish={handleFinishResolution}
        />
    );

    const handleSearch = () => {
        // Останавливаем polling, обновляем фильтры и перезапускаем polling
        // @ts-ignore
        dispatch(stopPollingResolutions());
        dispatch(setFilters({
            dateFrom: localDateFrom,
            dateTo: localDateTo,
            status: localStatus,
        }));
        dispatch(setIsPolling(true));
        // @ts-ignore
        dispatch(startPollingResolutions());
    };

    // Фильтрация карточек:
    // Если пользователь не админ, показываем только его карточки.
    // Если админ, то дополнительно можно фильтровать по имени.
    const filteredResolutions = resolutions.filter(resolution => {
        if (!isAdmin) {
            return resolution.User.toLowerCase() === username.toLowerCase();
        }
        if (!userNameFilter) return true;
        return resolution.User.toLowerCase().includes(userNameFilter.toLowerCase());
    });

    return (
        <div className="resolutions-page">
            <div className="resolutions-page__filters">
                <div className="resolutions-page__filter-group">
                    <label>Дата от:</label>
                    <input
                        type="date"
                        className="resolutions-page__input"
                        value={localDateFrom}
                        onChange={(e) => setLocalDateFrom(e.target.value)}
                    />
                </div>
                <div className="resolutions-page__filter-group">
                    <label>Дата до:</label>
                    <input
                        type="date"
                        className="resolutions-page__input"
                        value={localDateTo}
                        onChange={(e) => setLocalDateTo(e.target.value)}
                    />
                </div>
                <div className="resolutions-page__filter-group">
                    <label>Статус:</label>
                    <select
                        className="resolutions-page__input"
                        value={localStatus}
                        onChange={(e) => setLocalStatus(e.target.value)}
                    >
                        <option value="">Все</option>
                        <option value="черновик">Черновик</option>
                        <option value="удален">Удален</option>
                        <option value="сформирован">Сформирован</option>
                        <option value="завершен">Завершен</option>
                        <option value="отклонен">Отклонен</option>
                        <option value="подтвержден">Подтвержден</option>
                    </select>
                </div>
                <div className="resolutions-page__filter-group">
                    <label>Пользователь:</label>
                    <input
                        type="text"
                        className="resolutions-page__input"
                        placeholder="Фильтр по имени"
                        value={userNameFilter}
                        onChange={(e) => setUserNameFilter(e.target.value)}
                        disabled={!isAdmin} // Доступно только для админа
                    />
                </div>
                <div className="resolutions-page__filter-group">
                    <button
                        className="resolutions-page__search-btn"
                        onClick={handleSearch}
                        disabled={!isAdmin} // Доступно только для админа
                    >
                        Поиск
                    </button>
                </div>
            </div>
            <div className="resolution-cards-container">
                {status === 'failed' && <p>Ошибка: {error}</p>}
                {filteredResolutions.map(renderResolution)}
            </div>
        </div>
    );
};

export default ResolutionsPage;
