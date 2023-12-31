import React, { useState } from "react";
import { useSelector } from "react-redux";
import { sendChatMessage } from "../../store/messengerActions";
import Cookies from "js-cookie";
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
      if (toxicityScore > 0.2) {
        const userData = JSON.parse(Cookies.get("user"));
        const newCount = userData.user.inappropriateBehaviorCount + 1;
        const updatedUserData = { ...userData, user: { ...userData.user, inappropriateBehaviorCount: newCount } };
        Cookies.set("user", JSON.stringify(updatedUserData));
        
        if (updatedUserData.user.inappropriateBehaviorCount > 4) {
          Cookies.remove("user");
          window.location.href = "/login-page";
        }
        
       alert('Harassment detected! be careful or your account might be disabled ');
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
