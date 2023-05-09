import { v4 as uuid } from "uuid";
import store from "./store";
import { addChatMessage } from "Messenger/messengerSlice";
import * as socketConn from "../socketConnection/socketConn";
import { addChatbox } from "Messenger/messengerSlice";
import Cookies from "js-cookie";
import axios from "axios";



export const sendChatMessage2 = (receiverSocketId, content ,username) => {
  const userid = JSON.parse(Cookies.get("user")).user._id;
  const message = {
    userid,
    username,
    content,
    receiverSocketId,
    id: uuid(),
  };


    store.dispatch(
      addChatMessage({
        socketId: receiverSocketId,
        content: content,
        myMessage: false,
        id: message.id,
      })
    );
  
};

export const sendChatMessage3 = (receiverSocketId, content ,username) => {
  const userid = JSON.parse(Cookies.get("user")).user._id;
  const message = {
    userid,
    username,
    content,
    receiverSocketId,
    id: uuid(),
  };


    store.dispatch(
      addChatMessage({
        socketId: receiverSocketId,
        content: content,
        myMessage: true,
        id: message.id,
      })
    );
  
};




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

  // Get bad words from database
  fetch("http://localhost:5000/chat/badwords/")
    .then((response) => response.json())
    .then((data) => {
      const wordsArray = data.map((obj) => obj.word);
      censorMessage(wordsArray, content);
    })
    .catch((error) => console.error(error));

  const censorMessage = (badWords, content) => {
    let newContent = content;

    // Check for bad words in the message
    for (let i = 0; i < badWords?.length; i++) {
      const regex = new RegExp(badWords[i], 'gi');
      if (content.match(regex)) {
        const userData = JSON.parse(Cookies.get("user"));
        const newCount = userData.user.inappropriateBehaviorCount + 1;
        const updatedUserData = { ...userData, user: { ...userData.user, inappropriateBehaviorCount: newCount } };
        Cookies.set("user", JSON.stringify(updatedUserData));

        if (updatedUserData.user.inappropriateBehaviorCount > 4) {
          Cookies.remove("user");
          window.location.href = "/login-page";
        }
      }
    }

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
          console.log(res)
          console.log(res)
          if(res.data.chat[0]){
          res.data.chat[0].messages.forEach((msg) => {
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

