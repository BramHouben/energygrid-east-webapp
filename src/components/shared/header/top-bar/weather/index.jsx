import React, { Component } from "react";
import "./index.css";
import Axios from "axios";

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
    };
  }

  componentDidMount() {
    // window.addEventListener("weather-header", function (event) {
    //   console.log("received????");
    //   console.log(event);
    // });

    const weather = Axios.get(
      "http://localhost:8081/weather/current?city=valkenswaard"
    )
      .then((response) => {
        console.log(response.data.location);
        this.setState({ city: response.data.location });
      })
      .catch(() => {
        console.log("Werkt niet");
      });
    // console.log("test");
    console.log(weather, this.state.city);
  }

  render() {
    let { city } = this.state;

    return (
      <div className="weather-container">
        <div className="weather-data">
          <div>22°</div>
          <div>{city}</div>
        </div>
        <div
          className="weather-image"
          style={{ backgroundImage: `url(/assets/weather/zonnig.png)` }}
        ></div>
      </div>
    );
  }
}
