import React from 'react'
import NavBar from './NavBar';
import Messages from './Messages';
import NewMessage from './NewMessage';


const Chatbox= (props)=>{
    const {socketId}=props;
    const { username }=props;

    return (

<div className="chatbox_container">
<NavBar {...props}/>
<Messages socketId={socketId} username={username}/>
<NewMessage socketId={socketId} username={username}/>
</div>

    )
}

export default Chatbox;