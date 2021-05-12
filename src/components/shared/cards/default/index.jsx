import React from "react";
import { Card } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import ChartLine from "components/shared/charts/line";
import ChartConfig from "data/line-chart-config.json";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

class DefaultCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ChartConfig,
    };
  }

  getDateCreated(date) {
    let dateCreated = new Date(date);
    let month = dateCreated.getUTCMonth() + 1;
    let day = dateCreated.getUTCDate();
    let year = dateCreated.getUTCFullYear();
    let hours = dateCreated.getUTCHours();
    let minutes = dateCreated.getUTCMinutes();
    let seconds = dateCreated.getUTCSeconds();

    return (
      day +
      "-" +
      month +
      "-" +
      year +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  }

  getIconUpOrDown(result, translate) {
    if (result < 0) {
      return (
        <div
          style={{
            display: "flex",
            columnGap: "10px",
            textAlign: "left",
          }}
        >
          {translate("expected_missed_production")}
          <HiArrowDown size={30} style={{ color: "red" }} />
          {result.toFixed(0)} Kilowatt
        </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          columnGap: "10px",
          textAlign: "left",
        }}
      >
        {" "}
        {translate("expected_production")}
        <HiArrowUp size={30} style={{ color: "green" }} />
        {result.toFixed(0)} Kilowatt
      </div>
    );
  }

  generateRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  getChartData(scenario, index, translate) {
    const data = this.state.data;
    let chart = data.charts.find((c) => c.id === index + 1);
    let result = scenario.simulationExpectationResult.simulationResults;
    let datasets = [];

    for (const simulation of result) {
      let chartKw = [];
      let chartLabels = [];
      if (!!simulation && !!simulation.productionExpectations) {
        simulation.productionExpectations.map((production) => {
          chartKw = [...chartKw, production.kw];
          chartLabels = [...chartLabels, production.localDateTime];
        });

        const color = this.generateRandomColor();

        let dataset = {
          label: !!simulation.name
            ? translate(simulation.name)
            : "Turbine Id: " + simulation.turbineId,
          fill: false,
          lineTension: 0.5,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 2,
          data: chartKw,
        };

        datasets = [...datasets, dataset];
      }

      chart.data.labels = chartLabels;
      chart.options.title.text = scenario.description;
      chart.options.scales.yAxes[0].scaleLabel.labelString =
        result.length > 2
          ? translate("average_production_per_turbine")
          : translate("production_in_kwh");
      chart.data.key = simulation.turbineId ? simulation.turbineId : 0;
    }
    chart.data.key = scenario.scenarioId;
    chart.data.datasets = datasets;

    return <ChartLine chart={chart} key={scenario.scenarioId} />;
  }

  render() {
    const { t, scenario, id } = this.props;

    return (
      <div>
        {!!scenario ? (
          <Card
            style={{ width: "72rem", flex: 2, justifyContent: "space-between" }}
          >
            <Card.Body>
              <Card.Title style={{ textAlign: "left" }}>
                {t(scenario.name)}
              </Card.Title>
              <Card.Text>
                <div
                  style={{
                    display: "flex",
                    margin: "0 auto",
                    justifyContent: "space-between",
                  }}
                >
                  {this.getIconUpOrDown(
                    scenario.simulationExpectationResult.kwTotalResult,
                    t
                  )}
                  {!!scenario.coordinates && (
                    <div>
                      Lat: {scenario.coordinates.x}, Lon:
                      {scenario.coordinates.y}
                    </div>
                  )}
                </div>
              </Card.Text>
              {this.getChartData(scenario, id, t)}
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                <b>{t("created_at")}: </b>{" "}
                {this.getDateCreated(scenario.createdAt)}
              </small>
            </Card.Footer>
          </Card>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default withTranslation("scenario")(DefaultCard);
