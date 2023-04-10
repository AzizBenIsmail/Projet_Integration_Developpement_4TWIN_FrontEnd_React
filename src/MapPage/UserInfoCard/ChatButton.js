import React from 'react';
import chatIcon from '../../resources/images/chat-icon.svg'
import { useDispatch } from 'react-redux';
import { addChatbox } from 'Messenger/messengerSlice';

const ChatButton=({socketId,username})=>{

    const dispatch = useDispatch();

    const handleAddChatBox=()=>{
        dispatch(addChatbox({
            username,
            socketId
        }))
    };

    return (
       <img className='map_page_card_img' src={chatIcon} alt=""  onClick={handleAddChatBox}/>
    )
}

export default ChatButton;