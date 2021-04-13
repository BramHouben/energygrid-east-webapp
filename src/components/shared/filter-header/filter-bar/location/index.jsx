import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import "./index.css";
import data from "data/solarparks-east.json";

export default class Location extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
    };
  }

  componentDidMount() {
    var cities = this.getUniqueCities(data.solarParks);

    this.setState({ cities: cities });
  }

  getUniqueCities(cities) {
    cities.forEach((city) => {
      city.location =
        city.location.charAt(0) + city.location.substr(1).toLowerCase();
    });

    return cities.filter(
      (ele, ind) =>
        ind === cities.findIndex((elem) => elem.location === ele.location)
    );
  }

  handleSelect = (e) => {
    window.dispatchEvent(
      new CustomEvent("weather-header", {
        bubbles: true,
        composed: true,
        detail: { location: e },
      })
    );
  };

  render() {
    let { cities } = this.state;

    return (
      <div className='location-container'>
        <Dropdown onSelect={this.handleSelect}>
          <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
            Kies locatie
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {cities.map((city) => (
              <Dropdown.Item key={city.location} eventKey={city.location}>
                {city.location}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
