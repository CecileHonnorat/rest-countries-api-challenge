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
    const [countrySearch, setCountrySearch] = useState('');

    // Get countries 
    useEffect(() => {
        async function loadData() {
            var rawResponse = await fetch('https://restcountries.com/v2/all');
            var response = await rawResponse.json();
            setCountriesList(response)
        }
        loadData();
    }, []);

    // Filter countries by region
    let filteredCountries = countriesList;
    if (region === "Africa"){
       filteredCountries = countriesList.filter(e => e.region ==="Africa")
    }
    if (region === "America"){
        filteredCountries = countriesList.filter(e => e.region ==="Americas")
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
     if (region === "All"){
        filteredCountries = countriesList
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
 
    console.log(countrySearch)
    return (
        <Container fluid={true} style={background}>
            < Header />
            <div className='content'>
                <Row style={{ marginTop: 55 }}>
                    <Col className='search' 
                        sm="4"
                        xs="10">
                        <FontAwesomeIcon icon={faMagnifyingGlass} color='grey' />
                        <Input
                            type="search"
                            placeholder='Search for a country...'
                            onChange={(e) => setCountrySearch(e.target.value)}
                            value={countrySearch}
                            style={{border: 'none', outline: 'none', width:'100%'}}
                        />
                    </Col>
                    <Col className='filter'
                    md={{size:2, offset:5}}
                    sm={{size:2, offset:8}}
                    xs="7">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                            <DropdownToggle caret color='white' style={{border: 'none', width:'100%'}}>
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
                                <DropdownItem onClick={() => setRegion("All")}>
                                    All
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