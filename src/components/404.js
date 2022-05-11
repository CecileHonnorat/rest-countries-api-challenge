import React from "react";
import '../App.css';
import { Container, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

import Header from "./Header";

export default function NotFound() {

    var background = {
        backgroundColor: 'hsl(0, 0%, 98%)',
        width: '100vw',
        paddingTop: '50px'
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
            <Button
                color="dark"
                outline
                onClick={routeChange}
            >
                Back
            </Button>
        </Container>
    )
}