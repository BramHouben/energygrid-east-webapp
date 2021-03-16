import React from 'react'
import './index.css'
import Button from 'react-bootstrap/Button';
import Header from 'components/shared/header';

export default class Simulation extends React.Component {

    render() {
        return (
            <div id="simulationWrapper">
                <Header />
                <div id="simulationHeader" className="content">
                    <div>
                        <Button type="success">WQDEWDEW</Button>
                    </div>
                </div>
            </div>
        )
    }
}