import React from "react";

import Main from "./components/Main/Main";
import FormEdit from "./components/FormEdit/FormEdit";

import { history } from "./history";

import { Router, Route, Switch, Redirect } from "react-router-dom";

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/form" component={FormEdit} />
        <Route path="/" component={Main} />
        <Redirect from="*" to="/home" />
      </Switch>
    </Router>
  );
}
