import React from "react";

import {
 MDBIcon
  } from "mdb-react-ui-kit";

const closeChat=(props)=>{

    const {isVisible, setIsVisible} = props;

    function closeChat() {
        setIsVisible(false);
        console.log('Icon clicked!');
      }

    return(
        <MDBIcon fas icon="times"onClick={closeChat}  />

    )
}
export default closeChat;