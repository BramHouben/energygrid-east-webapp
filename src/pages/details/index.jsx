import React from "react";
import "./index.css";
import Header from "components/shared/header";
import { Table } from "react-bootstrap";
import data from "../../data/solarparks-east.json";

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

    if (direction === "ASC") {
      solarParks.sort((a, b) => {
        return a[col] - b[col];
      });

      console.log(solarParks);
    }

    let newSolarParks = solarParks.sort((a, b) =>
      a[col] > b[col] ? 1 : b[col] > a[col] ? -1 : 0
    );
    console.log(newSolarParks);
  }

  render() {
    let { solarParks } = this.state;

    return (
      <div>
        <Header pageName="details" />
        <div id="details-body">
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th onClick={() => this.handleOrderClick("ASC", "applicant")}>
                  Aanvrager
                </th>
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
        </div>
      </div>
    );
  }
}
