import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import ApiActions from "services/shared/api/ApiActions";
import { Post } from "services/shared/api/Api";
import { setAuthorizationCookie } from "services/shared/cookie";
import { getFormData } from "services/shared/form-data-helper";
import "./index.css";

export default class LoginForm extends Component {
  async login(e) {
    e.preventDefault();
    const formDataObj = getFormData(e);

    const result = await Post(ApiActions.Login, formDataObj);
    if (result.status === 200) {
      const data = await result.text();
      setAuthorizationCookie(data);
    } else console.log("Geen succes");
  }

  render() {
    return (
      // <Form>
      //     <Form.Group>
      //         <Form.Label>Email address</Form.Label>
      //         <Form.Control type="email" placeholder="Enter Email" name="email"/>
      //         <Form.Text className="text-muted">Your email will remain private to everyone in our database.</Form.Text>
      //     </Form.Group>
      //     <Form.Group>
      //         <Form.Label>Password</Form.Label>
      //         <Form.Control type="password" placeholder="Password" name="password"/>
      //     </Form.Group>
      //     <Button variant="primary" type="submit">Submit</Button>
      // </Form>

      <div id="login">
        <h1>Login</h1>
        <Form>
          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder="E-mail"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            block
            type="submit"
            style={{
              backgroundColor: "#82de94",
              borderColor: "#82de94",
              color: "black",
            }}
          >
            Log in
          </Button>
        </Form>
      </div>
    );
  }
}
