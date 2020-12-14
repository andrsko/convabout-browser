import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import store from "../../app/store";

import { addNewPost } from "./postsSlice";
import { signUp, resumeSignUp } from "../auth/authSlice";
import { SignUpErrorHandler } from "../auth/SignUpErrorHandler";
import { Loader } from "../../shared/Loader";

import styles from "./AddPostForm.module.css";

export const AddPostForm = () => {
  const [username, setUsername] = useState("");
  const onUsernameChanged = (e) => setUsername(e.target.value);

  const [title, setTitle] = useState("");
  const onTitleChanged = (e) => setTitle(e.target.value);

  const [requestStatus, setRequestStatus] = useState("idle");

  const signUpStatus = useSelector((state) => state.auth.signUpStatus);

  const dispatch = useDispatch();
  let history = useHistory();

  let token = store.getState().auth.token;

  // if signed up - token must be provided, else - username to sign up
  const canSave = (token || username) && title && requestStatus !== "loading";
  const onSavePostClick = async () => {
    if (canSave) {
      try {
        setRequestStatus("loading");

        // if not signed up - sign up and get newly obtained token
        if (!token) {
          const signUpResultAction = await dispatch(
            signUp({ username: username, password: "" })
          );
          unwrapResult(signUpResultAction);
          token = store.getState().auth.token;
        }

        const addNewPostResultAction = await dispatch(
          addNewPost({ token, post: { title } })
        );
        unwrapResult(addNewPostResultAction);
        history.push("/");
      } catch (err) {
        console.error("Failed to save the post: ", err);
        setRequestStatus("error");
      }
    }
  };

  // resume signing up state
  useEffect(() => dispatch(resumeSignUp()), [dispatch]);

  // if not signed up provide the form to sign up while creating a post
  const SignUpForm = token ? null : (
    <React.Fragment>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        id="username"
        maxLength="15"
        value={username}
        onChange={onUsernameChanged}
      />
    </React.Fragment>
  );

  let buttonContent, buttonClassName;
  if (signUpStatus === "loading" || requestStatus === "loading") {
    buttonContent = <Loader size="small" compact />;
    buttonClassName = styles.loading;
  } else {
    buttonContent = "POST";
    buttonClassName = "";
  }

  return (
    <section className={styles.addPost}>
      <h1 className={styles.addPostHeading}>Start a new conversation</h1>
      <form className={styles.addPostForm}>
        {SignUpForm}
        <label htmlFor="postTitle">Title:</label>
        <textarea
          name="postTitle"
          id="postTitle"
          rows="3"
          maxLength="150"
          value={title}
          onChange={onTitleChanged}
        />
        {SignUpErrorHandler()}
        <button
          className={buttonClassName}
          type="button"
          onClick={onSavePostClick}
          disabled={!canSave}
        >
          {buttonContent}
        </button>
      </form>
    </section>
  );
};
