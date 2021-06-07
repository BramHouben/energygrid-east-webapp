import "./index.css";
import { withTranslation } from "react-i18next";
import Axios from "axios";
import ApiActions from "services/shared/api/ApiActions";
import React, { Component } from "react";
import DataGrid from "react-data-grid";

class HouseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streetname: this.props.streetname,
      items: [],
      currentcity: this.props.currentcity,
      updatelist: this.props.updatelist,
    };
  }

  componentDidUpdate(prevprops) {
    if (prevprops.streetname !== this.props.streetname) {
      this.fetchData();
    }
  }

  async fetchData() {
    console.log(this.state.streetname);
    await Axios.get(ApiActions.StreetInfo, {
      params: {
        streetname: this.props.streetname,
        city: this.props.currentcity,
      },
    })
      .then((result) => {
        this.state.updatelist(result.data.houses);

        this.setState({
          items: result.data.houses,
          totalsize: result.data.totalStreet,
        });
      })
      .catch((result) => {
        console.log("error loading results");
      });
  }

  componentDidMount() {
    this.fetchData(this.state.page);
  }
  render() {
    const columns = [
      { key: "hash", name: "Hash" },
      { key: "street", name: "Street" },
      { key: "number", name: "Number" },
      { key: "region", name: "Region" },
      { key: "postcode", name: "Postcode" },
      { key: "coordinates", name: "Coordinates" },
    ];

    const { items } = this.state;

    return (
      <div>
        <DataGrid columns={columns} rows={items} />;
      </div>
    );
  }
}
export default withTranslation("regionfilter")(HouseTable);
