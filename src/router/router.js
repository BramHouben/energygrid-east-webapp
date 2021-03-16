import Account from "pages/account";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import paths from "services/shared/router-paths";
import Dashboard from "../pages/dashboard";
import Simulation from "../pages/simulation";
import Header from "components/shared/header";

const Router = () => (
  <BrowserRouter>
  <Header pageName="Dashboard" />
    <Switch>
      <Route path={paths.Root} exact component={Dashboard} />
      <Route path={paths.Simulation} exact component={Simulation} />
      <Route path={paths.Account} component={Account} />
    </Switch>
  </BrowserRouter>
);

export default Router;
