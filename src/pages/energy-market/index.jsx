import Header from "components/shared/header";
import React, { Component } from "react";

import { withTranslation } from "react-i18next";

import Axios from "axios";
import ApiActions from "services/shared/api/ApiActions";
import "./index.css";
import EnergyMarketCard from "components/shared/cards/energymarketcard";
class EnergyMarket extends Component {
  constructor() {
    super();
    this.state = {
      energyMarketInfo: [
        {
          id: "ioejoipsefjkife",
          type: "buy",
          amount: "2000kwh",
        },
        {
          id: "ioejoipsseesefjkife",
          type: "sell",
          amount: "3000kwh",
        },
      ],
    };
  }

  // async getLatestInfo() {
  //   await Axios.get(ApiActions.getLatestMarktInfo)
  //     .then((result) => {
  //       this.setState({
  //         energyMarketInfo: result.data,
  //       });
  //     })
  //     .catch((result) => {
  //       console.log("error loading results");
  //     });
  // }

  // componentDidMount() {
  //   this.getLatestInfo();
  // }

  render() {
    const { t } = this.props;
    const energyMarketInfo = this.state.energyMarketInfo;

    return (
      <div>
        <Header pageName={t("pageName")} />
        <div className='content'>
          {energyMarketInfo !== null ? (
            <EnergyMarketCard energyMarketInfo={energyMarketInfo} />
          ) : (
            <div>No data can be displayed</div>
          )}
        </div>
      </div>
    );
  }
}

export default withTranslation("energyMarket")(EnergyMarket);
