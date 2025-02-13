import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import "./FineCard.css";
import image from "../DefaultImage.jpg";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";

interface ICardProps {
    imge: string;
    title: string;
    fullInf: string;
    price: number;
    imageClickHandler: () => void;
    buttonClickHandler: () => void;

}



export const FineCard: FC<ICardProps> = ({
                                             imge,
                                             title,
                                             price,
                                             imageClickHandler,
                                             buttonClickHandler,
                                         }) => {

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    return (
        <Card className="fineCard">
            <Card.Img className="cardImage" variant="top" src={imge || image} onClick={imageClickHandler} />
            <Card.Body className="cardBody">
                <Card.Title className="textStyle">{title}</Card.Title>
                <div className="cardPriceButtonWrapper">
                    <div className="cardPrice">{price} ₽</div>
                    {(!isAuthenticated) ? null : (
                        <Button className="cardButton" onClick={buttonClickHandler}>
                            Добавить
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};
