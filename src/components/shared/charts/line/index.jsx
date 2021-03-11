import "./index.css";
import { Line } from "react-chartjs-2";
import React, { Component } from "react";

export default class ChartLine extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data: {
                labels: ['January', 'February', 'March',
                'April', 'May'],
       datasets: [
         {
           label: 'Rainfall',
           fill: false,
           lineTension: 0.5,
           backgroundColor: 'rgba(75,192,192,1)',
           borderColor: 'rgba(0,0,0,1)',
           borderWidth: 2,
           data: [65, 59, 80, 81, 56]
         }
       ]
            }
        }
      }
    

  render() {
    let { data } = this.state;

    return (
      <div>
        <Line
            data={data}
            options={{
            title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:20
            },
            legend:{
                display:true,
                position:'right'
            }
            }}
        />
      </div>
    );
  }
}