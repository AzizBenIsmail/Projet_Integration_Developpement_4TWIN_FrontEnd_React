import { v4 as uuid } from "uuid";
import store from "./store";
import { addChatMessage } from "Messenger/messengerSlice";
import * as socketConn from "../socketConnection/socketConn";
import { addChatbox } from "Messenger/messengerSlice";
import Cookies from "js-cookie";
import axios from "axios";

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



  //////badwords
  const badWords = ['badword1', 'badword2', 'badword3'];
  let newContent = content;

// Replace bad words with asterisks
for (let i = 0; i < badWords.length; i++) {
const regex = new RegExp(badWords[i], 'gi');
newContent = newContent.replace(regex, '*'.repeat(badWords[i].length));
}

  store.dispatch(
    addChatMessage({
      socketId: receiverSocketId,
      content: newContent,
      myMessage: true,
      id: message.id,
    })
  );
};

export const chatMessageHandler = (messageData) => {
  openChatBoxIfClosed(messageData.senderSocketId)



  console.log(messageData.content)
  console.log(messageData)

  
  store.dispatch(
    addChatMessage({
      socketId: messageData.senderSocketId,
      content: messageData.content,
      myMessage: false,
      id: messageData.id,
    })
  );

};

const openChatBoxIfClosed = (socketId) => {
  const chatbox = store
    .getState()
    .messenger.chatboxes.find((c) => c.socketId === socketId);
    const username=store.getState().map.onlineUsers.find(user=>user.socketId===socketId)?.username
  if (!chatbox) {




    if (!Cookies.get("user")) {
      window.location.replace("/login-page");
    }
    
    const token = JSON.parse(Cookies.get("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const id = JSON.parse(Cookies.get("user")).user._id;
    const Login = () => {
    const m = [];
    return new Promise((resolve, reject) => {
      const params = {
        user: id,
        to: username,
      };
    
      axios
        .post("http://localhost:5000/chat/chat/load/", params,{
          headers: {
              'Content-Type': 'multipart/form-data',
              'foo': 'bar'
            },
            ...config
        })
        .then((res) => {
          if(res.data.chat[0]){
          res.data.chat[0].messages.forEach((msg) => {
            console.log(msg.content);
            m.push({
              content: msg.content,
              myMessage: msg.sender==id?true:false,
              id: socketId,
            });
          });}
          resolve(m);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
    };
    
    Login()
    .then((m) => {
    
    
      store.dispatch(addChatbox({
        username,
        socketId,
        m
      }));
    })
    .catch((e) => {
      console.log(e);
    });

  }
};

