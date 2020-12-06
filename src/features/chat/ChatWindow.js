import React, { useState, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";
//import { Socket } from "phoenix";

import store from "../../app/store";
import { signUp } from "../auth/authSlice";
import { newMessage, clearLog } from "./chatSlice";
import { WebSocketContext } from "../../app/websocket";
import { MessageList } from "./MessageList";

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

  const signUpRequestStatus = useSelector((state) => state.auth.signUpStatus);
  const signUpError = useSelector((state) => state.auth.signUpError);

  // if signed up - token must be provided, else - username to sign up
  const canSend = (token || username) && message;
  const onSendMessageClick = async () => {
    if (canSend) {
      if (token) channel.current.push("shout", { body: message });
      else {
        try {
          const signUpResultAction = await dispatch(
            signUp({ username: username, password: "" })
          );
          unwrapResult(signUpResultAction);
          token = store.getState().auth.token;

          setFirstMessage(message);
        } catch (err) {
          console.error("Failed to sign up: ", err);
        }
      }
    }
  };

  const requestStatusMessageOptions = {
    pending: "Loading...",
    error: "Failed to sign up: " + signUpError,
  };
  const requestStatusMessage = (
    <p>{requestStatusMessageOptions[signUpRequestStatus]}</p>
  );

  // if not signed up provide the form to sign up while sending a message
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
    <section id="chat-window">
      <h2>Chat</h2>
      <MessageList />
      <form id="message-form">
        {SignUpForm}
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={onMessageChanged}
        />
        <button type="button" onClick={onSendMessageClick} disabled={!canSend}>
          Send Message
        </button>
      </form>
      {requestStatusMessage}
    </section>
  );
};
