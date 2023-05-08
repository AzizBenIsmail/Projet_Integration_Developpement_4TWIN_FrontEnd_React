import React, { useEffect, useState } from 'react'
import NavBar from './NavBar';
import Messages from './Messages';
import NewMessage from './NewMessage';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { sendChatMessage, sendChatMessage2, sendChatMessage3 } from "../../store/messengerActions";
import Cookies from "js-cookie";
import styled from 'styled-components';

const PreansweredQuestion = styled.h2`
  display: inline-block;
  background-color: #3CDFCB;
  padding: 8px;
  margin: 0 8px 8px 0;
  border-radius: 16px;
  cursor: pointer;
  font-weight: bold;
  color: #1C1E21;
  max-width: 70%;
  overflow-wrap: break-word;
  font-size: 16px;

  &:hover {
    background-color: #2FB4A9;
  }
`;


const Chatbox= (props)=>{
  const {socketId}=props;
  const { username }=props;

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [lastAnswer, setLastAnswer] = useState(null);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);


  const proceedChatMessage = () => {
        
    if (onlineUsers.find((user) => user.socketId === socketId)) {
      sendChatMessage3(socketId, lastMessage,username);
      sendChatMessage2(socketId, lastAnswer,username);
    } else {
      sendChatMessage3(socketId, lastMessage,username);
      sendChatMessage2(socketId, lastAnswer,username);
    }
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  useEffect(() => {
    const fetchLastMessage = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat/p/PA/${username}`);
        const messages = response.data;
        console.log(messages)
        if (messages.length > 0) {
          const lastMessage = messages[messages.length - 1].message

          const lastAnswer=messages[messages.length - 1].answer
          console.log(lastAnswer)
          setLastAnswer(lastAnswer)
          setLastMessage(lastMessage);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLastMessage();
  }, [username]);

  return (
    <>
      <div className="chatbox_container">
        <div className="chatbox_arrow_container" onClick={togglePanel}>
          <i className={`fa fa-chevron-${isPanelOpen ? 'down' : 'up'}`} />
        </div>
        {isPanelOpen && lastMessage && (
  <div className="chatbox_panel_container">
    <div className="chatbox_messages_container">
      <PreansweredQuestion onClick={proceedChatMessage}>{lastMessage}</PreansweredQuestion>
    </div>
  </div>
)}

        <NavBar {...props}/>
        <Messages socketId={socketId} username={username}/>
        <NewMessage socketId={socketId} username={username}/>
      </div>
    </>
  )
}

export default Chatbox;
