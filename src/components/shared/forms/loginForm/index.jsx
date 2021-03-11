import React, { Component } from 'react';
import { Container, Form, Button } from "react-bootstrap"

export default class LoginForm extends Component {

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" name="email"/>
                    <Form.Text className="text-muted">Your email will remain private to everyone in our database.</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }
}