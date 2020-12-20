import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  log: [],

  // first message sent on signing up
  firstMessage: "",
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
    setFirstMessage(state, action) {
      state.firstMessage = action.payload;
    },
  },
});

export default chatSlice.reducer;

export const { newMessage, clearLog, setFirstMessage } = chatSlice.actions;
