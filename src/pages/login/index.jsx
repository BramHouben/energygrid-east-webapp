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

class Login extends Component {
  onSubmit = async (e) => {
    e.preventDefault();
    const formData = getFormDataInJson(e);
    const loginResult = await LoginUser(formData);

    const { t } = this.props;

    if (loginResult.status === 200) {
      setAuthorizationCookie(await loginResult.text());
      const userUuid = getClaim("uuid");
      const findUserResult = await FindUser(userUuid);
      if (findUserResult.status === 200) {
        const user = await findUserResult.json();
        const { i18n } = this.props;
        i18n.changeLanguage(user.language);
      }

      window.location.replace(paths.Root);
    } else {
      toast.error(t("login-failed"));
    }
  };

  render() {
    const { t } = this.props;

    return (
      <div id="login">
        <h1>{t("title")}</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>{t("email")}</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder={t("email-placeholder")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("password")}</Form.Label>
            <Form.Control
              required
              name="password"
              type="password"
              placeholder={t("password-placeholder")}
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
            {t("submit-btn")}
          </Button>
        </Form>
      </div>
    );
  }
}

export default withTranslation("login")(Login);
