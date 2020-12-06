import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import timeAgo from "../../utils/timeAgo";
import { fetchPost } from "./postsSlice";

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
    content = <div className="loader">Loading...</div>;
  } else if (postStatus === "succeeded") {
    content = (
      <div>
        <h2>{post.title}</h2>
        <div>
          <p>{post.username}</p>
          <p>{timeAgo(post.inserted_at)}</p>
        </div>
      </div>
    );
  } else if (postStatus === "error") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};
