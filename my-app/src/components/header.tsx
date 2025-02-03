import "./Header.css"; // Подключение CSS для стилей

const Header = () => {
    return (
        <header>
            <div className="header-container">
                <a href="http://localhost:3000/">
                    <img
                        className="emblem"
                        src="http://127.0.0.1:9000/img/logo.png"
                        alt="Эмблема"
                    />
                </a>
                <div className="title-container">
                    <h1>ГОСАВТОИНСПЕКЦИЯ</h1>
                </div>
                <img
                    className="map"
                    src="https://static.overlay-tech.com/assets/a3d45847-30bf-45d6-a6be-f42cf7f962a6.png"
                    alt="Карта"
                />
            </div>
        </header>
    );
};

export default Header;
