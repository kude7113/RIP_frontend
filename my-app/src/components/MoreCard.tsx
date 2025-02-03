import { FC } from "react";
import { Card } from "react-bootstrap";
import "./MoreCard.css"; // Для стилизации
import image from "../DefaultImage.jpg";

interface ICardProps {
    imge: string;
    title: string;
    fullInf: string;
    price: number;
}

export const MoreCard: FC<ICardProps> = ({
                                             imge,
                                             title,
                                             fullInf,
                                             price,
                                         }) => {
    return (
        <Card className="card">
            <Card.Img className="cardImage" variant="top" src={imge || image} height={100} width={100}/>
            <Card.Body>
                <Card.Title className="textStyle">{title}</Card.Title>
                <Card.Text>
                    {fullInf}
                </Card.Text>
                <div className="cardPriceButtonWrapper">
                    <div className="cardPrice">{price} ₽</div>
                </div>
            </Card.Body>
        </Card>
    );
};