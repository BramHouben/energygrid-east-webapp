import ChartCard from "components/shared/cards/chart";
import React from "react";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      charts: [
        {
          id: 1,
          type: "doughnut",
          data: {
            key: "power-plant-card",
            total: 50,
            graphData: [45, 5],
          },
        },
        {
          id: 2,
          type: "pie",
          data: {
            key: "energy-usage-per-region-in-kwh",
            total: 3,
            graphData: [12000000, 8000000, 3200000],
          },
          filters: ["Noord-Brabant", "Limburg", "Zeeland"],
        },
        {
          id: 3,
          type: "line",
          data: {
            key: "average-energy-usage-per-month",
            graphData: [
              2545000,
              2700000,
              2420000,
              2130000,
              1995000,
              1800000,
              1535000,
              1300000,
              1307500,
              1580000,
              1790000,
              2000000,
            ],
          },
        },
        {
          id: 4,
          type: "bar",
          endpoint: "energy",
          data: {
            key: "price-energy-per-hour",
            graphData: [
              0.062315,
              0.0599555,
              0.0585035,
              0.057475,
              0.0576928,
              0.059532,
              0.0726,
              0.0924198,
              0.1117193,
              0.1193302,
              0.1133528,
              0.1068672,
              0.0967879,
              0.0918511,
              0.0907016,
              0.0921899,
              0.0970178,
              0.1139215,
              0.1329306,
              0.1065889,
              0.0886446,
              0.0776699,
              0.0684618,
            ],
          },
        },
      ],
    };
  }
  
  render() {
    let { charts } = this.state;

    return (
      <div>
        <div id="dashboard-body">
          {charts.map((chart) => (
            <ChartCard chart={chart} key={chart.data.key}/>
          ))}
        </div>
      </div>
    );
  }
}
