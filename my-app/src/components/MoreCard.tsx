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
        <Card className="moreCard">
            <Card.Img
                className="moreCardImage"
                variant="top"
                src={imge || image}
                height={100}
                width={100}
            />
            <Card.Body>
                <Card.Title className="textStyleMore">{title}</Card.Title>
                <Card.Text className="detailedDescription">
                    {fullInf}
                </Card.Text>
                <div className="moreCardPriceButtonWrapper">
                    <div className="moreCardPrice">Штраф: {price} ₽</div>
                </div>
            </Card.Body>
        </Card>
    );
};
