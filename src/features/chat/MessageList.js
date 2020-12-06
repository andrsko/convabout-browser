import React from "react";
import { useSelector } from "react-redux";

import timeAgo from "../../utils/timeAgo";

const MessageExcerpt = ({ message }) => {
  return (
    <article className="message-excerpt" key={message.id}>
      <h1>{message.body}</h1>
      <div>
        <p>{timeAgo(message.inserted_at)}</p>
      </div>
    </article>
  );
};

export const MessageList = () => {
  const messages = useSelector((state) => state.chat.log);
  const content = messages.map((message) => (
    <MessageExcerpt key={message.id} message={message} />
  ));

  return (
    <div id="message-list">
      <h2>Messages</h2>
      {content}
    </div>
  );
};
