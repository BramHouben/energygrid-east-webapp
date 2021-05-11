import Account from "pages/account";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import paths from "services/shared/router-paths";
import Dashboard from "pages/dashboard";
import Simulation from "pages/simulation";
import Login from "pages/login";
import Map from "pages/map";
import Region from "pages/region";
import Forecast from "pages/forecast";
import registration from "pages/registration";
import Production from "pages/production";
import TermsAndServices from "pages/terms-and-services";
import ProtectedRoute from "./ProtectedRoute";
import roles from "services/shared/account-role";

function routes() {
  return (
    <BrowserRouter>
      <ProtectedRoute
        roles={[
          roles.Customer,
          roles.LargeScaleCustomer,
          roles.Admin,
          roles.UtilityCompany,
          roles.ResponsibleParty,
        ]}
        path={paths.Root}
        exact
        component={Dashboard}
      />
      <ProtectedRoute
        roles={[
          roles.Customer,
          roles.LargeScaleCustomer,
          roles.Admin,
          roles.UtilityCompany,
          roles.ResponsibleParty,
        ]}
        path={paths.Simulation}
        exact
        component={Simulation}
      />
      <ProtectedRoute
        roles={[
          roles.Customer,
          roles.LargeScaleCustomer,
          roles.Admin,
          roles.UtilityCompany,
          roles.ResponsibleParty,
        ]}
        path={paths.Account}
        exact
        component={Account}
      />
      <ProtectedRoute
        roles={[
          roles.Customer,
          roles.LargeScaleCustomer,
          roles.Admin,
          roles.UtilityCompany,
          roles.ResponsibleParty,
        ]}
        path={paths.Registration}
        exact
        component={registration}
      />
      <Route
        roles={[
          roles.Customer,
          roles.LargeScaleCustomer,
          roles.Admin,
          roles.UtilityCompany,
          roles.ResponsibleParty,
        ]}
        path={paths.Login}
        exact
        component={Login}
      />
      <ProtectedRoute
        roles={[
          roles.Customer,
          roles.LargeScaleCustomer,
          roles.Admin,
          roles.UtilityCompany,
          roles.ResponsibleParty,
        ]}
        path={paths.Forecast}
        exact
        component={Forecast}
      />
      <ProtectedRoute
        roles={[
          roles.Customer,
          roles.LargeScaleCustomer,
          roles.Admin,
          roles.UtilityCompany,
          roles.ResponsibleParty,
        ]}
        path={paths.Map}
        exact
        component={Map}
      />
      <ProtectedRoute
        roles={[
          roles.Customer,
          roles.LargeScaleCustomer,
          roles.Admin,
          roles.UtilityCompany,
          roles.ResponsibleParty,
        ]}
        path={paths.Region}
        component={Region}
      />
      <ProtectedRoute
        roles={[
          roles.Customer,
          roles.LargeScaleCustomer,
          roles.Admin,
          roles.UtilityCompany,
          roles.ResponsibleParty,
        ]}
        path={paths.TermsAndServices}
        component={TermsAndServices}
      />
      <ProtectedRoute
        roles={[
          roles.Customer,
          roles.LargeScaleCustomer,
          roles.Admin,
          roles.UtilityCompany,
          roles.ResponsibleParty,
        ]}
        path={paths.Production}
        component={Production}
      />
    </BrowserRouter>
  );
}

export default routes;
