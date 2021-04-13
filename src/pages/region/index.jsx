import React, { Component } from "react";
import { Container } from "react-bootstrap";
import HouseTable from "components/shared/tables/housetable";
import "./index.css";
import { Form } from "react-bootstrap";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Header from "components/shared/header";
import FilterHeader from "components/shared/filter-header";
import CityInformation from "components/shared/tables/cityinformation";
import RegionTable from "components/shared/tables/RegionCityTable";
export default class region extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      totalsize: 0,
      regions: ["Flevoland", "Overijssel", "Gelderland"],
      streetChosen: false,
      currentregion: "",
      currentCity: "",
      currentStreet: "",
      items: [],
      viewport: {
        latitude: 52.18889722321286,
        longitude: 6.124005761032457,
        width: "40wh",
        height: "40vh",
        zoom: 8,
      },
      selectedhouses: {},
    };
    this.updatelist = this.updatelist.bind(this);
    this.cityChanged = this.cityChanged.bind(this);
    this.StreetChanged = this.StreetChanged.bind(this);
  }

  async updatelist(items) {
    this.setState({
      items,
    });
    console.log(items);
  }

  async cityChanged(currentCity) {
    this.setState({
      currentCity,
      streetChosen: false,
    });
  }
  async StreetChanged(currentStreet) {
    console.log(currentStreet);
    this.setState({
      currentStreet,
      streetChosen: true,
    });
  }
  async regionchanged(currentregion) {
    console.log(region);
    this.setState({
      currentCity: "",
      streetChosen: false,
      currentregion,
    });
  }

  render() {
    if (!this.state.items.length > 1) {
      return <div />;
    }

    const {
      regions,
      currentregion,
      currentCity,
      currentStreet,
      streetChosen,
      items,
      viewport,
    } = this.state;

    return (
      <div>
        <div className='header-wrapper'>
          <Header pageName='Details' />
          <FilterHeader />
        </div>
        <div id='regiondetailsinfo'>
          <Form.Group controlId='formBasicSelectregion'>
            <Form.Label>Select region</Form.Label>
            <Form.Control
              as='select'
              onChange={(e) => {
                this.regionchanged(e.target.value);
              }}
            >
              <option>Select region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {currentregion !== "" ? (
            <RegionTable
              currentregion={currentregion}
              cityChanged={(currentCity) => this.cityChanged(currentCity)}
            ></RegionTable>
          ) : (
            <div></div>
          )}
          {currentCity !== "" ? (
            <CityInformation
              currentCity={currentCity}
              StreetChanged={(street) => this.StreetChanged(street)}
            ></CityInformation>
          ) : (
            <div></div>
          )}
          {streetChosen ? (
            <HouseTable
              currentcity={currentCity}
              streetname={currentStreet}
              updatelist={(items) => this.updatelist(items)}
            />
          ) : (
            <div></div>
          )}
          {streetChosen ? (
            <ReactMapGL
              {...viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
              onViewportChange={(viewport) => {
                this.setState({ viewport });
              }}
            >
              {items.map((houses) => (
                <Marker
                  key={houses.id}
                  latitude={houses.coordinates[1]}
                  longitude={houses.coordinates[0]}
                >
                  <button
                    className='marker-btn'
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        selectedhouses: houses,
                      });
                    }}
                  >
                    <img src='/assets/house/house.png' alt='house-icon' />
                  </button>
                </Marker>
              ))}
            </ReactMapGL>
          ) : (
            <div></div>
          )}

          {/* {this.selectedhouses ? (
                      <Popup
                        className='popup'
                        latitude={this.selectedhouses.coordinates[1]}
                        longitude={this.selectedhouses.coordinates[0]}
                        onClose={() => {
                          this.setState({
                            selectedhouses: null,
                          });
                        }}
                      >
                        <div id='popup-items'>
                          <h4>{this.selectedhouses.street}</h4>
                          <p>
                            {this.selectedhouses.region}{" "}
                            {this.selectedhouses.postcode}{" "}
                            {this.selectedhouses.number}{" "}
                          </p>
                          <p>
                            <b>Province: </b>
                            {this.selectedhouses.region}
                          </p>
                        </div>
                      </Popup>
                    ) : null} */}
        </div>
      </div>
    );
  }
}
