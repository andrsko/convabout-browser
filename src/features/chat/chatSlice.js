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
      /* if it's a message sent on singing up socket reconnection -
         delete from buffer log - so in the end when buffer log empties the
         only condition left to check is whether buffer log contains
         any messages; if negative - all messages till first message were
         already received and any new message can be pushed to log as usual */
      if (state.logTillFirstMessage.length) {
        const index = state.logTillFirstMessage.findIndex(function (message) {
          return message.id === action.payload.id;
        });
        if (index !== -1) state.logTillFirstMessage.splice(index, 1);
        else state.log.push(action.payload);
      } else state.log.push(action.payload);
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
