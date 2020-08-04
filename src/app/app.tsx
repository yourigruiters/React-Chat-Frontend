import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./app.scss";
import HomePage from "./modules/home";

interface AppProps {
  id?: string;
}

const App = ({ id }: AppProps) => {
  console.log(id);

  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </>
  );
};

export default App;
