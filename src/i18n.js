import i18n from "i18next";

import dashboardGb from "./translations/gb/dashboard.json";
import dashboardNl from "./translations/nl/dashboard.json";

import accountGb from "./translations/gb/account.json";
import accountNl from "./translations/nl/account.json";

import menuNl from "./translations/nl/menu.json";
import menuGb from "./translations/gb/menu.json";

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "gb", // language to use
  resources: {
    gb: {
      dashboard: dashboardGb,
      account: accountGb,
      menu: menuGb,
    },
    nl: {
      dashboard: dashboardNl,
      account: accountNl,
      menu: menuNl,
    },
  },
});

export default i18n;
