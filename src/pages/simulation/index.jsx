import React from 'react'
import './index.css'
import Button from 'react-bootstrap/Button';
import Header from 'components/shared/header';

export default class Simulation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            simulationId: "simulation id",
        }

        this.startSimulation = this.startSimulation.bind(this);
    }

    startSimulation() {
        alert("Simulation started")
    }

    render() {
        return (
            <div id="simulationWrapper">
                <Header />
                <div className="content">
                    <div id="flexColumn">
                        <div id="simulationHeader">
                            <div className="flexRow">
                                <div id="startSimulationWrapp">
                                    <Button type="success" onClick={this.startSimulation}>Start simulation</Button>
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
                                <div class="chartWrapper">

                                </div>
                                <div class="chartWrapper">

                                </div>
                                <div class="chartWrapper">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}