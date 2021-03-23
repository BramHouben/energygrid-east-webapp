import React from "react";
import "./index.css";
import Header from "components/shared/header";
import { Table } from "react-bootstrap";
import data from "../../data/solarparks-east.json";
import Maps from "components/shared/maps";
import { withGoogleMap, withScriptjs } from "react-google-maps";

export default class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      solarParks: [],
    };
  }

  componentDidMount() {
    this.setState({ solarParks: data.solarParks });
  }

  handleOrderClick(direction, col) {
    const solarParks = this.state.solarParks;

    // if (direction === "ASC") {
    //   solarParks.sort((a, b) => {
    //     return a[col] - b[col];
    //   });
    // }
    //TODO

    let newSolarParks = {};
    if (direction === "ASC") {
      newSolarParks = solarParks.sort((a, b) =>
        a[col] > b[col] ? 1 : b[col] > a[col] ? -1 : 0
      );
    } else {
      newSolarParks = solarParks.sort((a, b) =>
        a[col] < b[col] ? 1 : b[col] < a[col] ? -1 : 0
      );
    }

    this.setState({ solarParks: newSolarParks });
  }

  render() {
    let { solarParks } = this.state;
    const MapWrapped = withGoogleMap(Maps);

    return (
      <div>
        <Header pageName="details" />
        <div id="details-body">
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
              {!!solarParks &&
                solarParks.map((solarPark) => (
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
          <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.GOOGLE_MAPS_API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}
