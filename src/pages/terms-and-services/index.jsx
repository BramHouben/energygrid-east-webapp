import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "./index.css";

class TermsAndServices extends Component {
  render() {
    const { t } = this.props;
    return (
      <div id="terms-and-services">
        <div>
          <h5>{t("index-label")}</h5>
          <text>
            {t("index")
              .split("\n")
              .map((n) => (
                <p>{n}</p>
              ))}
          </text>
        </div>
        <div>
          <h5>{t("data-processing-label")}</h5>
          <text>{t("data-processing")}</text>
        </div>
        <div>
          <h5>{t("data-protection-label")}</h5>
          <text>{t("data-protection")}</text>
        </div>
      </div>
    );
  }
}

export default withTranslation("termsAndServices")(TermsAndServices);
