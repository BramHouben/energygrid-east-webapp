import React, { Component } from "react";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";

export default class EnergyMarketCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      energyMarketInfo: this.props,
    };
  }
  render() {
    return (
      <div>
        <h1>Markt geschiedenis</h1>
        <CardColumns>
          <Card>
            <Card.Body>
              <Card.Title>Inkoop</Card.Title>
              <Card.Text>Aantal: 7000kwh </Card.Text>
              <Card.Text> 1000 euro</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className='text-muted'>Last updated 1 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Verkoop</Card.Title>
              <Card.Text>Aantal: 3000kwh </Card.Text>
              <Card.Text> 2000 euro</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Verkoop</Card.Title>
              <Card.Text>Aantal: 5000kwh </Card.Text>
              <Card.Text> 750 euro</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className='text-muted'> 13 mins ago</small>
            </Card.Footer>
          </Card>
        </CardColumns>
      </div>
    );
  }
}
