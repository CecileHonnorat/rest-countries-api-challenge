import React from "react";
import '../App.css';
import { Button, Container, Col, Row, List } from "reactstrap";
import { useEffect, useState } from 'react';
import Header from "./Header";
import { useParams, useNavigate, Link } from "react-router-dom";

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
                    <Col>
                        <img src={countryInfo.flags.png} alt='flag'></img>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>{countryInfo.name.common}</h2>
                        <List type="unstyled">
                            <li>
                                <span style={{ fontWeight: 'bold' }}>Native Name : </span> {Object.values(countryInfo.name.nativeName)[0].common}
                            </li>
                            <li>
                                <span style={{ fontWeight: 'bold' }}>Population :</span>  {countryInfo.population.toLocaleString("en-IN")}
                            </li>
                            <li>
                                <span style={{ fontWeight: 'bold' }}>Region : </span> {countryInfo.region}
                            </li>
                            <li>
                                <span style={{ fontWeight: 'bold' }}>Sub Region : </span> {countryInfo.subregion}
                            </li>
                            <li>
                                <span style={{ fontWeight: 'bold' }}>Capital :</span>  {countryInfo.capital}
                            </li>
                        </List>
                    </Col>
                    <Col>
                        <List>
                            <li>
                                <span style={{ fontWeight: 'bold' }}>Top Level Domain : </span> {countryInfo.tld.join(", ")}
                            </li>
                            <li>
                                <span style={{ fontWeight: 'bold' }}>Currencies : </span> {Object.values(countryInfo.currencies)[0].name}
                            </li>
                            <li>
                                <span style={{ fontWeight: 'bold' }}>Languages : </span> {Object.values(countryInfo.languages).join(", ")}
                            </li>
                        </List></Col>
                    <Row>
                        <Col>
                            <span style={{ fontWeight: 'bold' }}>Border Countries : </span>
                            {borders.map((border, i) => (
                                <Link to={`/country-info/${border}`} key={border}>
                                    <Button outline size="sm">
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
                    <Col>
                        <Button
                            color="dark"
                            outline
                            onClick={routeChange}
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