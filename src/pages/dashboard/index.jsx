import ChartCard from "components/shared/cards/chart";
import React from "react";
import data from "../../data/chart.json";
import Header from "components/shared/header";
import FilterHeader from "components/shared/filter-header";
import { Responsive, WidthProvider } from "react-grid-layout";
import { withTranslation } from "react-i18next";
import DefaultCard from "components/shared/cards/default";
import "./index.css";
import Footer from "components/shared/footer";
import Axios from "axios";
import { Card, CardColumns, Table } from "react-bootstrap";
import ApiActions from "services/shared/api/ApiActions";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";
import ForecastTable from "components/shared/forecast-table";
import SockJsClient from "react-stomp";
import paginationFactory from "react-bootstrap-table2-paginator";

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
      production: [],
    };
  }

  onConnected = () => {};

  onMessageReceive = (message) => {
    console.log(message);
    if (!!message) {
      this.setState({ production: message });
    }
  };

  componentDidMount() {
    this.setState({ charts: data.charts });
    this.getLatestScenarios();
    this.findTodaysScenarios();
    window.addEventListener("refresh-create-scenario", () => {
      this.setState({ kilowatt: 0.0 });
      this.getLatestScenarios();
      this.findTodaysScenarios();
    });

    //Fetch Data from solar/simulation/overview
    //Received overview of production of solarpark
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
    let { charts, data, solar, wind, kilowatt, production } = this.state;
    const { t } = this.props;
    let layout;
    let pagination = 0;

    if (!!production && production.length > 0) {
      pagination = paginationFactory({
        page: Math.ceil(production.length / 10),
      });
    }

    var mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) {
      layout = [
        { x: 0, y: 0, w: 8, h: 1 },
        { x: 0, y: 1, w: 8, h: 1 },
        { x: 0, y: 2, w: 8, h: 1 },
        { x: 0, y: 3, w: 8, h: 1 },
        { x: 0, y: 4, w: 8, h: 1 },
        { x: 0, y: 5, w: 8, h: 1 },
        { x: 0, y: 6, w: 8, h: 1 },
        { x: 0, y: 7, w: 8, h: 1 },
      ];
    } else {
      layout = [
        { x: 0, y: 1, w: 1, h: 1 },
        { x: 0, y: 2, w: 1, h: 1 },
        { x: 0, y: 3, w: 1, h: 1 },
        { x: 0, y: 4, w: 1, h: 1 },
        { x: 4, y: 0, w: 1, h: 1 },
        { x: 0, y: 0, w: 3, h: 0.5 },
        { x: 1, y: 1, w: 2, h: 1 },
        { x: 1, y: 2, w: 2, h: 1.25 },
        { x: 1, y: 5, w: 2, h: 1.75 },
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
          rowHeight={450}
          width={1200}
        >
          <div className="dashboard-forecast" key={6} data-grid={layout[6]}>
            <ForecastTable />
          </div>

          {charts.map((chart, index) => (
            <div key={chart.id} data-grid={layout[index]}>
              <ChartCard chart={chart} key={chart.data.key} />
            </div>
          ))}

          <div className="dashboard-cards" key={5} data-grid={layout[5]}>
            <Card style={{ width: "18rem", borderRadius: "25px" }}>
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
            <Card style={{ width: "18rem", borderRadius: "25px" }}>
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
            <Card style={{ width: "18rem", borderRadius: "25px" }}>
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
            <Card style={{ width: "18rem", borderRadius: "25px" }}>
              <Card.Body>
                <Card.Text style={{ textAlign: "left" }}>
                  Balans in energie
                </Card.Text>
                <Card.Title style={{ fontSize: "30px", textAlign: "right" }}>
                  100%
                </Card.Title>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem", borderRadius: "25px" }}>
              <Card.Body>
                <Card.Text style={{ textAlign: "left" }}>
                  Kosten energie per KwH
                </Card.Text>
                <Card.Title style={{ fontSize: "30px", textAlign: "right" }}>
                  €0,22
                </Card.Title>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem", borderRadius: "25px" }}>
              <Card.Body>
                <Card.Text style={{ textAlign: "left" }}>
                  SOME DETAILS
                </Card.Text>
                <Card.Title style={{ fontSize: "30px", textAlign: "right" }}>
                  DESCRIPTION
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div key={7} data-grid={layout[7]}>
            <Table
              striped
              bordered
              hover
              responsive="sm"
              pagination={pagination}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Beschrijving</th>
                  <th>Aantal zonnepanelen</th>
                  <th>Productie vandaag</th>
                  <th>Productie jaarlijks</th>
                </tr>
              </thead>
              <tbody>
                {!!production &&
                  production.length > 0 &&
                  production.map((object, index) => (
                    <tr key={index}>
                      <td>{object.solarPark.solarParkId}</td>
                      <td>{object.solarPark.description}</td>
                      <td>{object.solarPark.amountOfUnits * 20}</td>
                      <td>{object.todayProduction}</td>
                      <td>{object.yearProduction}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <div className="scenario-container" key={8} data-grid={layout[8]}>
            <CardColumns
              style={{
                display: "flex",
                flexDirection: "row",
                flexFlow: "column wrap",
              }}
            >
              {!!data &&
                data.length > 0 &&
                data.map(
                  (scenario, index) =>
                    index === 0 && (
                      <DefaultCard scenario={scenario} id={index} key={index} />
                    )
                )}
            </CardColumns>
          </div>
        </ResponsiveReactGridLayout>
        <Footer />
        <SockJsClient
          url={process.env.REACT_APP_SOCKET_API}
          topics={["/topic-overview"]}
          onConnect={this.onConnected}
          onMessage={(msg) => this.onMessageReceive(msg)}
          debug={false}
        />
      </div>
    );
  }
}

export default withTranslation("scenario")(Dashboard);
