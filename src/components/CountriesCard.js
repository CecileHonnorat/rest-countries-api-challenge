import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom'

export default function CountriesCard(props) {

  var countryName = props.countryName;
  var countryPopulation = props.countryPopulation;
  var countryFlag = props.countryFlag;
  var countryRegion = props.countryRegion
  var countryCapital = props.countryCapital
  return (
    <div className='countryCard'>
      <Col md='10'>
        <Link to={`/country-info/${countryName}`} key={countryName}
          style={{ color: 'black', textDecoration: "none" }}>
          <Card style={{ margin: 20 }}
          >
            <CardImg
              alt="country's flag"
              src={countryFlag}
              width='100%'
            />
            <CardBody style={{ textAlign: 'left', marginInline: 20 }}>
              <CardTitle tag="h3" style={{ marginBottom: 20, marginTop: 20, fontWeight:600 }}>
                {countryName}
              </CardTitle>
              <CardText style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: 'bold' }}>Population :</span> {countryPopulation.toLocaleString("en-IN")}
              </CardText>
              <CardText style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: 'bold' }}>Region : </span>{countryRegion}
              </CardText>
              <CardText style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: 'bold' }}>Capital :</span> {countryCapital}
              </CardText>
            </CardBody>
          </Card>
        </Link>
      </Col>

    </div>
  )
}