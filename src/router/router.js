import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Router = () => (
    <BrowserRouter>
      <Switch>
      <Suspense fallback={<div>Loading admin component</div>}>
        <ProtectedRoute component={React.lazy(() => import("../pages/homepage/index"))} />
        <ProtectedRoute component={React.lazy(() => import("../pages/simulation/index"))} />
      </Suspense>
      </Switch>
    </BrowserRouter>
  );

  export default Router;