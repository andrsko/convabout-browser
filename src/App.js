import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Header } from "./app/Header";

import { SignUpForm } from "./features/auth/SignUpForm";
import { SignInForm } from "./features/auth/SignInForm";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => <React.Fragment></React.Fragment>}
          />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/signin" component={SignInForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
