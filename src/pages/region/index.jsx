import React, { Component } from "react";
import { Container } from "react-bootstrap";
import RegionTable from "components/shared/tables/housetable";
import "./index.css";
import Header from "components/shared/header";
import FilterHeader from "components/shared/filter-header";
export default class Region extends Component {
  render() {
    return (
      <div>
        <div className='header-wrapper'>
          <Header pageName='Details' />
          <FilterHeader />
        </div>
        <div className='content'>
          <Container className='loginContainer'>
            <RegionTable />
          </Container>
        </div>
      </div>
    );
  }
}
