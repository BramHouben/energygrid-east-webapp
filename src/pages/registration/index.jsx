import React, { Component } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { Register } from "services/registration";
import { getFormData } from "services/shared/form-data-helper";
import PasswordStrengthBar from "react-password-strength-bar";
import "./index.css";
import { toast } from "react-toastify";
import paths from "services/shared/router-paths";

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      submitBtnDisabled: false,
      displayTermsAndServices: false,
    };
  }

  onLanguageChange = (e) => {
    const { i18n } = this.props;
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

  formValid = (formData) => {
    if (formData.password !== formData.passwordRepeat) {
      const { t } = this.props;
      toast.error(t("password-mismatch"));
      return false;
    }

    if (formData.termsAndServices) return true;
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const formData = getFormData(e);
    if (!this.formValid(formData)) {
      return;
    }

    document.getElementById("registration-spinner").hidden = false;
    this.setState({ submitBtnDisabled: true });
    const result = await Register(formData);
    const { t } = this.props;

    if (result.status === 201) {
      toast.success(t("registration-success"));
    } else if (result.status === 409) {
      toast.error(t("registration-duplicate"));
      this.setState({ submitBtnDisabled: false });
    } else {
      toast.error(t("registration-failure"));
      this.setState({ submitBtnDisabled: false });
    }

    document.getElementById("registration-spinner").hidden = true;
  };

  render() {
    const { t } = this.props;
    const availableLanguages = ["en", "nl"];

    return (
      <div id='registration'>
        <h1>{t("page-name")}</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>{t("username-label")}</Form.Label>
            <Form.Control
              required
              minLength={5}
              name='username'
              placeholder={t("username-placeholder")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("password-label")}</Form.Label>
            <Form.Control
              required
              onChange={(e) => this.setState({ password: e.target.value })}
              minLength={10}
              name='password'
              type='password'
              placeholder={t("password-placeholder")}
            />
            <PasswordStrengthBar password={this.state.password} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("repeat-password-label")}</Form.Label>
            <Form.Control
              required
              minLength={10}
              name='passwordRepeat'
              type='password'
              placeholder={t("password-placeholder")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("email-label")}</Form.Label>
            <Form.Control name='email' placeholder={t("email-placeholder")} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("translation-label")}</Form.Label>
            <Form.Control
              required
              onChange={this.onLanguageChange}
              name='language'
              as='select'
            >
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='formCheckbox'>
            <Form.Label>
              {
                <a
                  href={paths.TermsAndServices}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {t("terms-and-services-label")}
                </a>
              }
            </Form.Label>
            <Form.Check
              required
              type='checkbox'
              label={t("terms-and-services-checkbox")}
            />
          </Form.Group>
          <Button
            disabled={this.state.submitBtnDisabled}
            block
            type='submit'
            style={{
              backgroundColor: "#82de94",
              borderColor: "#82de94",
              color: "black",
            }}
          >
            {t("submit-btn")}
            <span hidden>
              <Spinner
                id='registration-spinner'
                className='ml-2'
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              <span className='sr-only'>Loading...</span>
            </span>
          </Button>
        </Form>
      </div>
    );
  }
}

export default withTranslation("registration")(Registration);
