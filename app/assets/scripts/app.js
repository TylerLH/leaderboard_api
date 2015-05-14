import React from "react";
import Router from "react-router";
var {Route, DefaultRoute, RouteHandler} = Router;

import App from "./components/App";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Home} />
    <Route name="leaderboard" path="/leaderboard" handler={Leaderboard}/>
  </Route>
)

Router.run(routes, Router.HistoryLocation, Handler => {
  React.render(<Handler/>, document.body);
});
