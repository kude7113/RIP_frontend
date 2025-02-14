import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPollingResolutions, stopPollingResolutions, setFilters, setIsPolling } from '../redux/spResSlice.tsx';
import ResolutionCard from '../components/ResCard.tsx';
import './ResolutionsPage.css';
import { completeUpdateResolution } from '../redux/resolutionSlice.tsx';

const ResolutionsPage = () => {
    const dispatch = useDispatch();
    const { filters, resolutions, status, error } = useSelector(state => state.resolutions);

    // Локальное состояние для фильтров (даты, статус и фильтрация по имени)
    const [localDateFrom, setLocalDateFrom] = useState(filters.dateFrom);
    const [localDateTo, setLocalDateTo] = useState(filters.dateTo);
    const [localStatus, setLocalStatus] = useState(filters.status);
    const [userNameFilter, setUserNameFilter] = useState('');

    useEffect(() => {
        // Включаем polling при монтировании страницы
        dispatch(setIsPolling(true));
        dispatch(startPollingResolutions());
        return () => {
            // Останавливаем polling при размонтировании
            dispatch(stopPollingResolutions());
        };
    }, [dispatch]);

    const handleFinishResolution = (id) => {
        dispatch(completeUpdateResolution(id));
    };

    const handleSearch = () => {
        // Останавливаем polling, обновляем фильтры и перезапускаем polling
        dispatch(stopPollingResolutions());
        dispatch(setFilters({
            dateFrom: localDateFrom,
            dateTo: localDateTo,
            status: localStatus,
        }));
        dispatch(setIsPolling(true));
        dispatch(startPollingResolutions());
    };

    // Фильтрация по имени пользователя (frontend)
    const filteredResolutions = resolutions.filter(resolution => {
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
                    />
                </div>
                <div className="resolutions-page__filter-group">
                    <button className="resolutions-page__search-btn" onClick={handleSearch}>
                        Поиск
                    </button>
                </div>
            </div>

            <div className="resolution-cards-container">
                {status === 'failed' && <p>Ошибка: {error}</p>}
                {filteredResolutions.map(resolution => (
                    <ResolutionCard
                        key={resolution.Resolution_ID}
                        resolution={resolution}
                        onFinish={handleFinishResolution}
                    />
                ))}
            </div>
        </div>
    );
};

export default ResolutionsPage;
