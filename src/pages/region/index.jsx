import React, { Component, useState } from "react";
import { Container } from "react-bootstrap";
import RegionTable from "components/shared/tables/housetable";
import "./index.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Header from "components/shared/header";
import FilterHeader from "components/shared/filter-header";

export default class Region extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      totalsize: 0,
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
    // this.fetchData = this.fetchData.bind(this);
  }

  async updatelist(items) {
    this.setState({
      items: items,
    });
    console.log(this.state.items);
  }

  // componentDidMount() {
  //   <Streetmap data={this.state.items}></Streetmap>;
  // }
  // async fetchData(page = this.state.page, sizePerPage = 10) {
  //   Axios.get(ApiActions.StreetInfo, {
  //     params: {
  //       streetname: "Josephine Bakerstraat",
  //       page: page,
  //     },
  //   })
  //     .then((result) => {
  //       this.setState({
  //         items: result.data.houses,
  //         totalsize: result.data.totalStreet,
  //       });
  //     })
  //     .catch((result) => {
  //       console.log("error loading results");
  //     });
  // }
  render() {
    if (!this.state.items) {
      return <div />;
    }
    var updatelist = this.updatelist;

    return (
      <div>
        <div className='header-wrapper'>
          <Header pageName='Details' />
          <FilterHeader />
        </div>
        <div className='content'>
          <Container className='loginContainer'>
            <RegionTable updatelist={updatelist.bind(this)} />
            {this.state.items && this.state.items.length > 0 ? (
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
                ))}{" "}
                {this.selectedhouses ? (
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
                ) : null}
              </ReactMapGL>
            ) : (
              <div></div>
            )}
          </Container>
        </div>
      </div>
    );
  }
}
