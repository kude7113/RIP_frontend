import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../modules/Routes.tsx";
import { Button, Container } from "react-bootstrap";
import "./HomePage.css"; // Подключаем стили

export const HomePage: FC = () => {
    return (
        <Container className="home-container">
            <p className="home-text">
                Добро пожаловать в <b>ГОСАВТОИНСПЕКЦИЮ!</b> <br />
                Здесь вы можете найти штрафы на любой вкус.
            </p>
            <Link to={ROUTES.ALBUMS}>
                <Button className="home-button">Просмотреть штрафы</Button>
            </Link>
        </Container>
    );
};
