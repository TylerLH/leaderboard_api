import React from "react";
import Router from "react-router";
var {Route, DefaultRoute, RouteHandler} = Router;

import App from "./components/App";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Home} />
    <Route name="login" path="/login" handler={Login}/>
    <Route name="dashboard" path="/dashboard" handler={Dashboard}/>
  </Route>
)

Router.run(routes, Router.HistoryLocation, Handler => {
  React.render(<Handler/>, document.body);
});
