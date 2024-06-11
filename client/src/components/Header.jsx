import React from "react";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./Header.css";

function Header() {
    return (
        <Navbar expand="sm" className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand>
                    <Link to='/'>
                        <img
                            src="../SparksBankLogo_Transparent.png"
                            alt="Sparks Bank Logo"
                            className="logo logo-large"
                        />
                        <img
                            src="../SparksBankLogo2_Transparent.png"
                            alt="Sparks Bank Logo"
                            className="logo logo-small"
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-sm"
                    aria-labelledby="offcanvasNavbarLabel-expand-sm"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
                            <img
                                src="../SparksBankLogo_Transparent.png"
                                alt="Sparks Bank Logo"
                                className="logo"
                                style={{ width: "25vh" }}
                            />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <img className="logo" style={{ width: "6vh" }} src="../TheSparksFoundationsLogo.png" alt="Sparks Foundation Logo"></img>
                            <Nav.Link href="https://www.thesparksfoundationsingapore.org/" target="_blank">Home</Nav.Link>
                            <Nav.Link href="https://internship.thesparksfoundation.info/" target="_blank">Internships</Nav.Link>
                            <Nav.Link href="https://www.thesparksfoundationsingapore.org/contact-us/" target="_blank">Contact Us</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;
