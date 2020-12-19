import React, { useState, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";
//import { Socket } from "phoenix";

import store from "../../app/store";
import { signUp, resumeSignUp } from "../auth/authSlice";
import {
  usernameMaxLength,
  usernameRegex,
  invalidUsernameMessage,
} from "../auth/inputConstraints";
import { SignUpErrorHandler } from "../auth/SignUpErrorHandler";
import { newMessage, clearLog } from "./chatSlice";
import { WebSocketContext } from "../../app/websocket";
import { MessageList } from "./MessageList";

import { Loader } from "../../shared/Loader";
import send from "./send.svg";
import styles from "./ChatWindow.module.css";

export const ChatWindow = () => {
  let location = useLocation();
  let postId = new URLSearchParams(location.search).get("p");

  const [username, setUsername] = useState("");
  const onUsernameChanged = (e) => setUsername(e.target.value);

  const [message, setMessage] = useState("");
  const onMessageChanged = (e) => setMessage(e.target.value);

  const [firstMessage, setFirstMessage] = useState("");

  const dispatch = useDispatch();
  const socket = useContext(WebSocketContext);

  const channel = useRef(null);
  useEffect(() => {
    channel.current = socket.channel("chat:" + postId, {});
    channel.current.join();
    channel.current.on("shout", (message) => {
      dispatch(newMessage(message));
    });
    return () => {
      channel.current.leave();
      dispatch(clearLog());
    };
  }, [postId, socket, dispatch]);

  useEffect(() => {
    if (firstMessage) {
      channel.current.push("shout", { body: firstMessage });
      setFirstMessage("");
    }
  }, [firstMessage]);
  let token = store.getState().auth.token;

  // resume signing up state on unmount
  useEffect(() => dispatch(resumeSignUp()), [dispatch]);

  const isUsernameValid = username.match(usernameRegex);
  const invalidUsernameError =
    username && !isUsernameValid ? (
      <p className={"error " + styles.invalidUsernameError}>
        {invalidUsernameMessage}
      </p>
    ) : null;

  const signUpStatus = useSelector((state) => state.auth.signUpStatus);

  // if signed up - token must be provided, else - username to sign up
  const canSend = (token || (username && isUsernameValid)) && message;
  const messageInputRef = useRef(null);
  const onSendMessageClick = async () => {
    if (canSend) {
      if (token) {
        setMessage("");
        channel.current.push("shout", { body: message });
      } else {
        try {
          const signUpResultAction = await dispatch(
            signUp({ username: username, password: "" })
          );
          unwrapResult(signUpResultAction);
          token = store.getState().auth.token;

          setFirstMessage(message);
          setMessage("");
        } catch (err) {
          console.error("Failed to sign up: ", err);
        }
      }
    }
  };

  // if not signed up provide the form to sign up while sending a message
  const usernameInputRef = useRef(null);
  const SignUpForm = token ? null : (
    <React.Fragment>
      <input
        ref={usernameInputRef}
        className={styles.usernameInput}
        type="text"
        name="username"
        placeholder="username"
        maxLength={usernameMaxLength}
        value={username}
        onChange={onUsernameChanged}
      />
    </React.Fragment>
  );

  const sendButton =
    signUpStatus === "loading" ? (
      <div className={styles.sendLoader}>
        <Loader size="small" compact />
      </div>
    ) : (
      <button
        className={styles.send}
        type="button"
        onClick={onSendMessageClick}
        disabled={!canSend}
      >
        <img src={send} alt="send" />
      </button>
    );

  useEffect(() => {
    if (token) messageInputRef.current.focus();
    else usernameInputRef.current.focus();
  }, [token]);

  // used to auto resize message input
  const autoResize = (e) => {
    e.target.style.height = "";
    e.target.style.height = e.target.scrollHeight + "px";
    window.scrollTo(0, document.body.scrollHeight);
  };

  // send message on Enter
  function onMessageInputKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      onSendMessageClick();
    }
  }

  return (
    <section className={styles.chatWindow}>
      <MessageList />
      {SignUpErrorHandler()}
      <form>
        {SignUpForm}
        {invalidUsernameError}
        <textarea
          ref={messageInputRef}
          className={styles.messageInput}
          name="message"
          value={message}
          placeholder="Write a message..."
          rows="1"
          onKeyDown={(e) => onMessageInputKeyDown(e)}
          onInput={autoResize}
          onChange={onMessageChanged}
        />
        {sendButton}
      </form>
    </section>
  );
};
