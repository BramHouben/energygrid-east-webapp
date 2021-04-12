import React, { Component } from "react";
import Axios from "axios";
import { Form } from "react-bootstrap";
import ApiActions from "services/shared/api/ApiActions";

export default class RegionCityTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentregion: this.props.currentregion,
      cities: [],
      dataloaded: false,
      cityChanged: this.props.cityChanged,
    };
  }

  async fetchCityData() {
    await Axios.get(ApiActions.AllCitiesRegion, {
      params: {
        region: this.state.currentregion,
      },
    })
      .then((result) => {
        this.setState({
          cities: result.data,
        });
      })
      .catch((result) => {
        console.log("error loading results");
      });
  }

  componentDidMount() {
    console.log("new component" + this.state.currentregion);
    this.fetchCityData();
  }

  render() {
    let cities = this.state.cities;

    return (
      <div>
        {cities.length > 0 ? (
          <Form.Group controlId='formBasicSelectregion'>
            <Form.Label>Select city</Form.Label>
            <Form.Control
              as='select'
              onChange={(e) => {
                this.state.cityChanged(e.currentTarget.value);
              }}
            >
              <option>select city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        ) : (
          <div>Select a city</div>
        )}
      </div>
    );
  }
}
