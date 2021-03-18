import React, { Component } from "react";
import "./index.css";

export default class Weather extends Component {
  render() {
    var test = "sun.png";
    return (
      <div className="weather-container">
        <div className="weather-data">
          <div>22°</div>
          <div>Valkenswaard</div>
        </div>
        <div
          className="weather-image"
          style={{
            backgroundImage: `url(/assets/weather/${test})`,
          }}
        ></div>
      </div>
    );
  }
}
