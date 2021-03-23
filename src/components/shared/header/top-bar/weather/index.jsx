import React, { Component } from "react";
import "./index.css";
import ApiActions from "services/shared/api/ApiActions";
import { Get } from "services/shared/api/Api";

export default class Weather extends Component {
  async componentDidMount() {
    const weather = await Get(ApiActions.CurrentWeather);
    console.log(weather);
  }

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
          style={{ backgroundImage: `url(/assets/weather/zonnig.png)` }}
        ></div>
      </div>
    );
  }
}
