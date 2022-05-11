import React from 'react';
import { Container, Col, Row, Navbar } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

export default function Header() {

    return (
        <Container className="header" fluid>
            <Row>
            <Navbar color="white"
                fixed="top"
                light>
                <Col className='title'>
                    <h4 style={{fontWeight:800}}>Where In The World?</h4>
                </Col>
                <Col className="mode">
                    <FontAwesomeIcon
                        icon={faMoon}
                    />
                    <h6 style={{ marginLeft: '10px', fontWeight:600 }}>Dark Mode</h6>
                </Col>
            </Navbar>
            </Row>
        </Container>
    )
}