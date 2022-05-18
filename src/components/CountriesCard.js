import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function CountriesCard(props) {


  var countryName = props.countryName;
  var countryPopulation = props.countryPopulation;
  var countryFlag = props.countryFlag;
  var countryRegion = props.countryRegion
  var countryCapital = props.countryCapital

  if (countryName.length > 18){
    countryName = countryName.substr(0,17)+'...'
  }
  const darkMode = useSelector(state => state.selectedMode)

  return (
      <Col sm="8" lg="4" xl="3" style={{ position:'relative', padding:12}}>
        <Link to={`/country-info/${countryName}`} key={countryName}
          style={{ textDecoration: "none" }}>
          <Card style={{ margin: '2.25rem',  display:'flex', position:'relative',
          backgroundColor: (darkMode ? 'hsl(209, 23%, 22%)' :  "hsl(0, 0%, 100%)"), 
          color:(darkMode ? 'hsl(0, 0%, 100%)' :  "hsl(200, 15%, 8%)")}}>
            <CardImg
              alt="country's flag"
              src={countryFlag}
              style={{
                width:'100%',
                height:'20vh',
                objectFit: 'fill'}}
            />
            <CardBody style={{ textAlign: 'left', marginLeft: '0.45rem', height:'30vh', }}>
              <CardTitle tag="h3" style={{ marginBottom: 20, marginTop: 20, marginRight:20, fontWeight:600, fontSize:26 }}>
                {countryName}
              </CardTitle>
              <CardText style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: 'bold' }}>Population :</span> {countryPopulation.toLocaleString("en-US")}
              </CardText>
              <CardText style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: 'bold' }}>Region : </span>{countryRegion}
              </CardText>
              <CardText style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 'bold' }}>Capital :</span> {countryCapital}
              </CardText>
            </CardBody>
          </Card>
        </Link>
      </Col>
  )
}