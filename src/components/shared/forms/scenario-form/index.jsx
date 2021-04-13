import React, { Component } from "react";
import { Form, Dropdown, FormGroup, Row, Col, Button } from "react-bootstrap";

import MapForm from "components/shared/maps/map-form";
import data from "data/turbine.json";
import "./index.css";

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
          value: "Zet winmolen tijdelijk uit",
        },
      ],
      coordinates: [],
      selectedTurbine: null,
    };
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

  startSimulation() {
    console.log("StartSImulatie");
  }

  getScenarioForm(scenario) {
    switch (scenario) {
      case "ADD_WIND_PARK":
        return (
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Aantal turbines</Form.Label>
                <Form.Control placeholder="Amount" type="number" />
              </Form.Group>
            </Col>
            <Col>
              <FormGroup>
                <Form.Label>Type turbine</Form.Label>
                <Form.Control as="select" required defaultValue="Kies...">
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
          <FormGroup>
            <Form.Label>Type turbine</Form.Label>
            <Form.Control as="select" required defaultValue="Kies...">
              <option>1.8</option>
              <option>2.0</option>
              <option>3.0</option>
            </Form.Control>
          </FormGroup>
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
                  type="text"
                  value={
                    this.state.selectedTurbine &&
                    this.state.selectedTurbine.text
                  }
                  disabled
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Type turbine</Form.Label>
                <Form.Control
                  placeholder="1.8"
                  type="text"
                  value={
                    this.state.selectedTurbine &&
                    this.state.selectedTurbine.type.toFixed(1)
                  }
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
        );
      default:
        console.log("Niks");
        break;
    }
  }

  render() {
    let { selectedItem, items, scenarioItem, scenarioItems } = this.state;

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
          <Form>
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
                    type="number"
                    value={
                      this.state.coordinates[1] ||
                      (this.state.selectedTurbine &&
                        this.state.selectedTurbine.geometry &&
                        this.state.selectedTurbine.geometry.coordinates[1])
                    }
                    disabled
                  />
                  <Form.Label>Lon</Form.Label>
                  <Form.Control
                    placeholder="lon"
                    type="number"
                    value={
                      this.state.coordinates[0] ||
                      (this.state.selectedTurbine &&
                        this.state.selectedTurbine.geometry &&
                        this.state.selectedTurbine.geometry.coordinates[0])
                    }
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="scenario-btn">
              <Button variant="primary" onClick={this.startSimulation}>
                Start simulatie
              </Button>
            </div>
          </Form>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
