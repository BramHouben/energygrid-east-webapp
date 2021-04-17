import React, { Component } from "react";
import Header from "components/shared/header";
import FilterHeader from "components/shared/filter-header";
import ForecastTable from "components/shared/forecast-table";

export default class Forecast extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="header-wrapper">
          <Header pageName="Weather forecast" />
          <FilterHeader />
        </div>
        <ForecastTable />
      </div>
    );
  }
}
