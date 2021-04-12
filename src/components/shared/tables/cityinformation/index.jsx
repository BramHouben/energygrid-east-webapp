import React, { Component } from "react";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";

import ApiActions from "services/shared/api/ApiActions";
import CountUp from "react-countup";

export default class cityinformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StreetChanged: this.props.StreetChanged,
      currentCity: this.props.currentCity,
      countHouses: 0,
      countSolarPanelHouses: 0,
      averageUsageEnergyRegion: 0,
      streetsCity: [],
      dataloaded: false,
    };
  }

  async fetchData() {
    await Axios.get(ApiActions.CityInfoStats, {
      params: {
        city: this.state.currentCity,
      },
    })
      .then((result) => {
        this.setState({
          countHouses: result.data.countHouses,
          countSolarPanelHouses: result.data.countSolarPanelHouses,
          averageUsageEnergyRegion: result.data.averageUsageEnergyRegion,
          streetsCity: result.data.streetsCity,
          dataloaded: true,
        });
      })
      .catch((result) => {
        console.log("error loading results");
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        {this.state.dataloaded ? (
          <div>
            <Container>
              <Row>
                <Col>
                  <h1>Houses</h1>
                  <img src='/assets/house/house.png' alt='house-icon' />
                  <CountUp end={this.state.countHouses} />
                </Col>
                <Col>
                  <h1>How many have sonar panals</h1>
                  <img
                    height='50px'
                    src='/assets/solarpark/solar-panel.png'
                    alt='solar-panel-icon'
                  />
                  <CountUp end={this.state.countSolarPanelHouses} />
                </Col>
                <Col>
                  <h1>Average energy consumption per house</h1>
                  <img
                    height='50px'
                    src='/assets/energy/energyicon.png'
                    alt='energyicon'
                  />
                  <CountUp end={this.state.averageUsageEnergyRegion} />
                </Col>
              </Row>
              <Form.Group controlId='formBasicSelectregion'>
                <Form.Label>Select street</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => {
                    this.state.StreetChanged(e.currentTarget.value);
                  }}
                >
                  <option>Select street</option>
                  {this.state.streetsCity.map((street) => (
                    <option key={street} value={street}>
                      {street}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Container>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
