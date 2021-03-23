import React, { Component } from "react";
import "./index.css";
import ApiActions from "services/shared/api/ApiActions";
import { Get } from "services/shared/api/Api";
import Axios from "axios";

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      city: "Select city",
    };
  }

  async componentDidMount() {
    // window.addEventListener("weather-header", function (event) {
    //   console.log("received????");
    //   console.log(event);
    // });

    const weather = await Axios.get(
      "http://localhost:8081/weather/current?city=valkenswaard"
    );
    // console.log("test");
    // // console.log(weather);
  }

  render() {
    let { city } = this.state;

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
