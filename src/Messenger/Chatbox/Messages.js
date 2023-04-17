import React ,{useRef,useEffect, useState} from "react";
import SingleMessage from "./SingleMessage";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
const Messages = ({ socketId,username }) => {
  const userid = JSON.parse(Cookies.get("user")).user._id;

  /// to do , we have username and we have a methode that return's id of a username our mission is to 


  const load = async (username) => {
   
      return await axios.post('http://localhost:5000/chat/chat/load/', {"to":username,"user":userid})

   
  };


  const [mes, setMes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await load(username);
        console.log(mes);
        console.log("///////////////////////////");
        console.log(mes);
        console.log("///////////////////////////");
        console.log(res);
        if(res.data.chat[0].messages.length != 0){
          if(res.data.chat[0].messages[res.data.chat[0].messages.length-1]._id !==mes[res.data.chat[0].messages.length -1]?._id){
console.log(res.data.chat[0].messages[res.data.chat[0].messages.length-1]._id )
          console.log(mes[res.data.chat[0].messages.length -1]?._id)
          setMes(res.data.chat[0].messages);
        }
        else{
          setMes()
        }
      }else{
        setMes()
      }
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [username, setMes]); 


  const messages = useSelector(
    (state) => state.messenger.chatHistory[socketId]
  );

  const scrollRef= useRef()
  const scrollToBottom=()=>{
    scrollRef.current.scrollIntoView({behavior: "smooth"});
  };

useEffect(scrollToBottom, [messages])





  return (
    <div className="chatbox_messages_container">

{mes?.map((m) => (
    

console.log(m),
      <SingleMessage
      key={m._id}
      content={m.content}
      myMessage={userid==m.sender? true:false}
    />

    ))}

      {messages?.map((message) => (


        <SingleMessage
          key={message.id}
          content={message.content}
          myMessage={message.myMessage}
        />
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
};
export default Messages;
