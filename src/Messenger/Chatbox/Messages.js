import React ,{useRef,useEffect, useState} from "react";
import SingleMessage from "./SingleMessage";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { addChatMessage } from "Messenger/messengerSlice";
const Messages = ({ socketId,username }) => {
  const userid = JSON.parse(Cookies.get("user")).user._id;

  /// to do , we have username and we have a methode that return's id of a username our mission is to 


  const load = async (username) => {
   
      return await axios.post('http://localhost:5000/chat/chat/load/', {"to":username,"user":userid})

   
  };





  const messages = useSelector(
    (state) => state.messenger.chatHistory[socketId]
  );

  const scrollRef= useRef()
  const scrollToBottom=()=>{
    scrollRef.current.scrollIntoView({behavior: "smooth"});
  };

useEffect(scrollToBottom, [messages])


const [favoriteColor, setFavoriteColor] = useState("");
useEffect(() => {
  const userid = JSON.parse(Cookies.get("user")).user._id;
  const fetchColor = async () => {
    const response = await fetch(
      `http://localhost:5000/chat/color/${userid}`
    );
    const data = await response.json();
    setFavoriteColor(data.favoriteColor);
  };
  fetchColor();
}, [username]);

// {mes?.map((m) => (
    

//   console.log(m),
//         <SingleMessage
//         key={m._id}
//         content={m.content}
//         myMessage={userid==m.sender? true:false}
//       />
  
//       ))}




  return (
    <div className="chatbox_messages_container">



      {messages?.map((message) => (


        <SingleMessage
          key={message.id}
          content={message.content}
          myMessage={message.myMessage}
          favoriteColor={favoriteColor}
        />
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
};
export default Messages;
