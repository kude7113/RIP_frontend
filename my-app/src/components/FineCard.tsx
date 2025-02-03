import {FC} from "react";
import {Button, Card} from "react-bootstrap";
import "./FineCard.css"; // Для стилизации
import image from "../DefaultImage.jpg";

interface ICardProps {
    imge: string,
    title: string,
    fullInf: string,
    price: number,
    imageClickHandler: () => void;
}

export const FineCard: FC<ICardProps> = ({
                                             imge,
                                             title,
                                             price,
                                             imageClickHandler
                                         }) => {
    return (
        <Card className="fineCard">
            <Card.Img className="cardImage" variant="top" src={imge || image} height={100} width={100} onClick={imageClickHandler}/>
            <Card.Body>
                <Card.Title className="textStyle">{title}</Card.Title>
                <div className="cardPriceButtonWrapper">
                    <div className="cardPrice">{price} ₽</div>
                    <Button className="cardButton" onClick={imageClickHandler}>
                        Подробнее
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};
