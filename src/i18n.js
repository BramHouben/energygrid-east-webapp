import i18n from "i18next";

import dashboardEn from "./translations/en/dashboard.json";
import dashboardNl from "./translations/nl/dashboard.json";

import accountEn from "./translations/en/account.json";
import accountNl from "./translations/nl/account.json";

import regionfilterEn from "./translations/en/regionfilter.json";
import regionfilterNl from "./translations/nl/regionfilter.json";

import menuEn from "./translations/en/menu.json";
import menuNl from "./translations/nl/menu.json";

import chartEn from "./translations/en/chart.json";
import chartNl from "./translations/nl/chart.json";

import registrationEn from "./translations/en/registration.json";
import registrationNl from "./translations/nl/registration.json";

import termsAndServicesEn from "./translations/en/terms-and-services.json";
import termsAndServicesNl from "./translations/nl/terms-and-services.json";

import scenarioEn from "./translations/en/scenario.json";
import scenarioNl from "./translations/nl/scenario.json";

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: localStorage.getItem("language") ?? "en", // language to use
  resources: {
    en: {
      dashboard: dashboardEn,
      account: accountEn,
      menu: menuEn,
      chart: chartEn,
      regionfilter: regionfilterEn,
      registration: registrationEn,
      termsAndServices: termsAndServicesEn,
      scenario: scenarioEn,
    },
    nl: {
      dashboard: dashboardNl,
      account: accountNl,
      menu: menuNl,
      chart: chartNl,
      regionfilter: regionfilterNl,
      registration: registrationNl,
      termsAndServices: termsAndServicesNl,
      scenario: scenarioNl,
    },
  },
});

export default i18n;
