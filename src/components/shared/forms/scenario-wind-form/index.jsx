import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { getFormDataInJson } from "services/shared/form-data-helper";
import { Form, Dropdown, FormGroup, Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import data from "data/turbine.json";
import Datetime from "react-datetime";
import MapForm from "components/shared/maps/map-form";
import ScenarioSolarForm from "components/shared/forms/scenario-solar-form";
import ScenarioNuclearForm from "components/shared/forms/scenario-nuclear-form";
import "./index.css";
import "moment/locale/nl";
import "react-datetime/css/react-datetime.css";
import ApiActions from "services/shared/api/ApiActions";
import { FormattedDate, FormHours } from "../form-checker";

class ScenarioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: "",
      items: ["wind", "sun", "Nuclear"],
      scenarioItem: "ADD_WIND_PARK",
      scenarioItems: [
        { name: "ADD_WIND_PARK", value: "add_windpark" },
        {
          name: "ADD_WIND_TURBINE",
          value: "add_turbine",
        },
        {
          name: "REMOVE_WIND_TURBINE",
          value: "remove_turbine",
        },
        {
          name: "TURN_OFF_WIND_TURBINE",
          value: "turn_off_turbine",
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
      console.log(e);
      if (e.currentTarget.origin !== "http://20.84.201.30") {
        return;
      }
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
              detail: {
                coordinates: turbine.geometry.coordinates,
                type: "wind",
              },
            })
          );
        }
      });
    }
  }

  checkFormTurbine(formDataObj) {
    let windTurbine = {};
    if (!!formDataObj.windTurbine && formDataObj.windTurbine !== "null") {
      windTurbine = JSON.parse(formDataObj.windTurbine);
      let newWindTurbine = {};
      newWindTurbine.turbineId = parseInt(windTurbine.id);
      newWindTurbine.description = windTurbine.text;
      newWindTurbine.coordinates = formDataObj.coordinates;
      newWindTurbine.type = formDataObj.type;
      return newWindTurbine;
    }
    windTurbine.coordinates = formDataObj.coordinates;
    windTurbine.type = formDataObj.type;
    return windTurbine;
  }

  createSimulation(url, formDataObj) {
    Axios.post(url, formDataObj)
      .then((response) => {
        if (response.status === 200) {
          var modal = document.getElementById("myModal");
          modal.style.display = "none";

          window.dispatchEvent(
            new CustomEvent("refresh-create-scenario", {
              bubbles: true,
              composed: true,
              detail: {},
            })
          );
        }
      })
      .catch(() => {
        console.log("Werkt niet");
      });
  }

  startSimulation(e) {
    e.preventDefault();
    let formDataObj = getFormDataInJson(e);
    let url = ApiActions.CreateScenarioWind;
    if (!!formDataObj) {
      formDataObj.coordinates = JSON.parse(formDataObj.coordinates);
      formDataObj.type = parseFloat(formDataObj.type);
      formDataObj.windTurbine = this.checkFormTurbine(formDataObj);

      if (!!formDataObj.turbineId) {
        formDataObj.windTurbine.turbineId = parseInt(formDataObj.turbineId);
      }

      if (!!formDataObj.amount) {
        formDataObj.amount = parseInt(formDataObj.amount);
      }

      if (!!formDataObj.from && formDataObj.hours) {
        const dates = FormHours(formDataObj.from, formDataObj.hours);
        formDataObj.windTurbineOffTimes = dates.join();
      }
      this.createSimulation(url, formDataObj);
    }
  }

  getJson() {
    const json = this.state.selectedTurbine;
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
      json = FormattedDate(json);
    }
    return json;
  }

  getScenarioForm(scenario, translate) {
    switch (scenario) {
      case "ADD_WIND_PARK":
        return (
          <Col>
            <Form.Group>
              <Form.Label>{translate("number_of_turbines")}</Form.Label>
              <Form.Control placeholder='1' name='amount' type='number' />
            </Form.Group>
          </Col>
        );
      case "ADD_WIND_TURBINE":
        return (
          <Col>
            <Form.Group>
              <Form.Label>{translate("id")}</Form.Label>
              <Form.Control placeholder='1' name='turbineId' type='number' />
            </Form.Group>
          </Col>
        );
      case "REMOVE_WIND_TURBINE":
        return (
          <Col>
            <FormGroup>
              <Form.Label>{translate("select_turbine")}</Form.Label>
              <Form.Control
                as='select'
                required
                onChange={this.handleSelectTurbine.bind(this)}
              >
                <option>{translate("select")}</option>
                {data &&
                  data.turbines &&
                  data.turbines.map((windmill) => {
                    return (
                      <option value={windmill.title}>{windmill.title}</option>
                    );
                  })}
              </Form.Control>
            </FormGroup>
          </Col>
        );
      case "TURN_OFF_WIND_TURBINE":
        return (
          <div>
            <Col>
              <FormGroup>
                <Form.Label>{translate("select_turbine")}</Form.Label>
                <Form.Control
                  as='select'
                  required
                  onChange={this.handleSelectTurbine.bind(this)}
                >
                  <option>{translate("select")}</option>
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
    let {
      selectedItem,
      items,
      scenarioItem,
      scenarioItems,
      selectedTurbine,
      coordinates,
    } = this.state;

    const { t } = this.props;

    return (
      <div id='scenario-form'>
        <Dropdown onSelect={this.handleSelect}>
          <Dropdown.Toggle variant='secondary'>
            {selectedItem ? t(selectedItem) : t("choose_category")}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ height: "auto" }}>
            {items.map((item) => (
              <Dropdown.Item eventKey={item}>{t(item)}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <br />
        {(selectedItem && selectedItem === "Wind") ||
        selectedItem === "wind" ? (
          <Form onSubmit={this.startSimulation.bind(this)} id='scenario-form'>
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
                onChange={this.handleScenario.bind(this)}
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
                    name='type'
                    as='select'
                    required
                    defaultValue={t("choose")}
                  >
                    <option
                      selected={
                        this.state.selectedTurbine &&
                        this.state.selectedTurbine.type === 1.8
                      }
                    >
                      1.8
                    </option>
                    <option
                      selected={
                        this.state.selectedTurbine &&
                        this.state.selectedTurbine.type === 2.0
                      }
                    >
                      2.0
                    </option>
                    <option
                      selected={
                        this.state.selectedTurbine &&
                        this.state.selectedTurbine.type === 3.0
                      }
                    >
                      3.0
                    </option>
                  </Form.Control>
                </FormGroup>
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
                      (selectedTurbine && selectedTurbine.geometry
                        ? selectedTurbine.geometry.coordinates[1]
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
                      (selectedTurbine && selectedTurbine.geometry
                        ? selectedTurbine.geometry.coordinates[0]
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
              name='windTurbine'
              value={this.getJson()}
              data-cast='json'
            />
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
          </Form>
        ) : selectedItem === "Sun" || selectedItem === "sun" ? (
          <ScenarioSolarForm />
        ) : selectedItem === "Nuclear" || selectedItem === "nuclear" ? (
          <ScenarioNuclearForm />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default withTranslation("scenario")(ScenarioForm);
