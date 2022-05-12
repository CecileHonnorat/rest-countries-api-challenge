import { Container, Input, Row, Col, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import CountriesCard from './CountriesCard';
import Header from './Header';

import { useSelector } from 'react-redux';

export default function Countries() {

    const darkMode = useSelector(state => state.selectedMode)

    var background = {
        backgroundColor: (darkMode ? "hsl(207, 26%, 17%)" : "hsl(0, 0%, 98%)"),
        width: '100vw',
        paddingTop: '50px',
        color: (darkMode ? 'hsl(200, 15%, 8%)' :  "hsl(0, 0%, 100%)")
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

    //Search a country
    const searchActive = async (e) => {
        let searchWord = e.target.value.toLowerCase()
        setCountrySearch(searchWord)
     }

     if (countrySearch !== ''){
        filteredCountries = countriesList.filter(e =>{
                let myRegex = new RegExp(countrySearch, "gi");
                console.log(myRegex)
                console.log(e.name)
                return (
                 e.name.match(myRegex)
                )
         })
     }
console.log(filteredCountries.length)

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
 
    return (
        <Container fluid={true} style={background}>
            < Header />
                <Row style={{ marginTop: 55 }}>
                    <Col className='search' 
                        sm="4"
                        xs="10"
                        style={{backgroundColor: darkMode ? 'hsl(209, 23%, 22%)' :  "hsl(0, 0%, 100%)"}}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} color={darkMode ? 'hsl(0, 0%, 100%)' :  "hsl(200, 15%, 8%)"} />
                        <Input
                            type="search"
                            placeholder='Search for a country...'
                            onChange={searchActive}
                            value={countrySearch}
                            style={{border: 'none', width:'100%', backgroundColor:(darkMode ? 'hsl(209, 23%, 22%)' :  "hsl(0, 0%, 100%)")}}
                        />
                    </Col>
                    <Col className='filter'
                    md={{size:2, offset:5}}
                    sm={{size:2, offset:8}}
                    xs="7"
                    style={{backgroundColor: darkMode ? 'hsl(209, 23%, 22%)' :  "hsl(0, 0%, 100%)"}}>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                            <DropdownToggle caret color={darkMode ? 'hsl(209, 23%, 22%)' :  "hsl(0, 0%, 100%)"} 
                            style={{border: 'none', width:'100%', color:(darkMode ? 'hsl(0, 0%, 100%)' :  "hsl(200, 15%, 8%)")}}>
                                Filter by Region
                            </DropdownToggle>
                            <DropdownMenu style={{backgroundColor: darkMode ? 'hsl(209, 23%, 22%)' :  "hsl(0, 0%, 100%)"}}>
                                <DropdownItem onClick={() => setRegion("Africa")} > 
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
                <Row xs="1" lg="2" xl="4" className='countryCards' style={{marginLeft:'25px', marginRight:'25px'}}>
                    {countries}
                </Row>
        </Container>
    )
}