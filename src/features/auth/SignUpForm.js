import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import { signUp } from "./authSlice";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const onUsernameChanged = (e) => setUsername(e.target.value);

  const [password, setPassword] = useState("");
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const dispatch = useDispatch();
  let history = useHistory();

  const requestStatus = useSelector((state) => state.posts.postsStatus);
  const error = useSelector((state) => state.posts.postsError);

  const canSave = username && password && requestStatus !== "loading";
  const onSignUpClick = async () => {
    if (canSave) {
      try {
        const signUpResultAction = await dispatch(
          signUp({ username, password })
        );
        unwrapResult(signUpResultAction);
        history.push("/");
      } catch (err) {
        console.error("Failed to sign up: ", err);
      }
    }
  };

  const requestStatusMessageOptions = {
    pending: "Loading...",
    error: error,
  };
  const requestStatusMessage = (
    <p>{requestStatusMessageOptions[requestStatus]}</p>
  );

  return (
    <section>
      <h2>Sign up</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          maxLength="15"
          value={username}
          onChange={onUsernameChanged}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChanged}
        />
        <button type="button" onClick={onSignUpClick}>
          Sign Up
        </button>
      </form>
      {requestStatusMessage}
    </section>
  );
};
