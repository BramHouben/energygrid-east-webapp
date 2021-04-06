import ChartCard from "components/shared/cards/chart";
import React from "react";
import data from "../../data/chart.json";
import Header from "components/shared/header";
import FilterHeader from "components/shared/filter-header";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./index.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      charts: [],
    };
  }

  componentDidMount() {
    this.setState({ charts: data.charts });
  }

  render() {
    let { charts } = this.state;

    const layout = [
      { i: "1", x: 0, y: 0, w: 4, h: 3 },
      { i: "2", x: 2, y: 0, w: 4, h: 3 },
      { i: "3", x: 0, y: 5, w: 4, h: 3 },
      { i: "4", x: 2, y: 5, w: 4, h: 3 },
      { i: "5", x: 0, y: 10, w: 4, h: 3 },
    ];

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
          {charts.map((chart) => (
            <div key={chart.id}>
              <ChartCard chart={chart} key={chart.data.key} />
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
