
import './App.css';
import Frontpage from './Components/Frontpage/Frontpage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stocks from './Components/Stocks/Stocks';
import Users from './Components/Users/Users';
import AddUser from './Components/AddUser/AddUser';
import UserStocks from './Components/UserStocks/UserStocks';
import SearchStock from './Components/searchstock/SearchStock';
import CustomNav from './Components/Navbar/Navbar';
import SingleStocks from './Components/SingleStocks/SingleStocks';

function App() {
  return (
    <div style={{backgroundColor: '#a3a9b5'}}>
    <CustomNav/>
    <Router>
        <Routes>
          <Route exact path="/" element={<Frontpage/>}/>
          <Route exact path="/users" element={<Users/>}/>
          <Route exact path="/stocks" element={<Stocks/>}/>
          <Route exact path="/adduser" element={<AddUser/>}/>
          <Route exact path="/userstocks" element={<UserStocks/>}/>
          <Route exact path="/searchstock" element={<SearchStock/>}/>

          <Route exact path="/searchstock/stockdetails" element={<SingleStocks/>}/>
        </Routes>
    </Router>
    </div>
  )
}

export default App;
