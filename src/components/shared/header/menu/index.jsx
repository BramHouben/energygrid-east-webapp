import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import routerPaths from "services/shared/router-paths";
import Cookies from "universal-cookie";
import "./index.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuLinks: {},
    };
  }

  openNav = () => {
    const menu = document.getElementById("menu");
    menu.style.width = "125px";
  };

  closeNav = () => {
    const menu = document.getElementById("menu");
    menu.style.width = "0";
  };

  logout = () => {
    const cookie = new Cookies();
    cookie.remove("jwt", { path: "/" });
    window.location.pathname = "/login";
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <Button
          id="open-menu-button"
          className="link-btn corporate-identity-font"
          type="button"
          onClick={() => this.openNav()}
        >
          &#9776;
        </Button>

        <div id="menu">
          <button
            className="closebtn link-btn"
            type="button"
            onClick={() => this.closeNav()}
          >
            &times;
          </button>
          <div id="menu-links">
            <a key="dashboard" href="/">
              {t("dashboard")}
            </a>
            <a key="regiondetails" href={routerPaths.Region}>
              {t("regiondetails")}
            </a>
            <a key="scenario" href={routerPaths.Scenario}>
              {t("scenario")}
            </a>
            <a key="map" href={routerPaths.Map}>
              {t("map")}
            </a>
            <a key="forecast" href={routerPaths.Forecast}>
              {t("forecast")}
            </a>
            <a key="scenario" href={routerPaths.Scenario}>
              {t("scenario")}
            </a>
            <a key="energy-market" href={routerPaths.EnergyMarket}>
              {t("energy-market")}
            </a>
            <a key="account" href={routerPaths.Account}>
              {t("account")}
            </a>
            <a key="user-management" href={routerPaths.UserManagement}>
              User Management
            </a>
            <button
              onClick={() => this.logout()}
              type="button"
              className="link-btn"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("menu")(Menu);
