import Axios from "axios";
import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "components/shared/footer/index.css";
import ApiActions from "services/shared/api/ApiActions";
import SockJsClient from "react-stomp";

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

  onConnected = () => {};

  onMessageReceive = (message) => {
    console.log(message);
    if (!!message) {
      this.setState({
        latestConsume: message.consume,
        latestTime: message.time,
        latestProcent: message.balance,
        latestProduce: message.production,
      });
    }
  };

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
            <SockJsClient
              url={process.env.REACT_APP_SOCKET_API}
              topics={["/topic"]}
              onConnect={this.onConnected}
              onMessage={(msg) => this.onMessageReceive(msg)}
              debug={false}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
