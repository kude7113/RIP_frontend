import "./Header.css";
import {Link} from "react-router-dom"; // Подключение CSS для стилей


const Header = () => {
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
            </div>
        </header>
    );
};

export default Header;
