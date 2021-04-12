import React, { Component } from "react";
import { Form, Button, Dropdown, FormGroup, Row, Col } from "react-bootstrap";

import MapForm from "components/shared/maps/map-form";

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
    };
  }

  componentDidMount() {
    window.addEventListener("map-click-coordinates", (e) => {
      console.log("dit werkt", e.detail.coordinates);
      if (e.detail.coordinates !== null) {
        this.setState({ coordinates: e.detail.coordinates });
      }
    });
  }

  handleSelect = (e) => {
    this.setState({ selectedItem: e });
  };

  handleScenario(event) {
    console.log(event.target.value);
    this.setState({ scenarioItem: event.target.value });
    console.log(this.state.scenarioItem);
  }

  getScenarioForm(scenario) {
    console.log(scenario);
    switch (scenario) {
      case "ADD_WIND_PARK":
        return (
          <div>
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
                    placeholder="Amount"
                    type="number"
                    value={this.state.coordinates[1]}
                    disabled
                  />
                  <Form.Label>Lon</Form.Label>
                  <Form.Control
                    placeholder="Amount"
                    type="number"
                    value={this.state.coordinates[0]}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        );
      case "ADD_WIND_TURBINE":
      case "REMOVE_WIND_TURBINE":
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
          </Form>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
