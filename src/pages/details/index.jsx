import React from "react";
import "./index.css";
import Header from "components/shared/header";
import { Table } from "react-bootstrap";
import data from "../../data/solarparks-east.json";
import SearchBar from "components/shared/inputs/search";
import { ArrowUp } from "react-bootstrap-icons";
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
                <th>
                  ID
                  <ArrowUp id="th-icon" />
                </th>
                <th>
                  Aanvrager
                  <ArrowUp id="th-icon" />
                </th>
                <th>
                  Adres
                  <ArrowUp id="th-icon" />
                </th>
                <th>
                  Postcode
                  <ArrowUp id="th-icon" />
                </th>
                <th>
                  Plaats
                  <ArrowUp id="th-icon" />
                </th>
                <th>
                  Provincie
                  <ArrowUp id="th-icon" />
                </th>
                <th>
                  Power
                  <ArrowUp id="th-icon" />
                </th>
                <th>
                  Max
                  <ArrowUp id="th-icon" />
                </th>
                <th>
                  Gerealiseerd op
                  <ArrowUp id="th-icon" />
                </th>
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
          <div id="details-map">
            <Map />
          </div>
        </div>
      </div>
    );
  }
}
