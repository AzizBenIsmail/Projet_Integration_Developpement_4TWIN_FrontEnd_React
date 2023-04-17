import { v4 as uuid } from "uuid";
import store from "./store";
import { addChatMessage } from "Messenger/messengerSlice";
import * as socketConn from "../socketConnection/socketConn";
import { addChatbox } from "Messenger/messengerSlice";
import Cookies from "js-cookie";

export const sendChatMessage = (receiverSocketId, content ,username) => {
  const userid = JSON.parse(Cookies.get("user")).user._id;
  const message = {
    userid,
    username,
    content,
    receiverSocketId,
    id: uuid(),
  };

  // socketConnection - to send the message to other user
  socketConn.sendChatMessage(message);
  store.dispatch(
    addChatMessage({
      socketId: receiverSocketId,
      content: content,
      myMessage: true,
      id: message.id,
    })
  );
};

export const chatMessageHandler = (messageData) => {
  store.dispatch(
    addChatMessage({
      socketId: messageData.senderSocketId,
      content: messageData.content,
      myMessage: false,
      id: messageData.id,
    })
  );
  openChatBoxIfClosed(messageData.senderSocketId)
};

const openChatBoxIfClosed = (socketId) => {
  const chatbox = store
    .getState()
    .messenger.chatboxes.find((c) => c.socketId === socketId);
    const username=store.getState().map.onlineUsers.find(user=>user.socketId===socketId)?.username
  if (!chatbox) {
    store.dispatch(addChatbox({ socketId, username }));
  }
};
