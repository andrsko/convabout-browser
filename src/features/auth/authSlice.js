import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../api";

const initialState = {
  token: "",
  username: "",
  signUpStatus: "idle",
  signUpError: null,
  signInStatus: "idle",
  signInError: null,
};

export const signUp = createAsyncThunk("auth/signUp", async (user) => {
  const response = await apiClient.post("/sign_up", undefined, {
    user: user,
  });
  return response.data;
});

export const signIn = createAsyncThunk("auth/signIn", async (session) => {
  const response = await apiClient.post("/sign_in", undefined, {
    session: session,
  });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.token = "";
      state.username = "";
    },
  },
  extraReducers: {
    [signUp.pending]: (state, action) => {
      state.signUpStatus = "loading";
    },
    [signUp.fulfilled]: (state, action) => {
      state.signUpStatus = "succeeded";
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    [signUp.rejected]: (state, action) => {
      state.signUpStatus = "failed";
      state.signUpError = action.payload;
    },
    [signIn.pending]: (state, action) => {
      state.signInStatus = "loading";
    },
    [signIn.fulfilled]: (state, action) => {
      state.signInStatus = "succeeded";
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    [signIn.rejected]: (state, action) => {
      state.signInStatus = "failed";
      state.signInError = action.payload;
    },
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
