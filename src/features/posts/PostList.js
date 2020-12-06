import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import timeAgo from "../../utils/timeAgo";
import { fetchPosts } from "./postsSlice";

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <Link to={`/chat?p=${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <div>
        <p>{timeAgo(post.inserted_at)}</p>
      </div>
      View Post
    </article>
  );
};

export const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  const postsStatus = useSelector((state) => state.posts.postsStatus);
  const error = useSelector((state) => state.posts.postsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;

  if (postsStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (postsStatus === "succeeded") {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.inserted_at.localeCompare(a.inserted_at));

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "error") {
    content = <div>{error}</div>;
  }

  return (
    <section className="post-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};
