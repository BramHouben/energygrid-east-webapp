import React, { Component } from "react";
import "./index.css";
import { GiWindTurbine } from "react-icons/gi";
import { FaSolarPanel } from "react-icons/fa";
import Axios from "axios";
import ApiActions from "services/shared/api/ApiActions";

export default class ForecastTable extends Component {
  constructor() {
    super();
    this.state = {
      forecast: [],
      city: "",
    };
  }

  componentDidMount() {
    this.getForecast(
      JSON.parse(localStorage.getItem("coordinates")),
      JSON.parse(localStorage.getItem("city"))
    );

    window.addEventListener("weather-header", (e) => {
      this.getForecast(e.detail.coordinates, e.detail.city);
    });
  }

  getForecast(coordinates, city) {
    Axios.post(ApiActions.ForeCast, {
      coordinates: coordinates,
    })
      .then((response) => {
        this.setState({
          city: city,
          forecast: response.data,
        });
        this.setGrades();
      })
      .catch(() => {
        console.log("Werkt niet");
      });
  }

  setSunGrade(sunPercentage) {
    if (sunPercentage <= 15) return "#fe4444";
    if (sunPercentage > 15 && sunPercentage <= 60) return "#fe982f";
    return "#39a839";
  }

  setWindGrade(windSpeed) {
    if (windSpeed > 2.5 && windSpeed <= 9) return "#fe982f";
    if (windSpeed > 9 && windSpeed <= 25) return "#39a839";
    return "#fe4444";
  }

  render() {
    let { forecast } = this.state;
    console.log(forecast);

    return (
      <div className='forecast-container'>
        {forecast.map((day) => (
          <div className='day-container'>
            <div className='day-date'>{day.date}</div>
            <div className='temperature-container'>
              <div className='temperature-data'>
                <div>
                  <b>Max:</b> {day.maxTemperature} °C
                </div>
                <div>
                  <b>Min:</b> {day.minTemperature} °C
                </div>
              </div>
              <div
                className='forecast-image'
                style={{
                  backgroundImage: `url(http://openweathermap.org/img/wn/${day.symbol}@2x.png)`,
                }}
              />
            </div>
            <div className='stats-container'>
              <div>
                <b>Wind speed:</b> {day.windSpeed} m/s
              </div>
              <div>
                <b>Sun percentage:</b> {day.sunPercentage}%
              </div>
            </div>
            <div className='grade-container'>
              <div
                className='icon'
                style={{ backgroundColor: this.setSunGrade(day.sunPercentage) }}
              >
                <FaSolarPanel size={30} />
              </div>
              <div
                className='icon'
                style={{ backgroundColor: this.setWindGrade(day.windSpeed) }}
              >
                <GiWindTurbine size={30} />
              </div>
            </div>
            <div className='winddirection-container'>
              <div
                className='icon'
                style={{
                  backgroundImage: `url(/assets/weather/windarrow.png)`,
                  transform: `rotate(${day.windDirection}deg)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
