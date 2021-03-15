import React from "react";
import { Card } from "react-bootstrap";
import ChartLine from "components/shared/charts/line";
import ChartBar from "components/shared/charts/bar";
import ChartPie from "components/shared/charts/pie";
import ChartDoughnut from "components/shared/charts/doughnut";
import "./index.css";

export default class ChartCard extends React.Component {
  constructor(props) {
    super(props);
  }

  getChartType(chart) {
    switch (chart.type) {
      case "pie":
        return <ChartPie chart={chart} />;
      case "doughnut":
        return <ChartDoughnut chart={chart} />;
      case "line":
        return <ChartLine chart={chart} />;
      case "bar":
        return <ChartBar chart={chart} />;
    }
  }

  render() {
    let { chart } = this.props;

    return (
      <div id="card-wrapper">
        <Card
          border="dark"
          style={{
            width: "30rem;",
          }}
        >
          <Card.Header as="h5" style={{ textAlign: "center" }}>
            {chart.data.key}
          </Card.Header>
          <Card.Body>{this.getChartType(chart)}</Card.Body>
          <Card.Footer>
            {chart.data.total ? `Totaal: ${chart.data.total}` : ""}
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
