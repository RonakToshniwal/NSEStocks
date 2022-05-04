import { Link } from 'react-router-dom';
import './Users.css';
import { useState ,useEffect} from 'react';
import axios from 'axios'

function Users() {

var [users,setUser] = useState({})

useEffect(()=>{
  axios.get('http://127.0.0.1:5000/users')
  .then((response)=>{setUser(response.data)})

}, [])

 var onDeleteClick =(e) =>{
  axios({
    method: 'POST',
    url: 'http://127.0.0.1:5000/user/delete',
    data: {
      id: e.target.value
    },
    headers: {'Content-Type': 'application/json'}
  }).then( (res) => {
    axios.get('http://127.0.0.1:5000/users')
  .then((response)=>{setUser(response.data)})
  })
 }

  if (Object.keys(users).length===0){
    return (<div>Waiting for update</div>)
  }
  else
  console.log(Object.keys(users.users))
  return (
    <div className="User-page">
        <table className='table table-hover'>
          <thead>
            <tr>
                <th>Id</th>
                <th>User Name</th>
                <th>Age</th>
                <th>Show</th>
                <th>Delete</th>
            </tr>
            </thead>
        <tbody>

        { Object.keys(users.users).map(function(key, index) {
          return(
            <tr key= {users.users[key].id}>
                <td>{users.users[key].id}</td>
                <td>{users.users[key].name}</td>
                <td>{users.users[key].age}</td>
                <td><Link to= '/userstocks' state = {users.users[key].id} >
                  <button className='btn btn-outline-success'>Show</button>
                  </Link></td>
                <td><button value= {users.users[key].id} onClick={onDeleteClick} 
                className="btn btn-outline-danger" >Delete</button></td>
            </tr>
          )
        })    
}
    </tbody>
    </table>
    <div className='adduser'>
    <h1>Want to add a new user? Here you go !</h1>

    <Link to="/adduser"><button className='del-user btn-danger'>Add User</button></Link>
    </div>

        
        
     
    </div>
  );
}

export default Users;
