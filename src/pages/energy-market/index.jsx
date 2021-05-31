import Header from "components/shared/header";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { BuyOrSellEnergy } from "services/shared/energy-market";
import { getFormDataInJson } from "services/shared/form-data-helper";
import "./index.css";
import EnergyMarketCard from "components/shared/cards/energymarketcard";
class EnergyMarket extends Component {
  constructor() {
    super();
    this.state = {
      energyMarketInfo: {},
    };
  }

  onEnergyChange = (e) => {
    const price = Math.abs(e.target.value * 0.22);
    this.setState({ price });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const formData = getFormDataInJson(e);
    formData.region = "east";
    await BuyOrSellEnergy(formData);
  };

  render() {
    const { t } = this.props;
    const energyMarketInfo = this.state.energyMarketInfo;

    return (
      <div>
        <Header pageName={t("pageName")} />
        <div className='content'>
          <EnergyMarketCard energyMarketInfo={energyMarketInfo} />
          {/* <Form onSubmit={this.onSubmit} id="energy-market-form">
            <Form.Group>
              <Form.Label>{t("sell-buy-label")}</Form.Label>
              <Form.Control
                name="energyQuantity"
                onChange={this.onEnergyChange}
                defaultValue="0"
                required
                type="number"
              />
              <small>{t("sell-by-description")}</small>
            </Form.Group>
            <label>
              {t("price")} {price}
            </label>
            <br />
            <Button>{t("submit-btn")}</Button>
          </Form> */}
        </div>
      </div>
    );
  }
}

export default withTranslation("energyMarket")(EnergyMarket);
