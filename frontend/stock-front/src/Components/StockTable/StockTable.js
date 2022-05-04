
import { Link } from 'react-router-dom';
import './StockTable.css';

function StockTable() {
  return (
    <div className="stock-table">
      
       
        <table>
            <tr>
                <th>User</th>
                <th>Show</th>
                <th>delete</th>
            </tr>
            <tr>
                <td>Alfreds Futterkiste</td>
                <td><button>Show</button></td>
                <td><button>Delete</button></td>
            </tr>
           
        </table>

     
    </div>
  );
}

export default StockTable;
