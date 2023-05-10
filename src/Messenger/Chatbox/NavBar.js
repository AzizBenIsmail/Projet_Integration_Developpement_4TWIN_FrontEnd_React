import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import closeIcon from "../../resources/images/close-icon.svg";
import { removeChatBox } from "Messenger/messengerSlice";
import Cookies from "js-cookie";

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
    const interval = setInterval(fetchColor, 2000); 
    return () => clearInterval(interval); 
  }, [username]);

  const navBarStyle = {
    backgroundColor: favoriteColor,
  };

  return (
    <div className="chatbox_nav_bar_container" style={navBarStyle}>
      <ChatboxLabel username={username} favoriteColor={favoriteColor} />
      <CloseButton socketId={socketId} />
    </div>
  );
};

export default NavBar;
