import i18n from "i18next";

import dashboardGb from "./translations/gb/dashboard.json";
import dashboardNl from "./translations/nl/dashboard.json";

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "gb", // language to use
  resources: {
    gb: {
      dashboard: dashboardGb,
    },
    nl: {
      dashboard: dashboardNl,
    },
  },
});

export default i18n;
