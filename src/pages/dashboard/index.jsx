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
import Axios from "axios";
import { Card, Button, CardColumns } from "react-bootstrap";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      charts: [],
      data: [],
    };
  }

  componentDidMount() {
    this.setState({ charts: data.charts });
    this.getLatestScenarios();
    window.addEventListener("refresh-create-scenario", () => {
      this.getLatestScenarios();
    });
  }

  async getLatestScenarios() {
    await Axios.get(`http://localhost:8081/scenario/wind/latest`)
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
    let { charts, data } = this.state;
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
                  width: "72rem",
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
        <Modal />
      </div>
    );
  }
}

export default withTranslation("scenario")(Dashboard);
