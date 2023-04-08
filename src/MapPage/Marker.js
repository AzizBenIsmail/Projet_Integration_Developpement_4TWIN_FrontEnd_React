import React, { Component } from "react";
import { useDispatch } from "react-redux";
import locationIcon from "../resources/images/location-icon.svg";
import { setCardChosenOption } from "./mapSlice";
const Marker = (props) => {


  const { myself, socketId, username, coords } = props;
  
  const dispatch=useDispatch();

  const handleOptionChoose=()=>{
    if(!myself){
        dispatch(setCardChosenOption({
            socketId: socketId,
            username: username,
            coords:coords
        }))
    }
  }

  return (
    <div className="map_page_marker_container" onClick={handleOptionChoose}>
      <img src={locationIcon} alt={username} className="map_page_marker_img" />
      <p className="map_page_marker_text">{myself? 'Me': username}</p>
    </div>
  );
};

export default Marker;
