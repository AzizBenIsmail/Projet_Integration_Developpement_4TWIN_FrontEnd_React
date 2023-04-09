import React from "react";
import { useDispatch } from "react-redux";
import closeIcon from "../../resources/images/close-icon.svg";
import { removeChatBox } from "Messenger/messengerSlice";

const ChatboxLabel = ({ username }) => {
  return <p className="chatbox_nav_bar_label">{username}</p>;
};

const CloseButton = ({ socketId }) => {
  const dispatch = useDispatch();

  const handleCloseChatbox =()=>{
    dispatch(removeChatBox(socketId))
  }
  return (
    <div className="chatbox_close_icon_container">
      <img
        src={closeIcon}
        alt="close"
        className="chatbox_close_icon_img"
        onClick={handleCloseChatbox}
      />
    </div>
  );
};

const NavBar = ({ username, socketId }) => {
  return (
    <div className="chatbox_nav_bar_container">
      <ChatboxLabel username={username} />
      <CloseButton socketId={socketId} />
    </div>
  );
};

export default NavBar;
