import CustomCard from '../Card/Card';
import { Row,Container,Col } from 'react-bootstrap';
import './Frontpage.css';
import allusers  from '../../assets/allusers.png'
import search from '../../assets/search.png'
import stocks from '../../assets/stocks.png'
function Frontpage() {
  return (
    <div className="front-page">
        <Container>
          <Row>
            <Col md={12} xs={12} lg={4}> 
              <CustomCard route="/users" image = {allusers} title="All Users" body="See all the listed users in a tabular format" action="Users"/>
            </Col>
            <Col md={12} xs={12} lg={4}> 
              <CustomCard route="/stocks" image = {search} title="Stocks" body="See all the Stocks in a tabular format" action="Stocks"/>
            </Col>
            <Col md={12} xs={12} lg={4}> 
              <CustomCard route="/searchstock" image = {stocks} title="Search Stocks" body="See Real Time Prices of any stock in one click" action="Search Stocks"/>
            </Col>
          </Row>
        </Container>
    </div>
  );
}

export default Frontpage;
