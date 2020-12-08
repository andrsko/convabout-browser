import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "../features/auth/authSlice";
import logo from "../logo.svg";
import "../App.css";

export const Header = () => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.username);

  const content = username ? (
    <React.Fragment>
      <p>{username}</p>
      <button type="button" onClick={() => dispatch(signOut())}>
        Sign out
      </button>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Link to="/signin">Sign in</Link>
      <Link to="/signup">Sign up</Link>
    </React.Fragment>
  );
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Link to="/">Home</Link>
      {content}
    </header>
  );
};
