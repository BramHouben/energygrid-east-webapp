import "./index.css";
import React, { Component } from "react";
import Axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ApiActions from "services/shared/api/ApiActions";

export default class Housetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      page: 0,
      totalsize: 0,
      sizePerPage: 10,
    };
  }
  columns = [
    {
      dataField: "hash",
      hidden: true,
    },
    {
      dataField: "street",
      text: "street",
      sort: true,
    },
    {
      dataField: "number",
      text: "number",
      sort: true,
    },
    {
      dataField: "postcode",
      text: "postcode",
      sort: true,
    },
    {
      dataField: "region",
      text: "region",
      sort: true,
    },
    {
      dataField: "coordinates",
      text: "coordinates",
      sort: true,
    },
  ];
  // componentDidUpdate(PrevProps) {
  //   const newprops = this.props;
  //   if (PrevProps.totalsize !== newprops.totalsize) {
  //     this.fetchData();
  //   }
  // }

  componentDidMount() {
    this.fetchData();
  }
  async fetchData(
    page = this.state.page,
    sizePerPage = this.state.sizePerPage
  ) {
    await Axios.get(ApiActions.StreetInfo, {
      params: {
        streetname: "Josephine Bakerstraat",
        page: page,
      },
    }).then((result) => {
      this.setState({
        items: result.data.houses,
        totalsize: result.data.totalStreet,
      });
    });
  }
  render() {
    console.log(this.state.totalsize);
    return (
      <div>
        {this.state.items.length > 0 ? (
          <BootstrapTable
            keyField='hash'
            data={this.state.items}
            columns={this.columns}
            striped
            hover
            condensed
            pagination={paginationFactory({
              totalSize: this.state.totalsize,
            })}
          />
        ) : null}
      </div>
    );
  }
}
