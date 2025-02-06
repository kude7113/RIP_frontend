import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlbumPage } from "./pages/AlbumPage.tsx";
import FinesPage from "./pages/FinesPage.tsx";
import { ROUTES } from "./modules/Routes.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import Header from "./components/header.tsx";
import {Navbaar} from "./components/Navbar.tsx";
import {useEffect} from "react";

let invoke: any;

const tauriApi = (window as any).__TAURI__?.tauri;
if (tauriApi) {
    invoke = tauriApi.invoke;
} else {
    console.warn('Tauri API is not available');
    // Здесь можно определить альтернативное поведение, например, создать фиктивную функцию:
    invoke = () => Promise.resolve();
}


function App() {

    useEffect(() => {
        invoke('tauri', {cmd: 'create'})
            .then((response: any) => console.log(response))
            .catch((error: any) => console.log(error));
        return () => {
            invoke('tauri', {cmd: 'close'})
                .then((response: any) => console.log(response))
                .catch((error: any) => console.log(error));
        }
    }, []);

    return (
        <BrowserRouter>
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