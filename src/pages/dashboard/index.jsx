import ChartCard from "components/shared/cards/chart";
import React from "react";
import data from "../../data/chart.json";
import Header from "components/shared/header";
import FilterHeader from "components/shared/filter-header";
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

    return (
      <div>
        <div className="header-wrapper">
          <Header pageName="Dashboard" />
          <FilterHeader />
        </div>
        <div id="dashboard-body">
          {charts.map((chart) => (
            <ChartCard chart={chart} key={chart.data.key} />
          ))}
        </div>
      </div>
    );
  }
}
