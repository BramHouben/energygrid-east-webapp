import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import paths from "services/shared/router-paths";
import Dashboard from "../pages/dashboard";
import Simulation from "../pages/simulation";

const Router = () => (
  <BrowserRouter>
    <Switch>
        <Route
          path={paths.Root}
          exact component={Dashboard}
        />
        <Route
          path={paths.Simulation}
          exact component={Simulation}
        />
    </Switch>
  </BrowserRouter>
);

export default Router;
