import "./FinesPage.css";
import { Col, Row, Spinner } from "react-bootstrap";
import InputField from "../components/InputField.tsx";
import { BreadCrumbs } from "../components/BreadCrumbs.tsx";
import { ROUTES, ROUTE_LABELS } from "../modules/Routes.tsx";
import { FineCard } from "../components/FineCard.tsx";
import { useNavigate } from "react-router-dom";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../redux/store';
import { getFinesList } from "../redux/fineSlice.tsx";
import { DsFines } from "../api/Api.ts";

const FinesPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { searchValue, fines, loading, resCount, resId } = useSelector((state: RootState) => state.fines);
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    useEffect(() => {
        dispatch(getFinesList()); // отправляем `thunk`
    }, [dispatch]);


    const handleCardClick = (id: number) => {

        navigate(`${ROUTES.ALBUMS}/${id}`);
    };

    const handleBasketClick = (id: number) => {

        navigate(`${ROUTES.BASKET}/${id}`);
    };

    return (
        <div className="container">
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.ALBUMS }]} />

            <InputField value={searchValue} loading={loading} />

            {loading ? (
                <div className="loadingBg">
                    <Spinner animation="border" />
                </div>
            ) : fines.length === 0 ? (
                <div>
                    <h1>К сожалению, пока ничего не найдено :(</h1>
                </div>
            ) : (
                <Row
                    xs={1}
                    sm={2}
                    md={3}
                    lg={4}
                    className={`g-4 full-width-row ${
                        fines.length === 1 ? "justify-content-center" : "justify-content-evenly"
                    }`}
                >
                    {fines.map((item: DsFines) => (
                        <Col key={item.fineID} className="d-flex">
                            <FineCard
                                imge={item.imge ?? ""}
                                title={item.title ?? ""}
                                fullInf={item.fullInf ?? ""}
                                price={item.price ?? 0}
                                imageClickHandler={() => handleCardClick(item.fineID)}
                            />
                        </Col>
                    ))}
                </Row>
            )}

            <a id={`resID-`} className="cart-icon" onClick={() => handleBasketClick(resId)}>
                {(!isAuthenticated || !resId) ? null : (
                    <div>
                        <img src="https://www.svgrepo.com/show/133694/act.svg" alt="Корзина"/>
                        <span className="badge">{resCount}</span>
                    </div>
            )}

            </a>
        </div>
    );
};

export default FinesPage;
