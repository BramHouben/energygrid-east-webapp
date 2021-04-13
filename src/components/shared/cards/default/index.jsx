import React from "react";
import { Card, Button, CardDeck, CardColumns } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import ChartLine from "components/shared/charts/line";
import ChartConfig from "data/line-chart-config.json";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";
import "./index.css";

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

  getIconUpOrDown(result) {
    if (result < 0) {
      return (
        <div
          style={{
            display: "flex",
            margin: "0 auto",
            columnGap: "10px",
          }}
        >
          Verwachte misgelopen productie:
          <HiArrowDown size={30} style={{ color: "red" }} />
          {result} KwH
        </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          margin: "0 auto",
          columnGap: "10px",
        }}
      >
        {" "}
        Verwachte productie:
        <HiArrowUp size={30} style={{ color: "green" }} />
        {result} KwH
      </div>
    );
  }

  generateRandomColor() {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
    //random color will be freshly served
  }

  getChartData(scenario, index) {
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
          label: !!simulation.turbineId ? simulation.turbineId : "Undefined",
          fill: false,
          lineTension: 0.5,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 2,
          data: chartKw,
        };

        datasets = [...datasets, dataset];
      }

      console.log(chart);

      chart.data.labels = chartLabels;
      chart.options.title.text = "Aantal turbines: " + result.length;
      chart.options.scales.yAxes[0].scaleLabel.labelString =
        result.length > 1
          ? "Gemiddelde opwekking per turbine in KwH"
          : "Production in kWh";
      chart.data.key = simulation.turbineId ? simulation.turbineId : 0;
    }

    // for (var i = 0; i < result.length; i++) {
    //   console.log(i);
    //   const production =
    //     scenario.simulationExpectationResult.simulationResults[i]
    //       .productionExpectations;
    //   let chartKw = [];
    //   let chartLabels = [];

    //   for (var j = 0; j < production.length; j++) {
    //     chartLabels.push(production[j].localDateTime);
    //     chartKw.push(production[j].kw);
    //   }

    //   console.log(result[i].name);

    //   let dataset = {
    //     label: "Production turbineId: " + i,
    //     fill: false,
    //     lineTension: 0.5,
    //     backgroundColor: "#0A8D91",
    //     borderColor: "#0A8D91",
    //     borderWidth: 2,
    //     data: chartKw,
    //   };

    //   datasets = [...datasets, dataset];

    //   console.log(dataset);
    //   chart.data.labels = chartLabels;
    //   chart.options.title.text = "Aantal turbines: " + (i + 1);
    //   chart.options.scales.yAxes[0].scaleLabel.labelString =
    //     i > 1 ? "Gemiddelde opwekking per turbine in KwH" : "Production in kWh";
    //   chart.data.key = production[i].turbineId ? production[i].turbineId : i;
    //}
    console.log(datasets);
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
                {this.getIconUpOrDown(
                  scenario.simulationExpectationResult.kwTotalResult
                )}
              </Card.Text>
              {this.getChartData(scenario, id)}
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                <b>Aangemaakt op:</b> {this.getDateCreated(scenario.createdAt)}
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
