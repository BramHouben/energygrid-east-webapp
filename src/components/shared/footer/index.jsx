import Axios from "axios";
import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "components/shared/footer/index.css";
import ApiActions from "services/shared/api/ApiActions";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestConsume: 0,
      latestProduce: 0,
      latestTime: null,
      latestProcent: 0,
    };
  }

  async fetchData() {
    await Axios.get(ApiActions.latestbalance)
      .then((result) => {
        console.log(result.data);
        this.setState({
          latestConsume: result.data.consume,
          latestTime: result.data.time,
          latestProcent: result.data.balance,
          latestProduce: result.data.production,
        });
      })
      .catch((result) => {
        console.log("error loading results");
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let latestprocentbalance = this.state.latestProcent;
    return (
      <div>
        {latestprocentbalance === 100 ? (
          <div id="footersuccess">
            <div id="progressbarsuccess">
              <h1>Balance is: {latestprocentbalance}</h1>
              <ProgressBar
                variant="success"
                animated
                now={latestprocentbalance}
                label={`${latestprocentbalance}% completed`}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {latestprocentbalance !== 100 ? (
          <div id="footererror">
            <div id="progressbarerror">
              <h1>Balance is: {latestprocentbalance}</h1>

              <ProgressBar
                variant="danger"
                animated
                now={latestprocentbalance}
                label={`${latestprocentbalance}% completed`}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
