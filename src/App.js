import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>*/}
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => <React.Fragment></React.Fragment>}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
