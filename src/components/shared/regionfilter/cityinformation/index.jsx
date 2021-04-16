import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import ApiActions from "services/shared/api/ApiActions";
import CountUp from "react-countup";

class cityInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StreetChanged: this.props.StreetChanged,
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
        city: this.props.currentCity,
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
  componentDidUpdate(prevprops) {
    if (prevprops.currentCity !== this.props.currentCity) {
      this.fetchData();
    }
  }
  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        {this.state.dataloaded ? (
          <div>
            <Container>
              <Row>
                <Col>
                  <h3>{t("houses")}</h3>
                  <img src='/assets/house/house.png' alt='house-icon' />
                  <CountUp end={this.state.countHouses} />
                </Col>
                <Col>
                  <h3>{t("how many have solar panals")}</h3>
                  <img
                    height='50px'
                    src='/assets/solarpark/solar-panel.png'
                    alt='solar-panel-icon'
                  />
                  <CountUp end={this.state.countSolarPanelHouses} />
                </Col>
                <Col>
                  <h3>{t("average energy consumption per house")}</h3>
                  <img
                    height='50px'
                    src='/assets/energy/energyiconv2.png'
                    alt='energyicon'
                  />
                  <CountUp end={this.state.averageUsageEnergyRegion} />
                </Col>
              </Row>
              <Form.Group controlId='formBasicSelectregion'>
                <Form.Label>{t("select street")}</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => {
                    this.state.StreetChanged(e.currentTarget.value);
                  }}
                >
                  <option>{t("select street")}</option>
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
export default withTranslation("regionfilter")(cityInformation);
