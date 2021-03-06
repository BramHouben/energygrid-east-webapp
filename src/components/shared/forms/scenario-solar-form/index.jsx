import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { getFormDataInJson } from "services/shared/form-data-helper";
import { Form, FormGroup, Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import data from "data/solarparks-east.json";
import Datetime from "react-datetime";
import MapForm from "components/shared/maps/map-form";
import "./index.css";
import "moment/locale/nl";
import "react-datetime/css/react-datetime.css";
import ApiActions from "services/shared/api/ApiActions";
import { FormattedDate, FormHours } from "../form-checker";

class ScenarioSolarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scenarioItem: "ADD_SOLAR_PARK",
      scenarioItems: [
        { name: "ADD_SOLAR_PARK", value: "add_solarpark" },
        {
          name: "REMOVE_SOLAR_PARK",
          value: "remove_solarpark",
        },
        {
          name: "TURN_OFF_SOLAR_PARK",
          value: "turn_off_solarpark",
        },
      ],
      coordinates: [],
      selectedSolarPark: null,
      startDate: null,
    };

    this.handleStartChange = this.handleStartChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener("map-click-coordinates", (e) => {
      console.log(e);

      if (e.detail.coordinates !== null) {
        this.setState({ coordinates: e.detail.coordinates });
      }
    });
  }

  handleSelect = (e) => {
    this.setState({ selectedItem: e });
  };

  handleScenario(event) {
    this.setState({ scenarioItem: event.target.value });
  }

  handleStartChange(date) {
    this.setState({ startDate: date });
  }

  handleSelectSolarPark(event) {
    if (data && data.solarParks) {
      data.solarParks.map((solarPark) => {
        if (solarPark.applicant === event.target.value) {
          const coordinates = [
            solarPark.coordinates.y,
            solarPark.coordinates.x,
          ];
          this.setState({
            selectedSolarPark: solarPark,
            coordinates: coordinates,
          });

          window.dispatchEvent(
            new CustomEvent("set-marker", {
              bubbles: true,
              composed: true,
              detail: { coordinates: coordinates, type: "solar" },
            })
          );
        }
      });
    }
  }

  checkFormSolar(formDataObj) {
    let solarPark = {};
    if (!!formDataObj.solarUnit && formDataObj.solarUnit !== "null") {
      solarPark = JSON.parse(formDataObj.solarUnit);
      let newSolarPark = {};
      newSolarPark.id = parseInt(solarPark.id);
      newSolarPark.description = solarPark.text;
      newSolarPark.coordinates = formDataObj.coordinates;
      newSolarPark.solarPanelType = formDataObj.type;
      newSolarPark.numberOfPanels = formDataObj.amount;
      return newSolarPark;
    }
    solarPark.coordinates = formDataObj.coordinates;
    solarPark.solarPanelType = formDataObj.type;
    solarPark.numberOfPanels = formDataObj.amount;
    return solarPark;
  }

  async createSimulation(url, formDataObj) {
    Axios.post(url, formDataObj).then(() => {
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
      window.dispatchEvent(
        new CustomEvent("refresh-create-scenario", {
          bubbles: true,
          composed: true,
          detail: {},
        })
      );
    });
  }

  startSimulation(e) {
    e.preventDefault();
    let formDataObj = getFormDataInJson(e);
    let url = ApiActions.CreateScenarioSolar;
    if (!!formDataObj) {
      formDataObj.coordinates = JSON.parse(formDataObj.coordinates);
      formDataObj.solarUnit = this.checkFormSolar(formDataObj);

      if (!!formDataObj.amount) {
        formDataObj.amount = parseInt(formDataObj.amount);
        formDataObj.description =
          formDataObj.description + ", " + formDataObj.amount * 20 + " panels";
      }

      if (!!formDataObj.from && !!formDataObj.hours) {
        const dates = FormHours(formDataObj.from, formDataObj.hours);
        formDataObj.turnOffTimes = dates.join();
      }
      this.createSimulation(url, formDataObj);
    }
  }

  getJson() {
    const json = this.state.selectedSolarPark;
    if (json) return JSON.stringify(json);
    return null;
  }

  getCoordinatesJson() {
    let json;
    if (!!this.state.coordinates) {
      json = this.state.coordinates;
    }
    if (!!this.state.selectedSolarPark) {
      json = this.state.selectedSolarPark.coordinates;
    }
    const result = {
      x: !!json[1] ? json[1] : json.x,
      y: !!json[0] ? json[0] : json.y,
    };
    return JSON.stringify(result);
  }

  getFromJson() {
    let json = this.state.startDate;
    if (!!json) {
      json = FormattedDate(json);
    }
    return json;
  }

  getScenarioForm(scenario, translate) {
    switch (scenario) {
      case "REMOVE_SOLAR_PARK":
        return (
          <Col>
            <FormGroup>
              <Form.Label>{translate("select_solarpark")}</Form.Label>
              <Form.Control
                as='select'
                required
                onChange={this.handleSelectSolarPark.bind(this)}
              >
                <option>{translate("select")}</option>
                {data &&
                  data.solarParks &&
                  data.solarParks.map((solarPark) => {
                    return (
                      <option value={solarPark.applicant}>
                        {solarPark.applicant}
                      </option>
                    );
                  })}
              </Form.Control>
            </FormGroup>
          </Col>
        );
      case "TURN_OFF_SOLAR_PARK":
        return (
          <div>
            <Col>
              <FormGroup>
                <Form.Label>{translate("select_solarpark")}</Form.Label>
                <Form.Control
                  as='select'
                  required
                  onChange={this.handleSelectSolarPark.bind(this)}
                >
                  <option>{translate("select")}</option>
                  {data &&
                    data.solarParks &&
                    data.solarParks.map((solarPark) => {
                      return (
                        <option value={solarPark.applicant}>
                          {solarPark.applicant}
                        </option>
                      );
                    })}
                </Form.Control>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Form.Label>{translate("from")}</Form.Label>
                <Datetime
                  name='from'
                  locale={localStorage.getItem("language")}
                  value={this.state.startDate}
                  onChange={this.handleStartChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Form.Label>{translate("number_off_hours")}</Form.Label>
                <Form.Control placeholder='1' name='hours' type='number' />
              </FormGroup>
            </Col>
          </div>
        );
      default:
        console.log("Niks");
        break;
    }
  }

  render() {
    let { scenarioItem, scenarioItems, selectedSolarPark, coordinates } =
      this.state;

    const { t } = this.props;

    return (
      <div id='scenario-form'>
        <br />
        <Form
          onSubmit={this.startSimulation.bind(this)}
          id='scenario-solar-form'
        >
          <Form.Group>
            <Form.Label>{t("name")}</Form.Label>
            <Form.Control
              type='text'
              placeholder='Scenario 1'
              name='name'
              required
            />
          </Form.Group>
          <FormGroup>
            <Form.Label>{t("select_scenario")}</Form.Label>
            <Form.Control
              name='scenarioType'
              as='select'
              required
              onMouseLeave={this.handleScenario.bind(this)}
            >
              {scenarioItems &&
                scenarioItems.map((scenario) => {
                  return (
                    <option value={scenario.name}>{t(scenario.value)}</option>
                  );
                })}
            </Form.Control>
          </FormGroup>
          <Row>
            {this.getScenarioForm(scenarioItem, t)}
            <Col>
              <Form.Group>
                <Form.Label>{t("description")}</Form.Label>
                <Form.Control
                  placeholder={t("description")}
                  name='description'
                  type='text'
                  value={
                    this.state.selectedSolarPark &&
                    this.state.selectedSolarPark.zipcode +
                      " " +
                      this.state.selectedSolarPark.location
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <FormGroup>
                <Form.Label>{t("solar_type")}</Form.Label>
                <Form.Control
                  name='type'
                  as='select'
                  required
                  defaultValue={t("choose")}
                >
                  <option
                    selected={
                      this.state.selectedSolarPark &&
                      this.state.selectedSolarPark.type === "POLY_CRYSTALLINE"
                    }
                  >
                    POLY_CRYSTALLINE
                  </option>
                  <option
                    selected={
                      this.state.selectedSolarPark &&
                      this.state.selectedSolarPark.type === "MONO_CRYSTALLINE"
                    }
                  >
                    MONO_CRYSTALLINE
                  </option>
                </Form.Control>
              </FormGroup>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>{t("number_of_units")}</Form.Label>
                <Form.Control
                  placeholder='1'
                  name='amount'
                  type='number'
                  value={
                    this.state.selectedSolarPark &&
                    this.state.selectedSolarPark.units &&
                    this.state.selectedSolarPark.units
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>{t("coordinates")}</Form.Label>
                <MapForm />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Lat</Form.Label>
                <Form.Control
                  placeholder='lat'
                  name='latitude'
                  type='number'
                  value={
                    coordinates[1] ||
                    (selectedSolarPark && selectedSolarPark.coordinates
                      ? selectedSolarPark.coordinates[1]
                      : "")
                  }
                  disabled
                />
                <Form.Label>Lon</Form.Label>
                <Form.Control
                  placeholder='lon'
                  name='longitude'
                  type='number'
                  value={
                    coordinates[0] ||
                    (selectedSolarPark && selectedSolarPark.coordinates
                      ? selectedSolarPark.coordinates[0]
                      : "")
                  }
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <div className='scenario-btn'>
            <Button variant='primary' type='submit'>
              {t("start_simulation")}
            </Button>
          </div>
          <Form.Control
            type='hidden'
            name='coordinates'
            value={this.getCoordinatesJson()}
            data-cast='json'
          />
          <Form.Control
            type='hidden'
            name='from'
            value={this.getFromJson()}
            data-cast='json'
          />
          <Form.Control
            type='hidden'
            name='solarUnit'
            value={this.getJson()}
            data-cast='json'
          />
        </Form>
      </div>
    );
  }
}

export default withTranslation("scenario")(ScenarioSolarForm);
