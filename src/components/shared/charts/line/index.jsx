import "./index.css";
import { Line } from "react-chartjs-2";
import React, { Component } from "react";

export default class ChartLine extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { chart } = this.props;

    return (
      <div>
        <Line data={chart.data} options={chart.options} />
      </div>
    );
  }
}
