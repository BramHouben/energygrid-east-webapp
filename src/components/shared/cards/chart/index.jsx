import React from 'react'
import { Card } from 'react-bootstrap';
import ChartLine from 'components/shared/charts/line';
import ChartBar from 'components/shared/charts/bar';
import ChartPie from 'components/shared/charts/pie';
import ChartDoughnut from 'components/shared/charts/doughnut';
import './index.css'

export default class ChartCard extends React.Component {
    constructor(props) {
        super(props);
    }

    getChartType(chart) {
        console.log(chart);
        switch (chart.type) {
            case "pie":
                return <ChartPie data={chart.data} />
            case "doughnut":
                return <ChartDoughnut data={chart.data} />
            case "line":
                return <ChartLine data={chart.data} />
            case "bar":
                return <ChartBar data={chart.data} endpoint={chart.endpoint} />
        }
    }

    render() {
        let { chart } = this.props;

        return (
            <div id="card-wrapper">
                <Card border="dark" style={{ width: '24rem' }}>
                    <Card.Header as="h5" style={{ textAlign: 'center' }}>Consumptie</Card.Header>
                    <Card.Body>
                        {this.getChartType(chart)}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}