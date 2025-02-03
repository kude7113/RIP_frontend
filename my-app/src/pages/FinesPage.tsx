import "./FinesPage.css";
import { Col, Row, Spinner } from "react-bootstrap";
import { Fine, getFinesByName } from "../modules/itunesApi.ts";
import  InputField  from "../components/InputField.tsx";
import { BreadCrumbs } from "../components/BreadCrumbs.tsx";
import { ROUTES, ROUTE_LABELS } from "../modules/Routes.tsx";
import { FineCard } from "../components/FineCard.tsx";
import { useNavigate } from "react-router-dom";
import { ALBUMS_MOCK } from "../modules/mock.ts";
import { FC, useEffect, useState } from "react";


const FinesPage: FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [fines, setfines] = useState<Fine[]>([]);
    const [basket, setBasket] = useState(0)

    const navigate = useNavigate();

    const handleSearch = () => {
        setLoading(true);
        getFinesByName(searchValue)
            .then((response) => {
                setfines(
                    response.fines
                );
                setLoading(false);
                setBasket(response.resCount)
            })
            .catch(() => {
                const filteredMockData = ALBUMS_MOCK.fines.filter((item: Fine) =>
                    item.title
                        .toLocaleLowerCase()
                        .startsWith(searchValue.toLocaleLowerCase())
                );
                console.log("Filtered mock data:", filteredMockData);
                setfines(filteredMockData);
                setLoading(false);
                setBasket(ALBUMS_MOCK.resCount)
            });

    };

    useEffect(() => {
        console.log("Updated fines state:", fines);
    }, [fines]);

    useEffect(() => {
        handleSearch();
    }, []);

    const handleCardClick = (id: number) => {
        // клик на карточку, переход на страницу альбома
        navigate(`${ROUTES.ALBUMS}/${id}`);
    };

    return (
        <div className="container">
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ALBUMS}]}/>

            <InputField
                value={searchValue}
                setValue={(value) => setSearchValue(value)}
                loading={loading}
                onSubmit={handleSearch}
            />

            {loading && ( // здесь можно было использовать тернарный оператор, но это усложняет читаемость
                <div className="loadingBg">
                    <Spinner animation="border"/>
                </div>
            )}
            {!loading &&
                (!fines.length /* Проверка на существование данных */ ? (
                    <div>
                        <h1>К сожалению, пока ничего не найдено :(</h1>
                    </div>
                ) : (
                    <Row xs={1} sm={2} md={4} className="g-4 full-width-row">
                        {fines.map((item, index) => (
                            <Col key={index}>
                                <FineCard
                                    imageClickHandler={() => handleCardClick(item.fineID)}
                                    {...item}
                                />
                            </Col>
                        ))}
                    </Row>
                ))}
            <a id="{{ .resID }}" className="cart-icon">
                <img src="https://www.svgrepo.com/show/133694/act.svg" alt="Корзина"/>
                <span className="badge">{basket}</span>
            </a>
        </div>
    );
};

export default FinesPage;