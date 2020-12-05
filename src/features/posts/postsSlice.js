import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../api";

const initialState = {
  posts: [],
  postsStatus: "idle",
  postsError: null,
  post: {},
  postStatus: "idle",
  postError: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await apiClient.get("/posts");
  return response.data;
});

export const fetchPost = createAsyncThunk("posts/fetchPost", async (id) => {
  const response = await apiClient.get("/posts/" + id);
  return response.data;
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (data) => {
  const response = await apiClient.post("/posts", data.token, {
    post: data.post,
  });
  return response.post;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.postsStatus = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.postsStatus = "succeeded";
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.postsStatus = "failed";
      state.postsError = action.payload;
    },
    [fetchPost.pending]: (state, action) => {
      state.postStatus = "loading";
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.postStatus = "succeeded";
      state.post = action.payload;
    },
    [fetchPost.rejected]: (state, action) => {
      state.postStatus = "failed";
      state.postError = action.payload;
    },
  },
});

export default postsSlice.reducer;
