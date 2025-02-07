import React from 'react'
import ReactDOM from 'react-dom/client'
import  App   from "./App.tsx"
import 'bootstrap/dist/css/bootstrap.min.css'
import {registerSW} from "virtual:pwa-register";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
    registerSW();
}