import React from 'react';
import chatIcon from '../../resources/images/chat-icon.svg'
import { useDispatch } from 'react-redux';
import { addChatbox } from 'Messenger/messengerSlice';
import Cookies from 'js-cookie';
import axios from 'axios';

const ChatButton=({socketId,username})=>{

    const dispatch = useDispatch();


    const handleAddChatBox = () => {
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


            dispatch(addChatbox({
              username,
              socketId,
              m
            }));
          })
          .catch((e) => {
            console.log(e);
          });
      };
      



    // const handleAddChatBox=()=>{
    //     dispatch(addChatbox({
    //         username,
    //         socketId
    //     }))
    // };

    return (
       <img className='map_page_card_img' src={chatIcon} alt=""  onClick={handleAddChatBox}/>
    )
}

export default ChatButton;