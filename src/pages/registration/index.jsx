import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { Register } from "services/registration";
import { getFormData } from "services/shared/form-data-helper";
import "./index.css";

class Registration extends Component {
  onSubmit = async (e) => {
    const formData = getFormData(e);
    await Register(formData);
  };

  render() {
    const { t } = this.props;
    const availableLanguages = ["en", "nl"];

    return (
      <div id="registration">
        <h1>{t("page-name")}</h1>
        <Form>
          <Form.Group>
            <Form.Label>{t("username-label")}</Form.Label>
            <Form.Control placeholder={t("username-placeholder")} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("password-label")}</Form.Label>
            <Form.Control placeholder={t("password-placeholder")} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("email-label")}</Form.Label>
            <Form.Control placeholder={t("email-placeholder")} />
          </Form.Group>
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
          <Button block type="submit">
            {t("submit-btn")}
          </Button>
        </Form>
      </div>
    );
  }
}

export default withTranslation("registration")(Registration);
