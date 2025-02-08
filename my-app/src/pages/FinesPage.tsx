import "./FinesPage.css";
import { Col, Row, Spinner } from "react-bootstrap";
import { Fine, getFinesByName } from "../modules/itunesApi.ts";
import InputField from "../components/InputField.tsx";
import { BreadCrumbs } from "../components/BreadCrumbs.tsx";
import { ROUTES, ROUTE_LABELS } from "../modules/Routes.tsx";
import { FineCard } from "../components/FineCard.tsx";
import { useNavigate } from "react-router-dom";
import { ALBUMS_MOCK } from "../modules/mock.ts";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const FinesPage: FC = () => {
    const searchValue = useSelector((state: RootState) => state.search.value);
    const [loading, setLoading] = useState(false);
    const [fines, setFines] = useState<Fine[]>([]);
    const [basket, setBasket] = useState(0);

    const navigate = useNavigate();

    const handleSearch = () => {
        setLoading(true);
        getFinesByName(searchValue)
            .then((response) => {
                setFines(response.fines);
                setLoading(false);
                setBasket(response.resCount);
            })
            .catch(() => {
                const filteredMockData = ALBUMS_MOCK.fines.filter((item: Fine) =>
                    item.title.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase())
                );
                setFines(filteredMockData);
                setLoading(false);
                setBasket(ALBUMS_MOCK.resCount);
            });
    };

    useEffect(() => {
        handleSearch();
    }, []);

    const handleCardClick = (id: number) => {
        navigate(`${ROUTES.ALBUMS}/${id}`);
    };

    return (
        <div className="container">
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.ALBUMS }]} />

            <InputField onSubmit={handleSearch} loading={loading} />

            {loading ? (
                <div className="loadingBg">
                    <Spinner animation="border" />
                </div>
            ) : !fines.length ? (
                <div>
                    <h1>К сожалению, пока ничего не найдено :(</h1>
                </div>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} className={`g-4 full-width-row ${fines.length === 1 ? "justify-content-center" : "justify-content-evenly"}`}>
                    {fines.map((item, index) => (
                        <Col key={index} className="d-flex">
                            <FineCard imageClickHandler={() => handleCardClick(item.fineID)} {...item} />
                        </Col>
                    ))}
                </Row>
            )}

            <a id="{{ .resID }}" className="cart-icon">
                <img src="https://www.svgrepo.com/show/133694/act.svg" alt="Корзина" />
                <span className="badge">{basket}</span>
            </a>
        </div>
    );
};

export default FinesPage;
