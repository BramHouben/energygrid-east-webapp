import React from 'react'
import './index.css'
import ChartCard from "components/shared/cards/chart"
import Header from "components/shared/header";
import data from "../../data/production.json";

export default class Production extends React.Component {
    constructor() {
        super()
        this.state = {
            charts: []
        };
    }

    componentDidMount() {
        this.setState({ charts: data.charts });
    }

    render() {
        let { charts } = this.state;

        return (
            <div id="productionWrapper">
                <div className="header-wrapper">
                    <Header pageName="Dashboard" />
                </div>
                <div id="chartsWrapper">
                    <div id="productionInfo">
                        <div id="today">
                            <div className="infoBox">
                                <label className="lblHeader">45 kWh</label>
                                <label className="lblInfo">Consumption today</label>
                            </div>
                        </div>
                        <div id="yesterday">
                            <div className="infoBox">
                                <label className="lblHeader">65 kWh</label>
                                <label className="lblInfo">Consumption today</label>
                            </div>
                        </div>
                    </div>
                    {charts.map((c) => {
                        return (
                            <div key={c.id} className="chartBox">
                                <ChartCard chart={c} key={c.data.key}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}