import React from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import Marker from "./Marker";

import "./MapPage.css";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import Messenger from "Messenger/Messenger";
import VideoRooms from "VideoRooms/VideoRooms";
import Cookies from "js-cookie";
import DemoNavbar from "../components/Navbars/DemoNavbar";
const MapPage = () => {
  const myLocation = useSelector((state) => state.map.myLocation);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const cardChosenOption = useSelector((state) => state.map.cardChosenOption);

  const userCookie = Cookies.get('user');
  const u = JSON.parse(Cookies.get('user'));
  const email= u.user.email;

  const defaultMapProps = {
    center: {
      lat: myLocation.lat,
      lng: myLocation.log,
    },
    zoom: 8,
  };
  return (
    <>
    <div className="full_map_page">
<div className="left_chat">

<div className="circle-container">
  <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" alt="Your Image" className="circle-image"/>

</div>




<div className="icon-container">
<h3> {email}</h3>
<a href={`/profile-page`}>
  <i class="fas fa-user fa-lg"></i>
  </a>
</div>

<div className="collapse-label">
  <input type="checkbox" id="toggle-1" className="collapse-input"/>
  <label for="toggle-1" className="collapse-trigger">Preanswered question</label>
  <div className="collapse-content">
    <p>your question :</p>
    <input type="text" placeholder="write your question here"/>
    <p>your answer :</p>
    <input type="text" placeholder="write your answer here"/>

  <input type="submit" value="save" />
  </div>
</div>

<div className="collapse-label">
  <input type="checkbox" id="toggle-3" className="collapse-input"/>
  <label for="toggle-3" className="collapse-trigger">Option 2</label>
  <div className="collapse-content">
    <p>This is the content that will be collapsed or expanded when the label is clicked.</p>
  </div>
</div>

</div>

   
    
    <div className="map_page_container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD8EsP6LrDD5wsHHLPaN6SP_22cvKXTNE0" }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
      >
        {onlineUsers.map((onlineUser) => {
          return (
            <Marker
              lat={onlineUser.coords.lat}
              lng={onlineUser.coords.log}
              key={onlineUser.socketId}
              myself={onlineUser.myself}
              socketId={onlineUser.socketId}
              username={onlineUser.username}
              coords={onlineUser.coords}
            />
          );
        })}
      </GoogleMapReact>
      <Messenger />
      {cardChosenOption && (
        <UserInfoCard
          socketId={cardChosenOption.socketId}
          username={cardChosenOption.username}
          userLocaion={cardChosenOption.coords}
        />
      )}
      <VideoRooms/>
    </div>

    </div>
    </>
  );
};

export default MapPage;
