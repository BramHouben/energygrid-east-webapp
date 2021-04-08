import React, { Component } from "react";
import "./index.css";
import Axios from "axios";

export default class ForecastTable extends Component {
  constructor() {
    super();
    this.state = {
      forecast: [],
      city: "",
    };
  }

  componentDidMount() {
    window.addEventListener("weather-header", (e) => {
      this.getForecast(e.detail.coordinates, e.detail.city);
    });
  }

  getForecast(coordinates, city) {
    Axios.post(`http://localhost:8081/weather/forecast`, {
      coordinates: coordinates,
    })
      .then((response) => {
        this.setState({
          city: city,
          forecast: response.data,
        });
      })
      .catch(() => {
        console.log("Werkt niet");
      });
  }

  render() {
    let { city, forecast } = this.state;
    console.log(forecast);
    return (
      <div className="forecast-container">
        {forecast.map((day) => (
          <div className="day-container">
            <div className="day-date">{day.date}</div>
            <div className="temperature-container">
              <div className="temperature-data">
                <div>
                  <b>Max:</b> {day.maxTemperature} °C
                </div>
                <div>
                  <b>Min:</b> {day.minTemperature} °C
                </div>
              </div>
              <div
                className="forecast-image"
                style={{
                  backgroundImage: `url(http://openweathermap.org/img/wn/${day.symbol}@2x.png)`,
                }}
              />
            </div>
            <div className="stats-container">
              <div>
                <b>Wind speed:</b> {day.windSpeed} m/s
              </div>
              <div>
                <b>Sun percentage:</b> {day.sunPercentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
