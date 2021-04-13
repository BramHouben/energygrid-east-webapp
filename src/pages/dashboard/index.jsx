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
      { x: 0, y: 0, w: 1, h: 1 },
      { x: 1, y: 0, w: 1, h: 1 },
      { x: 2, y: 0, w: 1, h: 1 },
      { x: 1, y: 0, w: 1, h: 1 },
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
          {charts.map((chart, index) => (
            <div key={chart.id} data-grid={layout[index]}>
              <ChartCard chart={chart} key={chart.data.key} />
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
