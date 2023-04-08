import React from 'react';
import chatIcon from '../../resources/images/chat-icon.svg'

const ChatButton=({socketId,username})=>{

    const handleAddChatBox=()=>{

    };

    return (
       <img className='map_page_card_img' src={chatIcon} alt=""  onClick={handleAddChatBox}/>
    )
}

export default ChatButton;