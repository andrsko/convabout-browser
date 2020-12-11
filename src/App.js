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
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { ChatWindow } from "./features/chat/ChatWindow";
import { SignUpForm } from "./features/auth/SignUpForm";
import { SignInForm } from "./features/auth/SignInForm";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <PostList />
              </React.Fragment>
            )}
          />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/submit" component={AddPostForm} />
          <Route
            exact
            path="/chat"
            render={() => (
              <React.Fragment>
                <SinglePostPage />
                <ChatWindow />
              </React.Fragment>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
