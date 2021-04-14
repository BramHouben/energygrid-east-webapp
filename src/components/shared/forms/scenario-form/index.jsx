import React, { Component } from "react";
import { Form, Dropdown, FormGroup, Row, Col, Button } from "react-bootstrap";

import MapForm from "components/shared/maps/map-form";
import data from "data/turbine.json";
import "./index.css";
import { getFormData } from "services/shared/form-data-helper";

import Axios from "axios";
import Datetime from "react-datetime";
import moment from "moment";
import "moment/locale/nl";

import "react-datetime/css/react-datetime.css";

export default class ScenarioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: "",
      items: ["Wind", "Sun"],
      scenarioItem: "ADD_WIND_PARK",
      scenarioItems: [
        { name: "ADD_WIND_PARK", value: "Windpark toevoegen" },
        {
          name: "ADD_WIND_TURBINE",
          value: "Windmolen toevoegen",
        },
        {
          name: "REMOVE_WIND_TURBINE",
          value: "Windmolen verwijderen",
        },
        {
          name: "TURN_OFF_WIND_TURBINE",
          value: "Zet windmolen tijdelijk uit",
        },
      ],
      coordinates: [],
      selectedTurbine: null,
      startDate: null,
    };

    this.handleStartChange = this.handleStartChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener("map-click-coordinates", (e) => {
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

  handleSelectTurbine(event) {
    if (data && data.turbines) {
      data.turbines.map((turbine) => {
        if (turbine.title === event.target.value) {
          this.setState({ selectedTurbine: turbine });

          window.dispatchEvent(
            new CustomEvent("set-marker", {
              bubbles: true,
              composed: true,
              detail: { coordinates: turbine.geometry.coordinates },
            })
          );
        }
      });
    }
  }

  startSimulation(e) {
    e.preventDefault();
    const formDataObj = getFormData(e);
    if (!!formDataObj) {
      let url = "http://localhost:8081/scenario/wind/create";
      formDataObj.coordinates = JSON.parse(formDataObj.coordinates);
      formDataObj.type = parseFloat(formDataObj.type);

      if (!!formDataObj.windTurbine && formDataObj.windTurbine !== "null") {
        let windTurbine = JSON.parse(formDataObj.windTurbine);
        let newWindTurbine = {};
        newWindTurbine.turbineId = parseInt(windTurbine.id);
        newWindTurbine.description = windTurbine.text;
        newWindTurbine.coordinates = formDataObj.coordinates;
        newWindTurbine.type = formDataObj.type;
        formDataObj.windTurbine = newWindTurbine;
      } else {
        formDataObj.windTurbine = {};
        formDataObj.windTurbine.coordinates = formDataObj.coordinates;
        formDataObj.windTurbine.type = formDataObj.type;
      }

      if (!!formDataObj.turbineId) {
        formDataObj.windTurbine.turbineId = parseInt(formDataObj.turbineId);
      }

      if (!!formDataObj.amount) {
        formDataObj.amount = parseInt(formDataObj.amount);
      }

      if (!!formDataObj.from && formDataObj.hours) {
        console.log(formDataObj.from + ":" + formDataObj.hours);
        let dates = [];
        let date = new Date(formDataObj.from);
        for (var i = 0; i <= parseInt(formDataObj.hours); i++) {
          let newDate = new Date(date.valueOf() + i * 1000 * 60 * 60);
          let year = newDate.getFullYear();
          let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
          let day = ("0" + newDate.getDate()).slice(-2);
          let hours = "0" + newDate.getHours();
          let minutes = "0" + newDate.getMinutes();

          let formattedTime =
            year +
            "-" +
            month +
            "-" +
            day +
            "T" +
            hours.substr(-2) +
            ":" +
            minutes.substr(-2);
          dates.push(formattedTime);
        }

        url = url + "?times=" + dates.join();
      }

      Axios.post(url, {
        name: formDataObj.name,
        scenarioType: formDataObj.scenarioType,
        description: formDataObj.description,
        type: formDataObj.type,
        windTurbine: formDataObj.windTurbine,
        amount: formDataObj.amount,
        coordinates: formDataObj.coordinates,
      })
        .then((response) => {
          console.log(response);
        })
        .catch(() => {
          console.log("Werkt niet");
        });
    }
  }

  getScenarioForm(scenario) {
    switch (scenario) {
      case "ADD_WIND_PARK":
        return (
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Beschrijving</Form.Label>
                <Form.Control
                  placeholder="description"
                  name="description"
                  type="text"
                  value={
                    this.state.selectedTurbine &&
                    this.state.selectedTurbine.text
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Aantal turbines</Form.Label>
                <Form.Control
                  placeholder="Amount"
                  name="amount"
                  type="number"
                />
              </Form.Group>
            </Col>
            <Col>
              <FormGroup>
                <Form.Label>Type turbine</Form.Label>
                <Form.Control
                  name="type"
                  as="select"
                  required
                  defaultValue="Kies..."
                >
                  <option>1.8</option>
                  <option>2.0</option>
                  <option>3.0</option>
                </Form.Control>
              </FormGroup>
            </Col>
          </Row>
        );
      case "ADD_WIND_TURBINE":
        return (
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Id</Form.Label>
                <Form.Control placeholder="1" name="turbineId" type="number" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Beschrijving</Form.Label>
                <Form.Control
                  placeholder="description"
                  name="description"
                  type="text"
                  value={
                    this.state.selectedTurbine &&
                    this.state.selectedTurbine.text
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <FormGroup>
                <Form.Label>Type turbine</Form.Label>
                <Form.Control
                  name="type"
                  as="select"
                  required
                  defaultValue="Kies..."
                >
                  <option>1.8</option>
                  <option>2.0</option>
                  <option>3.0</option>
                </Form.Control>
              </FormGroup>
            </Col>
          </Row>
        );
      case "REMOVE_WIND_TURBINE":
        return (
          <Row>
            <Col>
              <FormGroup>
                <Form.Label>Selecteer turbine</Form.Label>
                <Form.Control
                  as="select"
                  required
                  onChange={this.handleSelectTurbine.bind(this)}
                >
                  <option>---Select---</option>
                  {data &&
                    data.turbines &&
                    data.turbines.map((turbine) => {
                      return (
                        <option value={turbine.title}>{turbine.title}</option>
                      );
                    })}
                </Form.Control>
              </FormGroup>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Beschrijving</Form.Label>
                <Form.Control
                  placeholder="description"
                  name="description"
                  type="text"
                  value={
                    this.state.selectedTurbine &&
                    this.state.selectedTurbine.text
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Type turbine</Form.Label>
                <Form.Control
                  placeholder="1.8"
                  name="type"
                  type="text"
                  value={
                    this.state.selectedTurbine &&
                    this.state.selectedTurbine.type.toFixed(1)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        );
      case "TURN_OFF_WIND_TURBINE":
        return (
          <Row>
            <Col>
              <FormGroup>
                <Form.Label>Selecteer turbine</Form.Label>
                <Form.Control
                  as="select"
                  required
                  onChange={this.handleSelectTurbine.bind(this)}
                >
                  <option>---Select---</option>
                  {data &&
                    data.turbines &&
                    data.turbines.map((turbine) => {
                      return (
                        <option value={turbine.title}>{turbine.title}</option>
                      );
                    })}
                </Form.Control>
              </FormGroup>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Beschrijving</Form.Label>
                <Form.Control
                  placeholder="description"
                  name="description"
                  type="text"
                  value={
                    this.state.selectedTurbine &&
                    this.state.selectedTurbine.text
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Type turbine</Form.Label>
                <Form.Control
                  placeholder="1.8"
                  name="type"
                  type="text"
                  value={
                    this.state.selectedTurbine &&
                    this.state.selectedTurbine.type.toFixed(1)
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <FormGroup>
                <Form.Label>Van: </Form.Label>
                <Datetime
                  name="from"
                  locale="nl"
                  value={this.state.startDate}
                  onChange={this.handleStartChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Form.Label>Aantal uren: </Form.Label>
                <Form.Control placeholder="1" name="hours" type="number" />
              </FormGroup>
            </Col>
          </Row>
        );
      default:
        console.log("Niks");
        break;
    }
  }

  getJson() {
    const json = this.state.selectedTurbine;
    console.log(json);
    if (json) return JSON.stringify(json);
    return null;
  }

  getCoordinatesJson() {
    let json;
    if (!!this.state.coordinates) {
      json = this.state.coordinates;
    }
    if (!!this.state.selectedTurbine) {
      json = this.state.selectedTurbine.geometry.coordinates;
    }

    const result = { x: json[1], y: json[0] };
    return JSON.stringify(result);
  }

  getFromJson() {
    let json = this.state.startDate;
    if (!!json) {
      json = this.getFormattedDate(json);
    }
    return json;
  }

  getFormattedDate(d) {
    let date = new Date(d);

    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = "0" + date.getHours();
    let minutes = "0" + date.getMinutes();

    let formattedTime =
      year +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hours.substr(-2) +
      ":" +
      minutes.substr(-2);

    return formattedTime;
  }

  render() {
    let {
      selectedItem,
      items,
      scenarioItem,
      scenarioItems,
      selectedTurbine,
      coordinates,
    } = this.state;

    return (
      <div id="scenario-form">
        <Dropdown onSelect={this.handleSelect}>
          <Dropdown.Toggle variant="secondary">
            {selectedItem ? selectedItem : "Kies categorie"}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ height: "auto" }}>
            {items.map((item) => (
              <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <br />
        {selectedItem && selectedItem === "Wind" ? (
          <Form onSubmit={this.startSimulation}>
            <Form.Group>
              <Form.Label>Naam</Form.Label>
              <Form.Control
                type="text"
                placeholder="Scenario 1"
                name="name"
                required
              />
            </Form.Group>
            <FormGroup>
              <Form.Label>Selecteer scenario</Form.Label>
              <Form.Control
                name="scenarioType"
                as="select"
                required
                onChange={this.handleScenario.bind(this)}
              >
                {scenarioItems &&
                  scenarioItems.map((scenario) => {
                    return (
                      <option value={scenario.name}>{scenario.value}</option>
                    );
                  })}
              </Form.Control>
            </FormGroup>

            {this.getScenarioForm(scenarioItem)}

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Coordinaten</Form.Label>
                  <MapForm />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Lat</Form.Label>
                  <Form.Control
                    placeholder="lat"
                    name="latitude"
                    type="number"
                    value={
                      coordinates[1] ||
                      (selectedTurbine &&
                      selectedTurbine.geometry &&
                      selectedTurbine.geometry.coordinates[1]
                        ? selectedTurbine.geometry.coordinates[1]
                        : "")
                    }
                    disabled
                  />
                  <Form.Label>Lon</Form.Label>
                  <Form.Control
                    placeholder="lon"
                    name="longitude"
                    type="number"
                    value={
                      coordinates[0] ||
                      (selectedTurbine &&
                      selectedTurbine.geometry &&
                      selectedTurbine.geometry.coordinates[0]
                        ? selectedTurbine.geometry.coordinates[0]
                        : "")
                    }
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="scenario-btn">
              <Button variant="primary" type="submit">
                Start simulatie
              </Button>
            </div>
            <Form.Control
              type="hidden"
              name="windTurbine"
              value={this.getJson()}
              data-cast="json"
            />
            <Form.Control
              type="hidden"
              name="coordinates"
              value={this.getCoordinatesJson()}
              data-cast="json"
            />
            <Form.Control
              type="hidden"
              name="from"
              value={this.getFromJson()}
              data-cast="json"
            />
          </Form>
        ) : (
          <div>{selectedItem === "Sun" ? "Currently not available" : ""}</div>
        )}
      </div>
    );
  }
}
