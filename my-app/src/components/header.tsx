import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { logoutUserAsync } from '../redux/userSlice';
import { ROUTES } from '../modules/Routes';

import "./Header.css";

const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Получаем состояние авторизации и имя пользователя из стора
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const username = useSelector((state: RootState) => state.user.login); // или state.user.login, если поле называется login

    // Обработчик выхода из системы
    const handleExit = async () => {
        await dispatch(logoutUserAsync());
        navigate(ROUTES.ALBUMS);
    };

    return (
        <header>
            <div className="header-container">
                <Link to="/">
                    <img
                        className="emblem"
                        src="http://127.0.0.1:9000/img/logo.png"
                        alt="Эмблема"
                    />
                </Link>
                <div className="title-container">
                    <h1>ГОСАВТОИНСПЕКЦИЯ</h1>
                </div>
                <img
                    className="map"
                    src="http://127.0.0.1:9000/img/russia.png"
                    alt="Карта"
                />
                {/* Отображение имени пользователя, если он авторизован */}
                {isAuthenticated && (
                    <NavLink to={ROUTES.ACCOUNT || "/account"} className='nav__link'>
                        {username}
                    </NavLink>
                )}
                {/* Блок для отображения кнопок авторизации */}
                <div className="auth-buttons">
                    {!isAuthenticated ? (
                        <Link to={ROUTES.LOGIN}>
                            <Button className="login-btn">Войти</Button>
                        </Link>
                    ) : (
                        <Button
                            variant="primary"
                            type="button"
                            className="login-btn"
                            onClick={handleExit}
                        >
                            Выйти
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
