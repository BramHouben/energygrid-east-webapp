import React, { Component } from "react";
import "./index.css";
import Axios from "axios";
import ApiActions from "services/shared/api/ApiActions";
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
    this.selectLocation(
      JSON.parse(localStorage.getItem("coordinates")),
      JSON.parse(localStorage.getItem("city"))
    );

    window.addEventListener("weather-header", (e) => {
      this.selectLocation(e.detail.coordinates, e.detail.city);
    });
  }

  selectLocation(coordinates, city) {
    localStorage.setItem("coordinates", JSON.stringify(coordinates));
    localStorage.setItem("city", JSON.stringify(city));

    Axios.post(ApiActions.CurrentWeather, {
      coordinates: JSON.parse(localStorage.getItem("coordinates")),
    })
      .then((response) => {
        this.setState({
          city: city,
          temperature: response.data.temperature,
          symbol: response.data.symbol,
        });
      })
      .catch(() => {});
  }

  render() {
    let { city, temperature, symbol } = this.state;

    return (
      <div className='weather-container'>
        <div className='weather-data'>
          <div>{temperature} °C</div>
          <div>{city}</div>
        </div>
        <div
          className='weather-image'
          style={{
            backgroundImage: `url(http://openweathermap.org/img/wn/${symbol}@2x.png)`,
          }}
        ></div>
      </div>
    );
  }
}
