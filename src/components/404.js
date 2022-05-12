import React from "react";
import '../App.css';
import { Container, Button, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import Header from "./Header";

export default function NotFound() {

    const darkMode = useSelector(state => state.selectedMode)

    var background = {
        backgroundColor: (darkMode ? "hsl(207, 26%, 17%)" : "hsl(0, 0%, 98%)"),
        width: '100vw',
        paddingTop: '50px',
        color: (darkMode ? 'hsl(0, 0%, 100%)' : "hsl(200, 15%, 8%)")
    }

    // Go Back Button
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <Container fluid={true} style={background} className="NotFound">
            < Header />
            <h1>SORRY ! THERE'S NOTHING HERE !</h1>
            <h1>ARE YOU LOST ?</h1>
            <Col className="backButton" md='2' style={{ backgroundColor: darkMode ? 'hsl(209, 23%, 22%)' : "hsl(0, 0%, 100%)" }}>
                <FontAwesomeIcon icon={faArrowLeft} color={darkMode ? 'hsl(0, 0%, 100%)' : "hsl(200, 15%, 8%)"} />
                <Button
                    color="white"
                    onClick={routeChange}
                    style={{ border: 'none', width: '100%', color: (darkMode ? 'hsl(0, 0%, 100%)' : "hsl(200, 15%, 8%)") }}
                >
                    Back
                </Button>
            </Col>
        </Container>
    )
}