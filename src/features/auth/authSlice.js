import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../api";

const initialState = {
  token: null,
  username: null,
  status: "idle",
  error: null,
};

export const signUp = createAsyncThunk("auth/signUp", async (username) => {
  const response = await apiClient.post("/sign_up", undefined, {
    user: { username: username, password: "" },
  });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signUp.pending]: (state, action) => {
      state.status = "loading";
    },
    [signUp.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    [signUp.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
