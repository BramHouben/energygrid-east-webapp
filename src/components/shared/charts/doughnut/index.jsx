import "./index.css";
import { Doughnut } from "react-chartjs-2";
import React, { Component } from "react";

export default class ChartDoughnut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: ['January', 'February', 'March',
        'April', 'May'],
      datasets: [
        {
          label: 'Rainfall',
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
            '#6800B4'
          ],
          hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F'
          ],
          data: [65, 59, 80, 81, 56]
        }
      ]
  }
}}

render() {
  let { data } = this.state;
    return (
        <div>
          <Doughnut 
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
    )
}
}