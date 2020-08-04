import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./app/index";

import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>,
  document.getElementById("app")
);
