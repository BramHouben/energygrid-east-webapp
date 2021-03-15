import LoginForm from "components/shared/forms/loginForm";
import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import "./index.css";

export default class Login extends Component {
    render() {
        return (
            <div>
                <div className="content">
                    <Container className="loginContainer">
                        <LoginForm></LoginForm>
                    </Container>
                </div>
            </div>
        )
    }
}