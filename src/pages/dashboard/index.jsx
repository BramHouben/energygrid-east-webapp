import ChartCard from "components/shared/cards/chart";
import React from "react";
import data from "../../data/chart.json";
import Header from "components/shared/header";
import FilterHeader from "components/shared/filter-header";
import { Responsive, WidthProvider } from "react-grid-layout";
import { withTranslation } from "react-i18next";
import DefaultCard from "components/shared/cards/default";
import "./index.css";
import Modal from "components/shared/modal";
import Footer from "components/shared/footer";
import Axios from "axios";
import { Card, Button, CardColumns } from "react-bootstrap";
import ApiActions from "services/shared/api/ApiActions";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      charts: [],
      data: [],
      solar: 0,
      wind: 0,
      kilowatt: 0.0,
    };
  }

  componentDidMount() {
    this.setState({ charts: data.charts });
    this.getLatestScenarios();
    this.findTodaysScenarios();
    window.addEventListener("refresh-create-scenario", () => {
      this.setState({ kilowatt: 0 });
      this.getLatestScenarios();
      this.findTodaysScenarios();
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

  async findTodaysScenarios() {
    await Axios.get(ApiActions.TodayScenarioWind).then((response) => {
      if (response.status === 200) {
        const kilowatt = this.state.kilowatt;
        this.setState({
          wind: response.data.count,
          kilowatt: kilowatt + response.data.kilowatt,
        });
      }
    });
    await Axios.get(ApiActions.TodayScenarioSolar).then((response) => {
      if (response.status === 200) {
        const kilowatt = this.state.kilowatt;
        this.setState({
          solar: response.data.count,
          kilowatt: kilowatt + response.data.kilowatt,
        });
      }
    });
  }

  render() {
    let { charts, data, solar, wind, kilowatt } = this.state;
    const { t } = this.props;
    let layout;

    var mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) {
      layout = [
        { x: 0, y: 0, w: 8, h: 1 },
        { x: 0, y: 1, w: 8, h: 1 },
        { x: 0, y: 2, w: 8, h: 1 },
        { x: 0, y: 3, w: 8, h: 1 },
      ];
    } else {
      layout = [
        { x: 0, y: 0, w: 1, h: 1 },
        { x: 1, y: 0, w: 1, h: 1 },
        { x: 2, y: 0, w: 1, h: 1 },
        { x: 1, y: 0, w: 1, h: 1 },
      ];
    }

    return (
      <div>
        <div className="header-wrapper">
          <Header pageName="Dashboard" />
          <FilterHeader />
        </div>
        <div className="scenario-cards">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text style={{ textAlign: "left" }}>
                {t("description_solar")}
              </Card.Text>
              <Card.Title
                style={{
                  fontSize: "30px",
                  textAlign: "right",
                }}
              >
                {solar ? solar : 0}
              </Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text style={{ textAlign: "left" }}>
                {t("description_wind")}
              </Card.Text>
              <Card.Title
                style={{
                  fontSize: "30px",
                  textAlign: "right",
                }}
              >
                {wind ? wind : 0}
              </Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text style={{ textAlign: "left" }}>
                {t("expected_production")}
              </Card.Text>
              <Card.Title style={{ fontSize: "30px", textAlign: "right" }}>
                {!!kilowatt && kilowatt >= 0 ? (
                  <HiArrowUp size={30} style={{ color: "green" }} />
                ) : (
                  <HiArrowDown size={30} style={{ color: "red" }} />
                )}
                {kilowatt.toFixed(2)}
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
        <ResponsiveReactGridLayout
          className="layout"
          layout={layout}
          cols={{ lg: 3, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={400}
          width={1200}
        >
          {charts.map((chart, index) => (
            <div key={chart.id} data-grid={layout[index]}>
              <ChartCard chart={chart} key={chart.data.key} />
            </div>
          ))}
        </ResponsiveReactGridLayout>
        <div className="scenario-container">
          <h2>Scenario's</h2>
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

export default withTranslation("scenario")(Dashboard);
