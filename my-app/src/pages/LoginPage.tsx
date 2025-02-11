import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.tsx';
import { loginUserAsync } from '../redux/userSlice.tsx';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../modules/Routes.tsx';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Используем ключ "login", чтобы он совпадал с ожидаемым типом в срезе
    const [formData, setFormData] = useState({ login: '', password: '' });
    const error = useSelector((state: RootState) => state.user.error);

    // Обработчик изменения полей ввода
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Обработчик отправки формы авторизации
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.login && formData.password) {
            // Диспатчим асинхронный экшен для логина
            const resultAction = await dispatch(loginUserAsync(formData));

            // Если логин прошёл успешно, можно перейти на нужную страницу
            // (в данном примере — на страницу, заданную ROUTES.CITIES)
            if (loginUserAsync.fulfilled.match(resultAction)) {
                navigate(ROUTES.ALBUMS);
            }
        }
    };

    return (
        <Container style={{ maxWidth: '100%', marginTop: '0' }}>
            <Container style={{ maxWidth: '400px', marginTop: '150px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Авторизация
                </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="login" style={{ marginBottom: '15px' }}>
                        <Form.Label>Логин</Form.Label>
                        <Form.Control
                            type="text"
                            name="login"
                            value={formData.login}
                            onChange={handleChange}
                            placeholder="Введите логин"
                        />
                    </Form.Group>
                    <Form.Group controlId="password" style={{ marginBottom: '20px' }}>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Введите пароль"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ width: '100%' }}>
                        Войти
                    </Button>
                </Form>
            </Container>
        </Container>
    );
};

export default LoginPage;
