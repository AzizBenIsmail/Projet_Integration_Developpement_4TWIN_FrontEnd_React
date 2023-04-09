import React from "react";

import "./Messenger.css";
import Chatbox from "./Chatbox/Chatbox";
const DUMMY_CHATBOXES = [
  {
    username: "martin",
    socketId: 3213123,
    messages: [],
  },
  {
    username: "test",
    socketId: 3213123,
    messages: [],
  },
];

const Messenger = () => {
  return (
    <div className="messenger_container">
      {DUMMY_CHATBOXES.map((chatbox) => (
        <Chatbox key={chatbox.socketId} socketId={chatbox.socketId} username={chatbox.username}/>
      ))}
    </div>
  );
};

export default Messenger;
