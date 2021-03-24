import React from "react";
import "./index.css";
import Button from "react-bootstrap/Button";
import Header from "components/shared/header";
import ChartCard from "components/shared/cards/chart";
import data from "./simulation.json";
import axios from "axios";
import FilterHeader from "components/shared/filter-header";

export default class Simulation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      simulationId: "simulation id",
      chart: data,
    };

    this.startSimulation = this.startSimulation.bind(this);
  }

  startSimulation() {
    alert("Simulation started");
  }

  fetchLastSimulation() {
    const postData = [
      {
        solarParkName: "Harculo2",
        totalCountSolarPanels: 1000,
        placeSolarPark: {
          x: "52.46974613309643",
          y: "6.1132777251542105",
        },
      },
    ];

    axios
      .post("http://localhost:8081/simulation/getLatestSimulation", postData)
      .then((result) => {
        const chartData = result.data.kwh;
        let chartLabels = [];
        let chartKw = [];
        console.log(result);
        for (let i = 0; i < chartData.length; i++) {
          chartLabels.push(chartData[i].time);
          chartKw.push(chartData[i].kilowatt);
        }
        data.data.labels = chartLabels;
        data.data.datasets[0].data = chartKw;
        this.setState({ chart: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchLastSimulation();
  }

  render() {
    let chart = this.state.chart;
    console.log(chart.id);

    return (
      <div id="simulationWrapper">
        <div className="header-wrapper">
          <Header pageName="Details" />
          <FilterHeader />
        </div>
        <div className="content">
          <div id="flexColumn">
            <div id="simulationHeader">
              <div className="flexRow">
                <div id="startSimulationWrapp">
                  <Button type="success" onClick={this.startSimulation}>
                    Start simulation
                  </Button>
                </div>
                <div id="elapsedTimeWrapper">
                  <label>Elapsed Time: </label>
                </div>
                <div id="simulationInfoWrapper">
                  <div id="simulationId">
                    <label>{this.state.simulationId}</label>
                  </div>
                </div>
              </div>
            </div>
            <div id="simulationBoard">
              <div id="boardHeader">
                <h3>Simulatie</h3>
              </div>
              <div id="chartRow">
                {/* <ChartCard chart={chart} key={chart.data.key} /> */}
                <ChartCard chart={chart} key={chart.data.key} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
