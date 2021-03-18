import ChartCard from "components/shared/cards/chart";
import React from "react";
import data from "../../data/chart.json";
import Header from "components/shared/header";
import "./index.css";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      charts: [],
    };
  }

  componentDidMount() {
    this.setState({ charts: data.charts });
  }

  render() {
    let { charts } = this.state;
    console.log(charts);

    return (
      <div>
        <Header pageName="Dashboard" />
        <div id="dashboard-body">
          {charts.map((chart) => (
            <ChartCard chart={chart} key={chart.data.key} />
          ))}
        </div>
      </div>
    );
  }
}
