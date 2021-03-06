import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { getFormDataInJson } from "services/shared/form-data-helper";
import { FindUser, LoginUser } from "services/shared/user";
import "./index.css";
import { toast } from "react-toastify";
import { setAuthorizationCookie } from "services/shared/cookie";
import paths from "services/shared/router-paths";
import { withTranslation } from "react-i18next";
import { getClaim } from "services/jwt";
import jwtClaims from "services/shared/jwt-claims";
import routerPaths from "services/shared/router-paths";

class Login extends Component {
  onSubmit = async (e) => {
    e.preventDefault();
    const formData = getFormDataInJson(e);
    const loginResult = await LoginUser(formData);

    const { t } = this.props;

    if (loginResult.status === 200) {
      const accountRole = getClaim(jwtClaims.accountRole);
      if (
        window.matchMedia("(display-mode: standalone)").matches &&
        accountRole !== "CUSTOMER"
      ) {
        toast.error(t("You are not allowed to use this app"));
        return;
      }

      setAuthorizationCookie(await loginResult.text());
      const userUuid = getClaim("uuid");
      const findUserResult = await FindUser(userUuid);
      if (findUserResult.status === 200) {
        const user = await findUserResult.json();
        const { i18n } = this.props;
        i18n.changeLanguage(user.language);
      }

      if (
        window.matchMedia("(display-mode: standalone)").matches &&
        accountRole !== "CUSTOMER"
      ) {
        window.location.replace(paths.Pwa);
        return;
      }

      window.location.pathname = paths.Dashboard;
    } else {
      toast.error(t("login-failed"));
    }
  };

  render() {
    const { t } = this.props;

    return (
      <div id='login'>
        <h1>{t("title")}</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>{t("email")}</Form.Label>
            <Form.Control
              required
              type='email'
              name='email'
              placeholder={t("email-placeholder")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("password")}</Form.Label>
            <Form.Control
              required
              name='password'
              type='password'
              placeholder={t("password-placeholder")}
            />
          </Form.Group>
          <Button
            block
            type='submit'
            style={{
              backgroundColor: "#82de94",
              borderColor: "#82de94",
              color: "black",
            }}
          >
            {t("submit-btn")}
          </Button>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <a key='register' href={routerPaths.Registration}>
              {t("no_account_yet")}
            </a>
          </div>
        </Form>
      </div>
    );
  }
}

export default withTranslation("login")(Login);
