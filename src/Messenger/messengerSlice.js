import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatboxes: [],
  chatHistory: {},
};

export const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    addChatboxes: (state, action) => {
      if (
        !state.chatboxes.find(
          (chatbox) => chatbox.socketId === action.payload.socketId.socketId
        )
      ) {
        state.chatboxes.push(action.payload);
      }
    },
    removeChatBox: (state, action) => {
      state.chatboxes = state.chatboxes.filter(
        (chatbox) => chatbox.socketId !== action.payload
      );
    },
  },
});


export const {addChatboxes,removeChatBox}= messengerSlice.actions
export default messengerSlice.reducer;