import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import store from "../../app/store";

import { addNewPost } from "./postsSlice";
import { signUp } from "../auth/authSlice";

export const AddPostForm = () => {
  const [username, setUsername] = useState("");
  const onUsernameChanged = (e) => setUsername(e.target.value);

  const [title, setTitle] = useState("");
  const onTitleChanged = (e) => setTitle(e.target.value);

  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  let history = useHistory();

  let token = store.getState().auth.token;

  // if signed up - token must be provided, else - username to sign up
  const canSave = (token || username) && title && requestStatus !== "loading";
  const onSavePostClick = async () => {
    if (canSave) {
      try {
        setRequestStatus("pending");

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

  const requestStatusMessageOptions = {
    pending: "Loading...",
    error: "An Error Occured",
  };
  const requestStatusMessage = (
    <p>{requestStatusMessageOptions[requestStatus]}</p>
  );

  // if not signed up provide the form to sign up while creating a post
  const SignUpForm = token ? null : (
    <React.Fragment>
      {" "}
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="username"
        value={username}
        onChange={onUsernameChanged}
      />
    </React.Fragment>
  );

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        {SignUpForm}
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="Title"
          value={title}
          onChange={onTitleChanged}
        />
        <button type="button" onClick={onSavePostClick} disabled={!canSave}>
          Save Post
        </button>
      </form>
      {requestStatusMessage}
    </section>
  );
};
