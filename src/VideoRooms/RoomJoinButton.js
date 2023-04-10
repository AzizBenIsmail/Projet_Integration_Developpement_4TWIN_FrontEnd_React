import React from "react";
import { useSelector } from "react-redux";
import { joinVideoRoom } from "../store/actions/videoRoomActions";

const RoomJoinButton = ({ creatorUsername, roomId, amountOfParticipants }) => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);

  const handleJoinRoom = () => {
    if (inRoom) {
      return alert("Already in room");
    }

    if (amountOfParticipants > 1) {
      return alert("Room is full");
    }

    joinVideoRoom(roomId);
  };

  return (
    <button onClick={handleJoinRoom} className="map_page_v_rooms_join_button">
      {creatorUsername[0]}
    </button>
  );
};

export default RoomJoinButton;
