import * as React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import HomepageView from "./modules/homepage";
import ChatpageView from "./modules/chatpage";
import FallbackView from "./modules/fallback/fallback.view";

import Header from "./components/header/header";

import "./app.scss";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={HomepageView} />
        <Route path="/chatroom" exact component={ChatpageView} />
        <Route path="/" component={FallbackView} />
      </Switch>
    </>
  );
};

export default withRouter(App);
