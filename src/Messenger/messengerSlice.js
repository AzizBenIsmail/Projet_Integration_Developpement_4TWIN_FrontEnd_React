import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import produce, { current } from 'immer';

/// chnage the init of chat history load it

const initialState = {
  chatboxes: [],
  chatHistory: {},
};

export const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    addChatbox: (state, action) => {
      

      if (
        !state.chatboxes.find(
          (chatbox) => chatbox.socketId === action.payload.socketId
        )
      ) {
        //         if (!state.chatHistory[action.payload.socketId]) {
        //         state.chatHistory[action.payload.socketId] = [
        //           {
        //             content: "action.payload.content",
        //             myMessage: true,
        //             id: action.payload.id,
        //           },
        //         ];

        //         state.chatHistory[action.payload.socketId] .push(
        //           {
        //             content: "action.payload.content",
        //             myMessage: false,
        //             id: action.payload.id,
        //           },
        // );
        //         state.chatHistory[action.payload.socketId] .push(
        //           {
        //             content: "action.payload.content",
        //             myMessage: true,
        //             id: action.payload.id,
        //           },
        // );
        //       }
        state.chatboxes.push(action.payload);
      }

      //       ////////////////////

      //       //  CHATBOXES  //

      //// load
      // const m = [];
      // const Login = async () => {
      //   try {
      //     state.chatHistory[action.payload.socketId] = [];

      //     const params = {
      //       user: "6430ad0b25ab08f90bc19042",
      //       to: action.payload.username,
      //     };

      //     const res = await axios.post(
      //       "http://localhost:5000/chat/chat/load/",
      //       params
      //     );

      //     res.data.chat[0].messages.forEach((msg) => {
      //       console.log(msg.content);

      //       m.push({
      //         content: msg.content,
      //         myMessage: false,
      //         id: action.payload.id,
      //       });
      //     });

      //     // console.log(res);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };
      // Login();

      //////

      state.chatHistory[action.payload.socketId] = [];


      if(action.payload.m){

        if(!action.payload.m.length==0){
      action.payload.m.forEach((msg) =>
        state.chatHistory[action.payload.socketId].push({
          content: msg.content,
          myMessage: msg.myMessage,
          id: action.payload.id,
        })
      );
    

      console.log(state.chatHistory[action.payload.socketId][0].content);
    }}


      // Handle the case when IsRevoked is true

      // const draftContent = produce(state.chatHistory[action.payload.socketId][0].content, draftState => {
      //   draftState+='';
      // });

      // call current with the draftContent
      // console.log(draftContent);
      // console.log(draftContent);


      ///////////////////
    },
    removeChatBox: (state, action) => {
      state.chatboxes = state.chatboxes.filter(
        (chatbox) => chatbox.socketId !== action.payload
      );
      state.chatHistory[action.payload] = [];
    },
    addChatMessage: (state, action) => {
      if (state.chatHistory[action.payload.socketId]) {
        state.chatHistory[action.payload.socketId].push({
          content: action.payload.content,
          myMessage: action.payload.myMessage,
          id: action.payload.id,
        });
      } else {
        state.chatHistory[action.payload.socketId] = [
          {
            content: action.payload.content,
            myMessage: action.payload.myMessage,
            id: action.payload.id,
          },
        ];
      }
    },
  },
});

export const { addChatbox, removeChatBox, addChatMessage } =
  messengerSlice.actions;
export default messengerSlice.reducer;
