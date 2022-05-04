import './UserStocks.css';
import axios from 'axios'
import { useState ,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function UserStocks(props) {
  const [data,setdata]=useState({'value':'none'})
  const [sname,Changesname]=useState('AAPL')

  const navigate=useNavigate()

  const [filterlist,ChangeFilterList]=useState({})
  const [sdata,Changesdata] = useState({})
  function listChnageHandler(e){
    Changesname(e.target.value)
  }

  useEffect (()=>{
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/getuserstocks',
      data: {
        id: id
      },
      headers: {'Content-Type': 'application/json'}
    }).then( (res) =>{setdata(res.data); console.log(res.data)})

    axios({
      method: 'GET',
      url: 'http://127.0.0.1:5000/stocksym',
      
      headers: {'Content-Type': 'application/json'}
    }).then((res)=>{Changesdata(res.data);ChangeFilterList(res.data)})
  
  }
  
  
  ,[])
function onClickDelete(e){
  console.log("THIS IS THE VALUE")
  console.log(id,e.target.value)
  axios({
    method: 'POST',
    url: 'http://127.0.0.1:5000/deleteuserstocks',
    data: {
      id: id,
      symbol:e.target.value
    },
    headers: {'Content-Type': 'application/json'}
  }).then( (res) => {
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/getuserstocks',
      data: {
        id: id
      },
      headers: {'Content-Type': 'application/json'}
    }).then( (res) =>{setdata(res.data)})
    

    }
  )
  

}

function onSubmithandler(e){
  axios({
    method: 'POST',
    url: 'http://127.0.0.1:5000/addstock',
    data: {
      id: id,
      symbol:e.target.value
    },
    headers: {'Content-Type': 'application/json'}
  })
  .then (
     (res) => {
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/getuserstocks',
        data: {
          id: id
        },
        headers: {'Content-Type': 'application/json'}
      }).then( (res) =>{setdata(res.data)})
     } 
  )
  e.preventDefault()
}
//console.log(data)


function onChangeHandler(e){
  const temp={}
  const keys=Object.keys(sdata)
  for (var i=0;i<keys.length;i++){
    if(sdata[keys[i]].toLowerCase().includes(e.target.value.toLowerCase()))
    temp[keys[i]]=sdata[keys[i]]

  }
  ChangeFilterList(temp)
}

function onClickShow(e){
  console.log(e.target.value)
  navigate("../searchstock/stockdetails" ,{state:{id:e.target.value}})
}





const location = useLocation();
const id = location.state;
// console.log(id)
    
if (data.value==='none'){
return ( 
<div>waiting for data retrival</div>)
  }
else
    

  return (
    <div >


<table className='table table-hover'>
        <thead>
            <tr>
                <th>Stock Name</th>
                <th>Last Traded Price</th>
                <th>Delete</th>
                <th>Show Details</th>
            </tr>
          </thead>
          <tbody>
        { Object.keys(data).map(function(key, index) {
          return(
  

       
        
            <tr key ={key}>
                <td>{data[key].name}</td>
                <td>{data[key].price}</td>
                <td><button 
                className='btn btn-outline-danger'
                value ={key} 
                onClick= {onClickDelete}>Delete</button></td>
                <td><button 
                className='btn btn-outline-success'
                value ={key} 
                onClick= {onClickShow}>Show</button></td>
                


            </tr>
           
        
          )
        })
        
}
</tbody>
</table>






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

export default UserStocks;