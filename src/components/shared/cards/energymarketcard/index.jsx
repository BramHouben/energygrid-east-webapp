import React, { Component } from "react";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";
export default class EnergyMarketCard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   energyMarketInfo: this.props,
    // };
  }
  render() {
    const { energyMarketInfo } = this.props;

    return (
      <div>
        {energyMarketInfo !== null && energyMarketInfo.length > 0 ? (
          <CardColumns>
            <h1>Markt geschiedenis</h1>
            {energyMarketInfo.map((energy) => (
              <Card key={energy.id}>
                <Card.Body>
                  <Card.Title>
                    {energy.type}{" "}
                    {energy.type === "buy" ? (
                      <HiArrowUp size={30} style={{ color: "green" }} />
                    ) : (
                      <HiArrowDown size={30} style={{ color: "red" }} />
                    )}
                  </Card.Title>
                  <Card.Text>{energy.amountTotal} </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 1 mins ago</small>
                </Card.Footer>
              </Card>
            ))}
          </CardColumns>
        ) : (
          <div>no data</div>
        )}
      </div>
    );
  }
}
