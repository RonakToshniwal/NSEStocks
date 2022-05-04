
import axios from 'axios';

var url='http://127.0.0.1:5000'
class Backconn{
    async stocksym(changedata){
        console.log("hello")
        return await (axios({
            method: 'GET',
            url: url+'/stocksym',
            
            headers: {'Content-Type': 'application/json'}
          },[]));
    }
    async gettimedata(id){
        return await axios({
            method: 'POST',
            url: url+'/gettimedata',
            
            headers: {'Content-Type': 'application/json'},
            data: {
              'symbol': id
            }
      
          },[])
    }

    async stock(id){
        console.log(id)
        return await axios({
            method: 'POST',
            url: url+'/stock',
            
            headers: {'Content-Type': 'application/json'},
            data: {
              'symbol': id
            }
      
          },[])
    }

    async user_new(title,age){
        return await axios({
            method: 'POST',
            url: url+'/user/new/',
            data: {
              name: title,
              age: age
            },
            headers: {'Content-Type': 'application/json'}
          })
    }

    async stock_all(){

    return await axios.get(url+'/stock/all/')
    }


    async user_delete(id){
        return await axios({
            method: 'POST',
            url: url+'/user/delete',
            data: {
              id: id
            },
            headers: {'Content-Type': 'application/json'}
          })
    }

    async users(){
        return await axios.get(url+'/users')
    }
    async getuserstocks(id){
        return await  axios({
            method: 'POST',
            url: url+'/getuserstocks',
            data: {
              id: id
            },
            headers: {'Content-Type': 'application/json'}
          })
    }
    async deletuserstocks(id , symbol){
        return await axios({
            method: 'POST',
            url: url+'/deleteuserstocks',
            data: {
              id: id,
              symbol:symbol
            },
            headers: {'Content-Type': 'application/json'}
          })
    }


    async addstock(id,symbol){
      return await axios({
        method: 'POST',
        url: url+'/addstock',
        data: {
          id: id,
          symbol:symbol
        },
        headers: {'Content-Type': 'application/json'}
      })

    }

}

export default Backconn