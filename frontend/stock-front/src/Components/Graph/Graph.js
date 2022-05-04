import React, { useState } from "react";
import  Chart  from 'react-apexcharts'
import { useEffect } from "react";

const Graph = (props) => {

  var [data,setData]=useState()

  useEffect(()=>{
    var labels= props.date
    var array=[]
    for (var i=0;i<props.date.length;i++) {
      var m={x:labels[i],y:[props.open[i],props.high[i],props.low[i],props.close[i]]}
      array.push(m)
    }
    setData(array)


  },[props])
    
        var series= [
          {
            data: data,
            
          },
        ];

        var options={
          chart: {
            type: 'candlestick',
            height: 350,
            background: '#fff',
            width: '50%'
          },
          title: {
            text: 'Chart',
            align: 'center'
          },
          xaxis: {
            type: 'date'
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        };
      
      
      
        

      

    return ( 
    < div  >
        <Chart options={options} series={series} type="candlestick" height={500} color='blue' />
    </div> );
}
 
export default Graph;