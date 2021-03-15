import "./index.css";
import { Doughnut } from "react-chartjs-2";
import React, { Component } from "react";

export default class ChartDoughnut extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { chart } = this.props;

    return (
      <div>
        <Doughnut data={chart.data} options={chart.options} />
      </div>
    );
  }
}
