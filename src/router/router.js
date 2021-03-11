import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import paths from "services/shared/router-paths";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Suspense fallback={<div>Loading admin component</div>}>
        <Route
          path={paths.Root}
          component={React.lazy(() => import("pages/dashboard/index"))}
        />
      </Suspense>
      <Suspense fallback={<div>Loading admin component</div>}>
        <Route
          path={paths.Simulation}
          component={React.lazy(() => import("pages/simulation/index"))}
        />{" "}
      </Suspense>
    </Switch>
  </BrowserRouter>
);

export default Router;
