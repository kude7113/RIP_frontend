import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchCart, deleteFinFromRes, deleteResolution } from "../redux/resolutionSlice"; // Добавили deleteResolution
import { BasketCard } from "../components/BasketCard.tsx";
import { Button, Spinner } from "react-bootstrap";
import "./BasketPage.css";
import { ROUTES } from "../modules/Routes.tsx";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Извлекаем состояние корзины из Redux
    const { cart, error, isLoading } = useSelector((state: RootState) => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        if (cart && cart.Fines.length === 0) {
            navigate(ROUTES.ALBUMS); // Редирект на главную, если корзина пуста
        }
    }, [cart, navigate]);

    if (error) return <div>Ошибка: {error}</div>;

    // Функция удаления штрафа
    const handleDeleteFine = (finReseId: number) => {
        console.log("Удаление штрафа с ID:", finReseId);
        dispatch(deleteFinFromRes(finReseId));
    };

    // ✅ Функция удаления всей резолюции (корзины)
    const handleDeleteResolution = async () => {
        await dispatch(deleteResolution()); // Удаляем резолюцию
        navigate(ROUTES.ALBUMS); // Перенаправляем на главную страницу
    };

    return (
        <div className="cart-page">
            {isLoading ? (
                <div className="album_page_loader_block">
                    <Spinner animation="border" />
                </div>
            ) : cart ? (
                <>
                    <div className="fine-cards-container">
                        {cart.Fines.map((item, index) => (
                            <BasketCard
                                key={index}
                                dopInf={item.fines.dopInf}
                                count={item.count}
                                imge={item.fines.imge}
                                title={item.fines.title}
                                fullInf={item.fines.fullInf}
                                price={item.fines.price}
                                imageClickHandler={() => console.log("Нажатие на штраф с ID:", item.fines.fineID)}
                                onDeleteClick={() => handleDeleteFine(item.fin_res_id)}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="album_page_loader_block">
                    <Spinner animation="border" />
                </div>
            )}

            {/* ✅ Форма для удаления всей резолюции */}
            <form className="delete-form" onSubmit={(e) => {
                e.preventDefault();
                handleDeleteResolution();
            }}>
                <Button type="submit" className="delete-btn">
                    <img src="https://www.svgrepo.com/show/488897/delete-2.svg" alt="Удалить" className="delete-icon" />
                </Button>
            </form>
        </div>
    );
};

export default CartPage;
