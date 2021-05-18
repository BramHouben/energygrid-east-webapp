import React, { Component } from "react";
import Axios from "axios";
import ApiActions from "services/shared/api/ApiActions";
import DefaultCard from "components/shared/cards/default";
import "./index.css";
import Modal from "components/shared/modal";
import { Card, CardColumns, Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import Header from "components/shared/header";

class Scenario extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getLatestScenarios();
    window.addEventListener("refresh-create-scenario", () => {
      this.getLatestScenarios();
    });
  }

  async getLatestScenarios() {
    await Axios.get(ApiActions.Scenarios)
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch(() => {
        console.log("Werkt niet");
      });
  }

  openModal() {
    window.dispatchEvent(
      new CustomEvent("open-modal", {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );
  }

  render() {
    let { data } = this.state;
    const { t } = this.props;

    return (
      <div>
        <div className="header-wrapper">
          <Header pageName="Scenarios" />
        </div>
        <div className="scenario-container">
          <CardColumns
            style={{
              display: "flex",
              flexDirection: "row",
              flexFlow: "column wrap",
            }}
          >
            {!!data &&
              data.length > 0 &&
              data.map((scenario, index) => (
                <DefaultCard scenario={scenario} id={index} key={index} />
              ))}
            <div>
              <Card
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  flex: 1,
                  borderRadius: "25px",
                }}
              >
                <Card.Body>
                  <Card.Text>
                    <Button variant="primary" onClick={this.openModal}>
                      {t("add_scenario")}
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </CardColumns>
          <Modal />
        </div>
      </div>
    );
  }
}

export default withTranslation("scenario")(Scenario);
