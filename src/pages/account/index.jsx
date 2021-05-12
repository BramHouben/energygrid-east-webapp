import Header from "components/shared/header";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { getClaim } from "services/jwt";
import { getFormDataInJson } from "services/shared/form-data-helper";
import paths from "services/shared/router-paths";
import { DeleteUser, EditUser, FindUser } from "services/shared/user";
import "./index.css";
import Cookies from "universal-cookie";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    const userUuid = getClaim("uuid");
    const result = await FindUser(userUuid);
    if (result.status === 200) {
      const user = await result.json();
      this.setState({ user });
    }
  };

  onSubmit = async (e) => {
    const { i18n, t } = this.props;
    e.preventDefault();
    const formData = getFormDataInJson(e);

    const result = await EditUser(formData);
    if (result.status === 200) {
      this.fetchUserData();
      i18n.changeLanguage(formData.language);
      localStorage.setItem("language", formData.language);
      toast.success(t("success"));
    }
  };

  removeAccount = async () => {
    const result = await DeleteUser();
    if (result.status === 200) {
      this.logout();
      window.location = paths.Login;
    }
  };

  onRemoveClick = () => {
    const { t } = this.props;
    const removeAccount = window.confirm(t("remove-account-confirm-message"));

    if (removeAccount) {
      this.removeAccount();
    }
  };

  logout = () => {
    const cookie = new Cookies();
    cookie.remove("jwt", { path: "/" });
    window.location.pathname = "/login";
  };

  render() {
    const { t } = this.props;
    const availableLanguages = ["en", "nl"];

    return (
      <div>
        <Header pageName={t("pageName")} />
        <div className="content">
          <Form onSubmit={(e) => this.onSubmit(e)} id="account-form">
            <Form.Group>
              <Form.Label>{t("username-label")}</Form.Label>
              <Form.Control
                placeholder={t("username-placeholder")}
                name="username"
                defaultValue={this.state.user?.username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("email-label")}</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder={t("email-placeholder")}
                defaultValue={this.state.user?.email}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("password-label")}</Form.Label>
              <Form.Control
                placeholder={t("password-placeholder")}
                name="newPassword"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("translation-label")}</Form.Label>
              <Form.Control name="language" as="select">
                {availableLanguages.map((lang) => (
                  <option
                    selected={localStorage.getItem("language") === lang}
                    key={lang}
                    value={lang}
                  >
                    {lang}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit">{t("submit-btn")}</Button>
          </Form>
          <div id="btn-remove-account-wrapper">
            <Button variant="danger" onClick={() => this.onRemoveClick()}>
              {t("remove-account")}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("account")(Account);
