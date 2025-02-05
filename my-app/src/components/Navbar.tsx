import "./Navbar.css"
import {FC} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';

export const Navbaar: FC = () => {
    return (
        <>
                <Navbar className="navbar-custom">
                    <Container>
                        <Nav>
                            <Nav.Link href="http://localhost:3000/">Главная</Nav.Link>
                            <Nav.Link href="http://localhost:3000/fines">Штрафы</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
        </>
    );
};