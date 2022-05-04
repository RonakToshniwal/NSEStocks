import Backconn from '../../backconn/Backconn';
import './SearchStock.css';
import { useEffect, useState} from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
function SearchStock() {

  const [filterlist,ChangeFilterList]=useState({})
  const [data,Changedata] = useState({})


  const navigate=useNavigate()
  const conn=new Backconn()





  useEffect(()=>{
     var m=conn.stocksym()
     Changedata(m.then((res)=>{Changedata(res.data);
      ChangeFilterList(res.data);
    }))
    /*axios({
      method: 'GET',
      url: 'http://127.0.0.1:5000/stocksym',
      
      headers: {'Content-Type': 'application/json'}
    }).then((res)=>{Changedata(res.data);ChangeFilterList(res.data)})*/
   
    

  },[])
  function onSubmithandler(e){
   
    navigate("stockdetails" ,{state:{id:e.target.value}})
  }
  function onChangeHandler(e){
    const temp={}
    const keys=Object.keys(data)
    for (var i=0;i<keys.length;i++){
      if(data[keys[i]].toLowerCase().includes(e.target.value.toLowerCase()))
      temp[keys[i]]=data[keys[i]]

    }
    ChangeFilterList(temp)
  }
  

  
  if(Object.keys(data).length!=0)


  return (
    
    <div className="searchstock-page" style={{ alignItems: 'center', margin:'15%' , justifyContent: 'center'}}>
        
      
        <form onSubmit={onSubmithandler} className='form-group'>
          <input type='text' className='sin' onChange={onChangeHandler}></input>
          { Object.keys(filterlist).length>0?
            Object.keys(filterlist).map((key,index)=>{
              return(
              <button className='btn sbtn btn-secondary' value={key} key ={key} onClick={onSubmithandler}>{filterlist[key]}</button>
              )
            }):
            <h1>no result found</h1>
          }
      </form>

     
    </div>
  );
}

export default SearchStock;
