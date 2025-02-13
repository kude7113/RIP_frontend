import { FC } from "react";
import "./BasketCard.css";
import image from "../DefaultImage.jpg";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";

interface IBasketCardProps {
    dopInf: string;
    imge: string;
    title: string;
    fullInf: string;
    price: number;
    count?: number;
    id: string;
    imageClickHandler: () => void;
    onDeleteClick: () => void; /* Функция для удаления */
}

export const BasketCard: FC<IBasketCardProps> = ({
                                                     dopInf,
                                                     imge,
                                                     title,
                                                     price,
                                                     count,
                                                     id,
                                                     imageClickHandler,
                                                     onDeleteClick
                                                 }) => {
    return (
        <div className="basketCardContainer" id={id}>
            <div className="basketCardImage" onClick={imageClickHandler}>
                <img
                    className="basketCardImg"
                    src={imge || image}
                    alt={title}
                />
            </div>

            <div className="basketCardContent">
                <h5 className="basketCardTitle">{title}</h5>
                <div className="basketCardButtonWrapper">
                    <a href={`http://localhost:8080/more/${id}`} className="basketCardLink">
                        Подробнее
                    </a>
                    <button className="basketCardDelete" onClick={onDeleteClick}>
                        Удалить
                    </button>
                </div>
            </div>

            <div className="basketCardInfo">
                <p>{dopInf} {count}</p>
                <div className="basketCardPrice">{price} ₽</div>
            </div>
        </div>
    );
};
