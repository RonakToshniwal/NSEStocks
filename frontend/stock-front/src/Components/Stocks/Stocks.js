
import './Stocks.css';
import axios from 'axios'
import { useState ,useEffect} from 'react';
import StockCard from '../Card/StockCard';
import { Row,Container,Col } from 'react-bootstrap';
import Backconn from '../../backconn/Backconn';
function Stocks() {
var [users,setUser] = useState({})

  useEffect(()=>{
    const conn = new Backconn()
    const promise=conn.stock_all()
    promise.then((response)=>{setUser(response.data);})
    /*axios.get('http://127.0.0.1:5000/stock/all/')
    .then((response)=>{setUser(response.data); })*/
    
},[]);
    

if (Object.keys(users).length===0){
    return (<div>Waiting for update</div>)
  }

else



  return (
    <div className="stock-table">
       <Container>
        <Row>
      { Object.keys(users).map(function(key, index) 
      {
          return (
            <Col key ={key} md={12} xs={12} lg={4}> 
            <StockCard  name= { users[key].name } high= {users[key].lastPrice} low= {users[key].change} price= {users[key].pChange} />
            </Col>
          )  
      }) }

        </Row>
      </Container>
    </div>  
  );
}

export default Stocks;



 /* <StockCard name= { users[0]['name'] } high="100.0" low= "1.0" price="50.0"/>
      /* <table>
        <thead>
            <tr>
                <th>Stock Name</th>
                <th>Last Traded Price</th>
            </tr>
          </thead>
          <tbody>
        { Object.keys(users).map(function(key, index) {
          return(
            <tr key ={key}>
                <td>{key}</td>
                <td>{users[key]}</td>
            </tr>
          )
        })
}
</tbody>
</table>  */