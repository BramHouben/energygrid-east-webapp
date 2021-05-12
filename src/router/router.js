import Account from "pages/account";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import Consumption from "pages/consumption";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path={paths.Root} exact component={Dashboard} />
      <Route path={paths.Simulation} exact component={Simulation} />
      <Route path={paths.Account} exact component={Account} />
      <Route path={paths.Registration} exact component={registration} />
      <Route path={paths.Login} exact component={Login} />
      <Route path={paths.Forecast} exact component={Forecast} />
      <Route path={paths.Map} exact component={Map} />
      <Route path={paths.Region} component={Region} />
      <Route path={paths.TermsAndServices} component={TermsAndServices} />
      <Route path={paths.Production} component={Production} />
      <Route path={paths.Consumption} component={Consumption} />
    </Switch>
  </BrowserRouter>
);

export default Router;
