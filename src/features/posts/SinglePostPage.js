import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import timeAgo from "../../utils/timeAgo";
import { fetchPost } from "./postsSlice";

import { Loader } from "../../shared/Loader";

import styles from "./SinglePostPage.module.css";

export const SinglePostPage = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.post);

  const postStatus = useSelector((state) => state.posts.postStatus);
  const error = useSelector((state) => state.posts.postError);

  useEffect(() => {
    let postId = new URLSearchParams(location.search).get("p");
    dispatch(fetchPost(postId));
  }, [dispatch, location]);

  let content;

  if (postStatus === "loading") {
    content = <Loader size={"medium"} />;
  } else if (postStatus === "succeeded") {
    content = (
      <div>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postInfo}>
          {`by ${post.username} ${timeAgo(post.inserted_at)}`}
        </p>
      </div>
    );
  } else if (postStatus === "error") {
    content = <div>{error}</div>;
  }

  return <section className={styles.post}>{content}</section>;
};
