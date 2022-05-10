import { Container, Input, Row, Col, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import CountriesCard from './CountriesCard';
import Header from './Header';

export default function Countries() {

    var background = {
        backgroundColor: 'hsl(0, 0%, 98%)',
        width: '100vw',
        paddingTop: '50px'
    }

    const [countriesList, setCountriesList] = useState([]);

    useEffect(() => {
        async function loadData() {
            var rawResponse = await fetch('/countries-list');
            var response = await rawResponse.json();
            setCountriesList(response.countries)
        }
        loadData();
    }, []);

    var countries = countriesList.map(function (country, i) {
        return (<CountriesCard key={i}
            countryName={country.name}
            countryPopulation={country.population}
            countryRegion={country.region}
            countryCapital={country.capital}
            countryFlag={country.flags.svg}
        />)
    })

    return (
        <Container fluid={true} style={background}>
            < Header />
            <div className='content' fluid >
                <Row style={{ margin: 25 }}>
                    <Col className='search' 
                        sm="4"
                        xs="6">
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ padding: '10', border: '1px solid grey' }} />
                        <Input
                            type="search"
                            placeholder='Search for a country...'
                        />
                    </Col>
                    <Col
                        style={{ margin: 25, alignItems: 'flex-end' }}
                    >
                        <Dropdown toggle={function noRefCheck() { }} >
                            <DropdownToggle caret>
                                Filter by Region
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    Africa
                                </DropdownItem>
                                <DropdownItem>
                                    America
                                </DropdownItem>
                                <DropdownItem>
                                    Asia
                                </DropdownItem>
                                <DropdownItem>
                                    Europe
                                </DropdownItem>
                                <DropdownItem>
                                    Oceania
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row xs="1" lg="2" xl="4" style={background}>
                    {countries}
                </Row>
            </div>
        </Container>
    )
}