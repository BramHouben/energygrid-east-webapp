import "./index.css";
import { Bar } from "react-chartjs-2";
import React, { Component } from "react";

export default class ChartBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { chart } = this.props;

    return (
      <div>
        <Bar data={chart.data} options={chart.options} />
      </div>
    );
  }
}
