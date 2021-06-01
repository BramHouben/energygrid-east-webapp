import React from "react";
import Header from "components/shared/header";
import FilterHeader from "components/shared/filter-header";
import { withTranslation } from "react-i18next";
import DefaultCard from "components/shared/cards/default";
import "./index.css";
import Modal from "components/shared/modal/scenario";
import Footer from "components/shared/footer";
import Axios from "axios";
import { Card, Button, CardColumns } from "react-bootstrap";
import ApiActions from "services/shared/api/ApiActions";

class ScenarioPage extends React.Component {
  constructor() {
    super();
    this.state = {
      solar: [],
      wind: [],
    };
  }

  componentDidMount() {
    this.initScenarios();
    window.addEventListener("refresh-create-scenario", () => {
      this.initScenarios();
    });
  }

  initScenarios() {
    this.getLatestSolarScenarios();
    this.getLatestWindScenarios();
  }

  async getLatestSolarScenarios() {
    await Axios.get(ApiActions.ScenariosSolar)
      .then((response) => {
        this.setState({
          solar: response.data,
        });
      })
      .catch(() => {
        console.log("Werkt niet");
      });
  }

  async getLatestWindScenarios() {
    await Axios.get(ApiActions.ScenariosWind)
      .then((response) => {
        this.setState({
          wind: response.data,
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
    let { solar, wind } = this.state;
    const { t } = this.props;

    return (
      <div>
        <div className="header-wrapper">
          <Header pageName="Dashboard" />
          <FilterHeader />
        </div>
        <div className="scenario-container">
          <h2>Scenario's</h2>
          <CardColumns
            style={{
              display: "flex",
              flexDirection: "row",
              flexFlow: "column wrap",
            }}
          >
            {!!solar &&
              solar.length > 0 &&
              solar.map((scenario, index) => (
                <DefaultCard scenario={scenario} id={index} key={index} />
              ))}

            {!!wind &&
              wind.length > 0 &&
              wind.map((scenario, index) => (
                <DefaultCard scenario={scenario} id={index} key={index} />
              ))}
            <div>
              <Card
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  flex: 1,
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
        </div>
        <Modal /> <Footer />
      </div>
    );
  }
}

export default withTranslation("scenario")(ScenarioPage);
