import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./MessageList.module.css";

const MessageExcerpt = ({ message }) => {
  const toTimeAmPm = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  return (
    <div className={styles.messageExcerpt}>
      <p className={styles.author}>{message.username}</p>
      <p className={styles.body}>{message.body}</p>
      <p className={styles.timestamp}>{toTimeAmPm(message.inserted_at)}</p>
    </div>
  );
};

export const MessageList = () => {
  const messages = useSelector((state) => state.chat.log);

  useEffect(() => {
    //scroll on new message automatically only if scroll position is near bottom
    if (
      window.scrollY &&
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 250
    )
      window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  const content = messages.map((message) => (
    <MessageExcerpt key={message.id} message={message} />
  ));

  return <div id="message-list">{content}</div>;
};
