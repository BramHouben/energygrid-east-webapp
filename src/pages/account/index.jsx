import Header from "components/shared/header";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { getFormData } from "services/shared/form-data-helper";
import "./index.css";

class Account extends Component {
  onSubmit = (e) => {
    const { i18n } = this.props;
    e.preventDefault();
    const formData = getFormData(e);
    i18n.changeLanguage(formData.language);
  };

  render() {
    const { t } = this.props;
    const availableLanguages = ["nl", "en"];

    return (
      <div>
        <Header pageName={t("pageName")} />
        <div className="content">
          <Form onSubmit={this.onSubmit} id="account-form">
            <Form.Group>
              <Form.Label>{t("translation-label")}</Form.Label>
              <Form.Control name="language" as="select">
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit">{t("submit-btn")}</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withTranslation("account")(Account);
