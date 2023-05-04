import React, { useState } from "react";
import { useSelector } from "react-redux";
import { sendChatMessage } from "../../store/messengerActions";
const perspective = require('perspective-api-client');

const NewMessage = ({ socketId,username }) => {
  const [message, setMessage] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);

  const onlineUsers = useSelector((state) => state.map.onlineUsers);

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.keyCode === 13  && message.length > 0) {
      proceedChatMessage();
      setMessage("");
    }
  };

  const proceedChatMessage = () => {

    const client = new perspective({
      apiKey: 'AIzaSyD8EsP6LrDD5wsHHLPaN6SP_22cvKXTNE0',
    });
    
    const text = message;
    
    client.analyze({
      comment: { text },
      languages: ['en'],
      requestedAttributes: {
        TOXICITY: {},
      },
    })
    .then((response) => {
      const toxicityScore = response.attributeScores.TOXICITY.summaryScore.value;
      if (toxicityScore > 0.5) {
        alert('Harassment detected!')
        console.log('Harassment detected!');
      } else {
        console.log('No harassment detected.');
      }
    })
    .catch((error) => {
      console.error(error);
    });

    if (onlineUsers.find((user) => user.socketId === socketId)) {
      sendChatMessage(socketId, message,username);
    } else {
      setInputDisabled(true);
      sendChatMessage(socketId, message,username);
    }
  };

  return (
    <div className="chatbox_new_message_container">
      <input
        className="chatbox_new_message_input"
        type="text"
        placeholder="Type your message ..."
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
        disabled={inputDisabled}
      />
    </div>
  );
};

export default NewMessage;
