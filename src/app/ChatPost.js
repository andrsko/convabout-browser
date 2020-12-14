import { SinglePostPage } from "../features/posts/SinglePostPage";
import { ChatWindow } from "../features/chat/ChatWindow";
import styles from "./ChatPost.module.css";

export const ChatPost = () => {
  return (
    <div className={styles.chatPost}>
      {SinglePostPage()}
      {ChatWindow()}
    </div>
  );
};
