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
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [region, setRegion] = useState("");

    // Get countries 
    useEffect(() => {
        async function loadData() {
            var rawResponse = await fetch('https://restcountries.com/v2/all');
            var response = await rawResponse.json();
            setCountriesList(response)
        }
        loadData();
    }, []);

    let filteredCountries = countriesList;
    if (region === "Africa"){
       filteredCountries = countriesList.filter(e => e.region ==="Africa")
    }
    if (region === "America"){
        filteredCountries = countriesList.filter(e => e.region ==="America")
     }
     if (region === "Asia"){
        filteredCountries = countriesList.filter(e => e.region ==="Asia")
     }
     if (region === "Europe"){
        filteredCountries = countriesList.filter(e => e.region ==="Europe")
     }
     if (region === "Oceania"){
        filteredCountries = countriesList.filter(e => e.region ==="Oceania")
     }

    // Display Countries' Info
    var countries = filteredCountries.map(function (country, i) {
        return (<CountriesCard key={i}
            countryName={country.name}
            countryPopulation={country.population}
            countryRegion={country.region}
            countryCapital={country.capital}
            countryFlag={country.flags.svg}
        />)
    })

    // Open dropdown
    const toggle = () => {
        setDropdownOpen(!dropdownOpen)
    }
 

    console.log(region)
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
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                            <DropdownToggle caret color='light' style={{border:'1px solid grey'}}>
                                Filter by Region
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => setRegion("Africa")}> 
                                    Africa
                                </DropdownItem>
                                <DropdownItem onClick={() => setRegion("America")}>
                                    America
                                </DropdownItem>
                                <DropdownItem onClick={() => setRegion("Asia")}>
                                    Asia
                                </DropdownItem>
                                <DropdownItem onClick={() => setRegion("Europe")}>
                                    Europe
                                </DropdownItem>
                                <DropdownItem onClick={() => setRegion("Oceania")}>
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