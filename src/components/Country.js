import React from "react";
import '../App.css';
import { Button, Container, Col, Row, List, Spinner } from "reactstrap";
import { useEffect, useState } from 'react';
import Header from "./Header";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from "react-redux";

export default function Country(props) {

    const darkMode = useSelector(state => state.selectedMode)

    var background = {
        backgroundColor: (darkMode ? "hsl(207, 26%, 17%)" : "hsl(0, 0%, 98%)"),
        minHeight:'100vh',
        paddingTop: '50px',
        color: (darkMode ? 'hsl(0, 0%, 100%)' :  "hsl(200, 15%, 8%)")
    }

    const [countryInfo, setCountryInfo] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [borders, setBorders] = useState([]);

   let param = useParams();

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

    let displayInfo;
    if (dataLoaded !== true) {
                displayInfo =
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner>
                        Loading...
                    </Spinner>
                </div>            
        } else {
        displayInfo = (
            <div >
                <Row className='CountryInfo'>
                    <Col md="6" style={{display:"flex", alignItems:'center', justifyContent:'center'}}>
                        <img src={countryInfo.flags.png} alt='flag' width="350" ></img>
                    </Col>

                    <Col md='6'>
                        <h2 style={{fontWeight:800, marginBottom:25}}>{countryInfo.name.common}</h2>
                        <div className="listInfo">
                            <List type="unstyled" style={{marginRight: "10rem"}}>
                            <li>
                                <span style={{ fontWeight: 600 }}>Native Name : </span> {Object.values(countryInfo.name.nativeName)[0].common}
                            </li>
                            <li>
                                <span style={{ fontWeight: 600 }}>Population :</span>  {countryInfo.population.toLocaleString("en-US")}
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
                        </List>
                        </div>
                        <div className="borders">
                        <span style={{ fontWeight: 600 }}>Border Countries : </span>
                            {borders.map((border, i) => (
                                <Link to={`/country-info/${border}`} key={border}>
                                    <Button outline size="sm"
                                    style={{fontWeight:600, margin:3, color: (darkMode ? 'hsl(0, 0%, 100%)' :  "hsl(200, 15%, 8%)")}}>
                                        {border}
                                    </Button>
                                </Link>

                            ))}
                        </div>
             </Col>
                </Row>
            </div>
        )
    }

    return (
        <Container fluid style={background}>
            < Header />
            <div className='content' >
                <Row style={{ margin: 55 }}>
                    <Col className="backButton" md='2' style={{backgroundColor: darkMode ? 'hsl(209, 23%, 22%)' :  "hsl(0, 0%, 100%)"}}>
                        <FontAwesomeIcon icon={faArrowLeft} color={darkMode ? 'hsl(0, 0%, 100%)' :  "hsl(200, 15%, 8%)"}/>
                        <Button
                            color="white"
                            onClick={routeChange}
                            style={{border:'none', width:'100%', color:(darkMode ? 'hsl(0, 0%, 100%)' :  "hsl(200, 15%, 8%)")}}
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