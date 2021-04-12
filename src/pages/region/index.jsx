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
      regionChosen: false,
      streetChosen: false,
      currentregion: "",
      currentCity: "",
      currentStreet: "",
      items: [],
      viewport: {
        latitude: 52.18889722321286,
        longitude: 6.124005761032457,
        width: "83.5vw",
        height: "83.5vh",
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
      items: items,
    });
    console.log(this.state.items);
  }

  async cityChanged(city) {
    console.log(city);
    this.setState({
      currentCity: city,
    });
  }
  async StreetChanged(street) {
    console.log(street);
    this.setState({
      currentStreet: street,
      streetChosen: true,
    });
  }
  async regionchanged(region) {
    this.setState({
      currentregion: region,
      regionChosen: true,
    });
  }

  render() {
    if (!this.state.items.length > 1) {
      return <div />;
    }
    var updatelist = this.updatelist;
    var regions = this.state.regions;
    var cityChanged = this.cityChanged;
    var streetChanged = this.StreetChanged;
    var currentregion = this.state.currentregion;
    var currentCity = this.state.currentCity;
    var currentStreet = this.state.currentStreet;

    return (
      <div>
        <div className='header-wrapper'>
          <Header pageName='Details' />
          <FilterHeader />
        </div>
        <div className='content'>
          <Container className='regionContainer'>
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
            {this.state.currentregion !== "" ? (
              <RegionTable
                currentregion={currentregion}
                cityChanged={cityChanged.bind(this)}
              ></RegionTable>
            ) : (
              <div></div>
            )}
            {this.state.currentCity !== "" ? (
              <CityInformation
                currentCity={currentCity}
                StreetChanged={streetChanged.bind(this)}
              ></CityInformation>
            ) : (
              <div></div>
            )}
            {this.state.streetChosen ? (
              <div id='tableandmapregionhouse'>
                <HouseTable
                  currentcity={currentCity}
                  streetname={currentStreet}
                  updatelist={updatelist.bind(this)}
                />

                <ReactMapGL
                  {...this.state.viewport}
                  mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
                  onViewportChange={(viewport) => {
                    this.setState({ viewport: viewport });
                  }}
                >
                  {this.state.items.map((houses) => (
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
                </ReactMapGL>
              </div>
            ) : (
              <div></div>
            )}
          </Container>
        </div>
      </div>
    );
  }
}
