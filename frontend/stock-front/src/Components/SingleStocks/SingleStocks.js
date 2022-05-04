import "./SingleStocks"
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import Graph from "../Graph/Graph.js"
import Backconn from "../../backconn/Backconn";

function SingleStocks(){
  const [data,Changedata] = useState({})
  const [open , setOpenData] = useState([])
  const [close , setCloseData]  = useState([])

  const [high , setHighData] = useState([])
  const [low , setLowData]  = useState([])

  const [date , setDate]  = useState([])






  useEffect(()=>{
    const conn = new Backconn()
    const promise=conn.stock(location.state.id)
    
    promise.then((res)=>{Changedata(res.data)})
    const conn2 = new Backconn()
    
    const promise2= conn2.gettimedata(location.state.id)

    promise2.then((res)=>{
      setCloseData(res.data.close); 
      setOpenData(res.data.open);
    setLowData(res.data.low);
    setHighData(res.data.high);
    setDate(res.data.date)
    })

    

  },[])
  


  const location = useLocation();
  if (low.length!=0)
  return(
    <>
    <table className='table table-hover allstocks'>
            <thead>
              <tr>
                <th>AttributeS</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>Name</td>
              <td>{data['companyName']}</td>
            
            </tr>
            <tr>
              <td>Closing Price</td>
              <td>{data['closePrice']}</td>
            
            </tr>
            <tr>
              <td>Currency</td>
              <td>INR</td>
            
            </tr>
            <tr>
              <td>Exchange</td>
              <td>NSE</td>
            
            </tr>
            <tr>
              <td>Symbol</td>
              <td>{data['symbol']}</td>
            
            </tr>
            <tr>
              <td>Volume</td>
              <td>{data['totalTradedVolume']}</td>
            
            </tr>
            <tr>
              <td>Previous_Close</td>
              <td>{data['previousClose']}</td>
            
            </tr>
            </tbody>
    </table>
    <div className="graph">

    <Graph  open = {open} close = {close} high={high} low= {low} date={date}/>
    </div>
    </>
    
    )

}
export default SingleStocks