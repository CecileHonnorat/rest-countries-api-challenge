import React from "react";
import '../App.css';
import { Button, Container, Col, Row, List } from "reactstrap";
import { useEffect, useState } from 'react';
import Header from "./Header";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Country(props) {

    var background = {
        backgroundColor: 'hsl(0, 0%, 98%)',
        width: '100vw',
        height: '100vh',
        paddingTop: '50px'
    }

    const [countryInfo, setCountryInfo] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [borders, setBorders] = useState([]);

   let param = useParams();
    console.log(param)

    // Go Back Button
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    // Load info
    useEffect(() => {
        const loadData = async () => {
            var rawResponse = await fetch(`https://restcountries.com/v3.1/name/${param.name}`);
            var response = await rawResponse.json();
            let bordersCode = response[0].borders;
            let bordersName = []
            if (bordersCode) {
                for (let i = 0; i < bordersCode.length; i++) {
                    let countryCode = bordersCode[i];
                    let codeData = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
                    let borderData = await codeData.json();
                    bordersName.push(borderData[0].name.common)
                }
            }
            setCountryInfo(response[0])
            setBorders(bordersName)
            setDataLoaded(true)
        }
        loadData();
    }, [param.name]);

    console.log(countryInfo)
    console.log(borders)
    let displayInfo;
    if (dataLoaded === true) {
        displayInfo = (
            <div className='CountryInfo'>
                <Row>
                    <Col sm="6">
                        <img src={countryInfo.flags.png} alt='flag'></img>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 style={{fontWeight:800}}>{countryInfo.name.common}</h2>
                        <List type="unstyled">
                            <li>
                                <span style={{ fontWeight: 600 }}>Native Name : </span> {Object.values(countryInfo.name.nativeName)[0].common}
                            </li>
                            <li>
                                <span style={{ fontWeight: 600 }}>Population :</span>  {countryInfo.population.toLocaleString("en-IN")}
                            </li>
                            <li>
                                <span style={{ fontWeight: 600 }}>Region : </span> {countryInfo.region}
                            </li>
                            <li>
                                <span style={{ fontWeight: 600 }}>Sub Region : </span> {countryInfo.subregion}
                            </li>
                            <li>
                                <span style={{ fontWeight: 600 }}>Capital :</span>  {countryInfo.capital}
                            </li>
                        </List>
                    </Col>
                    <Col>
                        <List type="unstyled">
                            <li>
                                <span style={{ fontWeight: 600 }}>Top Level Domain : </span> {countryInfo.tld.join(", ")}
                            </li>
                            <li>
                                <span style={{ fontWeight: 600 }}>Currencies : </span> {Object.values(countryInfo.currencies)[0].name}
                            </li>
                            <li>
                                <span style={{ fontWeight: 600 }}>Languages : </span> {Object.values(countryInfo.languages).join(", ")}
                            </li>
                        </List></Col>
                    <Row>
                        <Col>
                            <span style={{ fontWeight: 600 }}>Border Countries : </span>
                            {borders.map((border, i) => (
                                <Link to={`/country-info/${border}`} key={border}>
                                    <Button outline size="sm"
                                    style={{fontWeight:600, margin:3}}>
                                        {border}
                                    </Button>
                                </Link>

                            ))}
                        </Col>
                    </Row>
                </Row>
            </div>
        )
    }

    console.log(countryInfo)
    return (
        <Container fluid style={background}>
            < Header />
            <div className='content' >
                <Row style={{ margin: 125 }}>
                    <Col className="backButton" md='2'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <Button
                            color="white"
                            onClick={routeChange}
                            style={{border:'none', width:'100%'}}
                        >
                            Back
                        </Button>
                    </Col>
                </Row>
                {displayInfo}
            </div>
        </Container>
    )
}