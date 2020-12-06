import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  log: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    newMessage(state, action) {
      state.log.push(action.payload);
    },
    clearLog(state) {
      state.log = [];
    },
  },
});

export default chatSlice.reducer;

export const { newMessage, clearLog } = chatSlice.actions;
