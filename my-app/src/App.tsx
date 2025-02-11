//import './redux/axiosConfig.ts'; // Импортируем конфигурацию axios
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlbumPage } from "./pages/AlbumPage.tsx";
import FinesPage from "./pages/FinesPage.tsx";
import { ROUTES } from "./modules/Routes.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import Header from "./components/header.tsx";
import { Navbaar } from "./components/Navbar.tsx";
import LoginPage from "./pages/LoginPage.tsx";

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCredentials } from './redux/userSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('login');

        if (token && login) {
            dispatch(setCredentials({ token, login }));
        }
    }, [dispatch]);

    return (
        <BrowserRouter basename="/RIP_frontend">
            <Header />
            <Navbaar />
            <Routes>
                <Route path={ROUTES.HOME} index element={<HomePage />} />
                <Route path={ROUTES.ALBUMS} element={<FinesPage />} />
                <Route path={`${ROUTES.ALBUMS}/:id`} element={<AlbumPage />} />
                <Route path={`${ROUTES.LOGIN}`} element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
