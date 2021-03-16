import i18n from "i18next";

import dashboardEn from "./translations/en/dashboard.json";
import dashboardNl from "./translations/nl/dashboard.json";

import accountEn from "./translations/en/account.json";
import accountNl from "./translations/nl/account.json";

import menuEn from "./translations/en/menu.json";
import menuNl from "./translations/nl/menu.json";

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en", // language to use
  resources: {
    en: {
      dashboard: dashboardEn,
      account: accountEn,
      menu: menuEn,
    },
    nl: {
      dashboard: dashboardNl,
      account: accountNl,
      menu: menuNl,
    },
  },
});

export default i18n;
