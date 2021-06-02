import React, { Component } from "react";
import { Form, FormGroup } from "react-bootstrap";
import Datetime from "react-datetime";
import Header from "components/shared/header";
import FilterHeader from "components/shared/filter-header";
import ChartCard from "components/shared/cards/chart";
import Axios from "axios";
import data from "./usage.json";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import "./index.css";

export default class Forecast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: data,
      date: "Select date",
      today: moment().subtract(1, "day"),
    };
  }

  handleDayChange = (fulldate) => {
    this.setState({ date: fulldate });

    let date = this.getFormattedDate(fulldate);

    Axios.get(`http://localhost:8081/usage/day`, {
      params: {
        date: date,
      },
    })
      .then((result) => {
        console.log(result);

        let chartLabels = [];
        let chartKw = [];

        for (let i of result.data) {
          chartLabels.push(i.hour);
          chartKw.push(i.kwh);
        }

        data.data.labels = chartLabels;
        data.data.datasets[0].data = chartKw;
        data.data.datasets[0].lineTension = 0.5;
        this.setState({ chart: data });
      })
      .catch(() => {
        console.log("Werkt niet");
      });
  };

  getFormattedDate(d) {
    let date = new Date(d);

    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return day + "-" + month + "-" + year;
  }

  render() {
    let chart = this.state.chart;
    let today = this.state.today;

    var valid = function (current) {
      return current.isBefore(today);
    };

    return (
      <div>
        <div className='header-wrapper'>
          <Header pageName='Weather forecast' />
          <FilterHeader />
        </div>
        <div className='usage-container'>
          <FormGroup className='usage-control'>
            <Form.Label>Date</Form.Label>
            <Datetime
              inputProps={{ readOnly: true }}
              name='from'
              dateFormat='DD-MM-YYYY'
              timeFormat={false}
              isValidDate={valid}
              value={this.state.date}
              onChange={this.handleDayChange}
            />
          </FormGroup>
          <div className='usage-chart'>
            <ChartCard chart={chart} />
          </div>
        </div>
      </div>
    );
  }
}
