import Header from "components/shared/header";
import React, { Component } from "react";

import { withTranslation } from "react-i18next";

import Axios from "axios";
import ApiActions from "services/shared/api/ApiActions";
import "./index.css";
import EnergyMarketCard from "components/shared/cards/energymarketcard";
import { EnergyHistory } from "services/shared/energy-market";
class EnergyMarket extends Component {
  constructor() {
    super();
    this.state = {
      energyMarketInfo: [],
    };
  }

  componentDidMount = async () => {
    let result = await EnergyHistory();
    if (result.status === 200) {
      let energyMarketInfo = await result.json();
      energyMarketInfo.forEach(
        (d) => (d.type = d.amountTotal > 0 ? "buy" : "sell")
      );
      this.setState({ energyMarketInfo });
    }
  };

  render() {
    const { t } = this.props;
    const energyMarketInfo = this.state.energyMarketInfo;

    return (
      <div>
        <Header pageName={t("pageName")} />
        <div className="content">
          <EnergyMarketCard energyMarketInfo={energyMarketInfo} />
        </div>
      </div>
    );
  }
}

export default withTranslation("energyMarket")(EnergyMarket);
