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
import { Get } from "services/shared/api/Api";
import {
  dateTimeTodayString,
  dateTodayString,
} from "services/shared/time-helper";

class ScenarioNuclearForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scenarioItem: "ADD_REACTOR",
      scenarioItems: [
        {
          name: "ADD_REACTOR",
          value: "add_reactor",
        },
        {
          name: "REMOVE_REACTOR",
          value: "remove_reactor",
        },
        {
          name: "SHUTOFF_REACTOR",
          value: "shutoff_reactor",
        },
      ],
      coordinates: [],
      selectedNuclearPlant: null,
      nuclearPlants: null,
      startDate: null,
    };

    this.handleStartChange = this.handleStartChange.bind(this);
  }

  async componentDidMount() {
    window.addEventListener("map-click-coordinates", (e) => {
      console.log(e);
      if (e.currentTarget.origin !== "http://20.84.201.30") {
        return;
      }
      if (e.detail.coordinates !== null) {
        this.setState({ coordinates: e.detail.coordinates });
      }
    });

    const result = await Get(ApiActions.AllNuclearSimulations);
    console.log(result);
    var simulations = await result.text();
    this.setState({ nuclearPlants: JSON.parse(simulations) });
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
    if (this.state && this.state.nuclearPlants) {
      this.state.nuclearPlants.map((nuclearPlant) => {
        if (nuclearPlant.name === event.target.value) {
          const coordinates = [
            nuclearPlant.coordinates.y,
            nuclearPlant.coordinates.x,
          ];
          this.setState({
            selectedNuclearPlant: nuclearPlant,
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

  checkNuclearForm(formDataObj) {
    let nuclearPlant = {};
    if (!!formDataObj.nuclearPlant && formDataObj.nuclearPlant !== "null") {
      nuclearPlant.id = this.state.selectedNuclearPlant.simulationId;
      nuclearPlant.startTime = dateTimeTodayString();
      nuclearPlant.startTimeEvent = dateTimeTodayString();
      nuclearPlant.hours = formDataObj.hours;
      nuclearPlant.scenarioType = 0;
      nuclearPlant.power = this.state.selectedNuclearPlant.maxPower;
      nuclearPlant.coordinates = formDataObj.coordinates;

      return nuclearPlant;
    }

    return formDataObj;
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
    formDataObj = this.checkNuclearForm(formDataObj);
    let url;
    if (formDataObj.scenarioType !== "null") {
      url = ApiActions.CreateScenarioNuclear;
    } else {
      url = ApiActions.CreateSimulationNuclear;
    }

    if (!!formDataObj) {
      formDataObj.coordinates = JSON.parse(formDataObj.coordinates);
      if (!!formDataObj.from && !!formDataObj.hours) {
        const dates = FormHours(formDataObj.from, formDataObj.hours);
        formDataObj.turnOffTimes = dates.join();
      }
      this.createSimulation(url, formDataObj);
    }
  }

  getJson() {
    const json = this.state.selectedNuclearPlant;
    if (json) return JSON.stringify(json);
    return null;
  }

  getCoordinatesJson() {
    let json;
    if (!!this.state.coordinates) {
      json = this.state.coordinates;
    }
    if (!!this.state.selectedNuclearPlant) {
      json = this.state.selectedNuclearPlant.coordinates;
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
      case "REMOVE_REACTOR":
        return (
          <Col>
            <FormGroup>
              <Form.Label>{translate("select_nuclear")}</Form.Label>
              <Form.Control
                as='select'
                required
                onChange={this.handleSelectSolarPark.bind(this)}
              >
                <option>{translate("select")}</option>
                {this.state &&
                  this.state.nuclearPlants &&
                  this.state.nuclearPlants.map((nuclearPlant) => {
                    return (
                      <option value={nuclearPlant.name}>
                        {nuclearPlant.name}
                      </option>
                    );
                  })}
              </Form.Control>
            </FormGroup>
          </Col>
        );
      case "SHUTOFF_REACTOR":
        return (
          <div>
            <Col>
              <FormGroup>
                <Form.Label>{translate("select_nuclear")}</Form.Label>
                <Form.Control
                  as='select'
                  required
                  onChange={this.handleSelectSolarPark.bind(this)}
                >
                  <option>{translate("select")}</option>
                  {this.state &&
                    this.state.nuclearPlants &&
                    this.state.nuclearPlants.map((nuclearPlant) => {
                      return (
                        <option value={nuclearPlant.name}>
                          {nuclearPlant.name}
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
    let { scenarioItem, scenarioItems, selectedNuclearPlant, coordinates } =
      this.state;

    const { t } = this.props;

    return (
      <div id='scenario-form'>
        <br />
        <Form
          onSubmit={this.startSimulation.bind(this)}
          id='scenario-nuclear-form'
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
              <FormGroup>
                <Form.Label>{t("reactor_type")}</Form.Label>
                <Form.Control
                  name='reactorGeneration'
                  as='select'
                  required
                  defaultValue={t("choose")}
                >
                  <option
                    selected={
                      this.state.selectedNuclearPlant &&
                      this.state.selectedNuclearPlant.reactorGeneration === 1
                    }
                    value={1}
                  >
                    1st Generation Reactor
                  </option>
                  <option
                    selected={
                      this.state.selectedNuclearPlant &&
                      this.state.selectedNuclearPlant.reactorGeneration === 2
                    }
                    value={2}
                  >
                    2nd Generation Reactor
                  </option>
                  <option
                    selected={
                      this.state.selectedNuclearPlant &&
                      this.state.selectedNuclearPlant.reactorGeneration === 3
                    }
                    value={3}
                  >
                    3rd Generation Reactor
                  </option>
                </Form.Control>
              </FormGroup>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>{t("max_power")}</Form.Label>
                <Form.Control
                  placeholder='1'
                  name='maxPower'
                  type='number'
                  value={
                    this.state.selectedNuclearPlant &&
                    this.state.selectedNuclearPlant.maxPower &&
                    this.state.selectedNuclearPlant.maxPower
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
                    (selectedNuclearPlant && selectedNuclearPlant.coordinates
                      ? selectedNuclearPlant.coordinates[1]
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
                    (selectedNuclearPlant && selectedNuclearPlant.coordinates
                      ? selectedNuclearPlant.coordinates[0]
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
            name='nuclearPlant'
            value={this.getJson()}
            data-cast='json'
          />
        </Form>
      </div>
    );
  }
}

export default withTranslation("scenario")(ScenarioNuclearForm);
