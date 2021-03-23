import React, { Component } from "react";
import "./index.css";
import Axios from "axios";

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      temperature: 0,
      symbol: "",
    };
  }

  componentDidMount() {
    this.selectLocation("Enschede");
    window.addEventListener("weather-header", (e) => {
      console.log(16, e);
      this.selectLocation(e.detail.location);
    });

    // const weather = Axios.get(
    //   "http://localhost:8081/weather/current?city=valkenswaard"
    // )
    //   .then((response) => {
    //     console.log(response.data.location);
    //     this.setState({ city: response.data.location });
    //   })
    //   .catch(() => {
    //     console.log("Werkt niet");
    //   });
    // // console.log("test");
    // console.log(weather, this.state.city);
  }

  selectLocation(location) {
    const weather = Axios.get(
      `http://localhost:8081/weather/current?city=${location}`
    )
      .then((response) => {
        console.log(response.data.location);
        this.setState({
          city: response.data.location,
          temperature: response.data.temperature,
          symbol: response.data.symbol,
        });
      })
      .catch(() => {
        console.log("Werkt niet");
      });
  }

  render() {
    let { city, temperature, symbol } = this.state;

    return (
      <div className="weather-container">
        <div className="weather-data">
          <div>{temperature}°</div>
          <div>{city}</div>
        </div>
        <div
          className="weather-image"
          style={{ backgroundImage: `url(/assets/weather/${symbol}.png)` }}
        ></div>
      </div>
    );
  }
}
