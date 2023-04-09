import React from 'react'
import NavBar from './NavBar';


const Chatbox= (props)=>{
    const {socketId}=props;

    return (

<div className="chatbox_container">
<NavBar {...props}/>
</div>

    )
}

export default Chatbox;