import React from "react";
import "./index.css";
import Header from "components/shared/header";
import { Table } from "react-bootstrap";
import data from "../../data/solarparks-east.json";
import SearchBar from "components/shared/inputs/search";
import Map from "components/shared/maps";
import FilterHeader from "components/shared/filter-header";

export default class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      solarParks: [],
      filteredSolarParks: [],
      input: "",
    };
  }

  componentDidMount() {
    this.setState({
      solarParks: data.solarParks,
      filteredSolarParks: data.solarParks,
    });

    window.addEventListener("search-input", (e) => {
      console.log(e);
      this.setFilters(e.detail.input);
    });
  }

  setFilters(value) {
    const filteredSolarParks = this.state.solarParks;

    if (value === null || value === "") {
      this.setState({ input: value, filteredSolarParks: filteredSolarParks });
    } else {
      const filtered = filteredSolarParks.filter((solarPark) => {
        console.log(solarPark, value);
        return solarPark.location.includes(value)
          ? solarPark.location.includes(value)
          : solarPark.applicant.includes(value)
          ? solarPark.applicant.includes(value)
          : null;
      });

      console.log(filtered);
      this.setState({ input: value, filteredSolarParks: filtered });
    }
  }

  render() {
    let { filteredSolarParks, input } = this.state;

    return (
      <div>
        <div className="header-wrapper">
          <Header pageName="Details" />
          <FilterHeader />
        </div>
        <div id="details-body">
          <div id="search-bar">
            <SearchBar input={input} />
          </div>
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Aanvrager</th>
                <th>Adres</th>
                <th>Postcode</th>
                <th>Plaats</th>
                <th>Provincie</th>
                <th>Power</th>
                <th>Max</th>
                <th>Gerealiseerd op</th>
              </tr>
            </thead>
            <tbody>
              {!!filteredSolarParks &&
                filteredSolarParks.map((solarPark) => (
                  <tr key={solarPark.id}>
                    <td>{solarPark.id}</td>
                    <td>{solarPark.applicant}</td>
                    <td>{solarPark.adress}</td>
                    <td>{solarPark.zipcode}</td>
                    <td>{solarPark.location}</td>
                    <td>{solarPark.province}</td>
                    <td>{solarPark.power}</td>
                    <td>{solarPark.max}</td>
                    <td>{solarPark.realised_at}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Map />
        </div>
      </div>
    );
  }
}
