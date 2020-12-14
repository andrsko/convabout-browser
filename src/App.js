import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Header } from "./app/header/Header";

import { PostList } from "./features/posts/PostList";
import { AddPostForm } from "./features/posts/AddPostForm";
import { ChatPost } from "./app/ChatPost";
import { SignUpForm } from "./features/auth/SignUpForm";
import { SignInForm } from "./features/auth/SignInForm";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/submit" component={AddPostForm} />
          <Route exact path="/chat" component={ChatPost} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
