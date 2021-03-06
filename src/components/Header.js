import React, { useState } from 'react';
import { Container, Col, Row, Navbar } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {

    const [isDarkMode, setIsDarkMode] = useState(false)

    const dispatch = useDispatch()
    const darkMode = useSelector(state => state.selectedMode)

    var hand = {
        cursor: "pointer"
    }
    return (
        <Container className="header" fluid>
            <Row>
                <Navbar
                    fixed="top"
                    color={darkMode ? "dark" : "white"}
                    light
                >
                    <Col className='title'>
                        <h4 style={{ fontWeight: 800, color:(darkMode ? 'hsl(0, 0%, 100%)' :  "hsl(200, 15%, 8%)")}}>Where in the world?</h4>
                    </Col>
                            <Col className="mode"
                                onClick={() => {
                                    setIsDarkMode(!isDarkMode);
                                    dispatch({type: 'changeMode', selected : darkMode})
                                    console.log("click ok")
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={darkMode ? faSun : faMoon}
                                    color={darkMode ? 'hsl(0, 0%, 100%)' :  "hsl(200, 15%, 8%)"}
                                    {...hand}
                                />
                                <h6 style={{ marginLeft: '10px', fontWeight: 600, color:(darkMode ? 'hsl(0, 0%, 100%)' :  "hsl(200, 15%, 8%)") }} {...hand}>Dark Mode</h6>
                            </Col>  
                </Navbar>
            </Row>
        </Container>
    )
}