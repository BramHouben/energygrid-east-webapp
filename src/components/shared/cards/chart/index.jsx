import React from "react";
import { Card } from "react-bootstrap";
import ChartLine from "components/shared/charts/line";
import ChartBar from "components/shared/charts/bar";
import ChartPie from "components/shared/charts/pie";
import ChartDoughnut from "components/shared/charts/doughnut";
import HeatMap from "components/shared/charts/heatmap";
import { withTranslation } from "react-i18next";
import "./index.css";

class ChartCard extends React.Component {
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
      case "heatmap":
        console.log(chart);
        return <HeatMap chart={chart} />;
    }
  }

  render() {
    let { chart } = this.props;
    const { t } = this.props;

    return (
      <div id="card-wrapper">
        <Card
          border="dark"
          style={{
            width: "100%",
          }}
        >
          <Card.Header as="h5" style={{ textAlign: "center" }}>
            {t(chart.data.key)}
          </Card.Header>
          <Card.Body>{this.getChartType(chart)}</Card.Body>
          <Card.Footer className="text-right">
            {chart.data.total &&
              chart.data.total.length > 0 &&
              chart.data.total.map((total) => {
                console.log(total);
                return <div>Totaal: {total}</div>;
              })}
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default withTranslation("chart")(ChartCard);
