import React, { Component } from "react";
import Axios from "axios";
import { Form } from "react-bootstrap";
import ApiActions from "services/shared/api/ApiActions";

export default class RegionCityTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      dataloaded: false,
    };
  }

  async fetchCityData() {
    await Axios.get(ApiActions.AllCitiesRegion, {
      params: {
        region: this.props.currentregion,
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

  componentDidUpdate(prevprops) {
    if (prevprops.currentregion !== this.props.currentregion) {
      this.fetchCityData();
    }
  }

  componentDidMount() {
    this.fetchCityData();
  }

  render() {
    const { cities } = this.state;

    return (
      <div>
        {cities.length > 0 ? (
          <Form.Group controlId='formBasicSelectregion'>
            <Form.Label>Select city</Form.Label>
            <Form.Control
              as='select'
              onChange={(e) => {
                this.props.cityChanged(e.currentTarget.value);
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
