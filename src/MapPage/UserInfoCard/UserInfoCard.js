import React from "react";
import { useSelector } from "react-redux";
import { calculateDistanceBetweenCoords } from "resources/utils/location";
import ActionButtons from "./ActionButtons";
import axios from "axios";

const Label = ({ fontSize, text }) => {
  return (
    <p className="map_page_card_label" style={{ fontSize }}>
      {text}
    </p>
  );
};
const UserInfoCard = ({ username, userLocaion, socketId }) => {
  const myLocation = useSelector((state) => state.map.myLocation);

  return (
    <div className="map_page_card_container">
      <Label text={username} fontSize="16px"></Label>
      <Label
        fontSize="14px"
        text={`${calculateDistanceBetweenCoords(myLocation, userLocaion)} Km`}
      ></Label>

      <ActionButtons socketId={socketId} username={username} />
    </div>
  );
};

export default UserInfoCard;
