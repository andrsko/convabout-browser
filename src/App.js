import React, { useEffect } from "react";
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
  //switch focus styling
  useEffect(() => {
    function useMouse() {
      document.body.classList.add("usingMouse");
    }

    function checkTabSetDefault(e) {
      if (e.keyCode === 9) {
        document.body.classList.remove("usingMouse");
      }
    }
    // Let the document know when the mouse is being used
    document.body.addEventListener("mousedown", useMouse);

    // Re-enable focus styling when Tab is pressed
    document.body.addEventListener("keydown", checkTabSetDefault);

    /* set default to using mouse 
       (focus element on load w/out outline) */
    document.body.classList.add("usingMouse");

    return () => {
      // Unbind the event listeners on clean up
      document.removeEventListener("mousedown", useMouse);
      document.removeEventListener("keydown", checkTabSetDefault);
    };
  }, []);

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
