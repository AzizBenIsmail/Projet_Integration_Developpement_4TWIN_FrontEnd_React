import React from "react";
import { useSelector } from "react-redux";
import callIcon from "../resources/images/call-icon.svg";
import { createVideoRoom } from "../store/actions/videoRoomActions";

const CreateRoomButton = () => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);

  const handleRoomCreate = async () => {
    if (inRoom) {
      return alert("You are already in the room");
    }

    try {  

       createVideoRoom();
     // const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    } catch (error) {
      console.error('Error accessing camera:', error);
      // You can show a user-friendly error message here if you'd like
    }
  };

  return (
    <img
      className="map_page_card_img"
      src={callIcon}
      onClick={handleRoomCreate}
    ></img>
  );
};

export default CreateRoomButton;
