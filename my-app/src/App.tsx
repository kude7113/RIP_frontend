import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlbumPage } from "./pages/AlbumPage.tsx";
import FinesPage from "./pages/FinesPage.tsx";
import { ROUTES } from "./modules/Routes.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import Header from "./components/header.tsx";
import {Navbaar} from "./components/Navbar.tsx";



function App() {
    return (
        <BrowserRouter basename="/RIP_frontend">
            <Header/>
            <Navbaar/>
            <Routes>
                <Route path={ROUTES.HOME} index element={<HomePage />} />
                <Route path={ROUTES.ALBUMS} element={<FinesPage />} />
                <Route path={`${ROUTES.ALBUMS}/:id`} element={<AlbumPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;