import React, { Component } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { getJwt } from "services/shared/cookie";
import Axios from "axios";
import "./index.css";

export default class TweetModal extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      isLoading: true,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  async addOperator(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    const config = {
      headers: { Authorization: `Bearer ${getJwt()}` },
    };

    Axios.post(
      `http://localhost:8081/user/operator`,
      formDataObj,
      config
    ).catch(() => {
      console.log("Werkt niet");
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div className="loading" />;
    }

    return (
      <div>
        <Button
          className="tweet-button"
          onClick={this.handleShow}
          style={{
            backgroundColor: "#82de94",
            borderColor: "#82de94",
            color: "black",
            marginLeft: "15px",
          }}
        >
          Add new Grid Operator
        </Button>
        <Modal
          className="tweet-modal"
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header>
            <Modal.Title>Add Grid Operator</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.addOperator}>
            <Modal.Body>
              <Form.Control
                name="username"
                type="text"
                placeholder="Username"
              />
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                style={{
                  marginTop: "10px",
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#82de94",
                  borderColor: "#82de94",
                  color: "black",
                }}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}
