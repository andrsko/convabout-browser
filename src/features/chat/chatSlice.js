import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  log: [],

  // first message sent on signing up
  firstMessage: "",

  // buffer log used when signing up with the aim not to rerender
  // layout with already present messages on socket reconnection
  logTillFirstMessage: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    newMessage(state, action) {
      if (!state.log.some((message) => message["id"] === action.payload["id"]))
        state.log.push(action.payload);
    },
    clearLog(state) {
      state.log = [];
    },
    setFirstMessage(state, action) {
      state.firstMessage = action.payload;
    },

    // copy to buffer log
    captureLogTillFirstMessage(state) {
      state.logTillFirstMessage = state.log;
    },

    // retrive from buffer log
    restoreLogTillFirstMessage(state) {
      state.log = state.logTillFirstMessage;
    },
  },
});

export default chatSlice.reducer;

export const {
  newMessage,
  clearLog,
  setFirstMessage,
  captureLogTillFirstMessage,
  restoreLogTillFirstMessage,
} = chatSlice.actions;
