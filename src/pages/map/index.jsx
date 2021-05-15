import React from "react";
import Footer from "components/shared/footer";
import Maps from "components/shared/maps";
import Header from "components/shared/header";
import FilterHeader from "components/shared/filter-header";
import "./index.css";

export default class Map extends React.Component {
  render() {
    return (
      <div>
        <div className="header-wrapper">
          <Header pageName="Details" />
          <FilterHeader />
        </div>
        <div id="map-container">
          <Maps />
        </div>{" "}
        <Footer />
      </div>
    );
  }
}
