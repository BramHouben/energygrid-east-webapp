import React, { Component } from "react";
import "./index.css";
import Location from "./location";

export default class FilterBar extends Component {
  render() {
    return (
      <div id="filter-bar-wrapper">
        <Location />
      </div>
    );
  }
}
