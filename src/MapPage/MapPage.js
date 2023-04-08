import React from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import Marker from "./Marker";

import "./MapPage.css";
import UserInfoCard from "./UserInfoCard/UserInfoCard";

const MapPage = () => {
  const myLocation = useSelector((state) => state.map.myLocation);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const cardChosenOption = useSelector((state) => state.map.cardChosenOption);

  const defaultMapProps = {
    center: {
      lat: myLocation.lat,
      lng: myLocation.log,
    },
    zoom: 11,
  };
  return (
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
      {cardChosenOption && (
        <UserInfoCard
          socketId={cardChosenOption.socketId}
          username={cardChosenOption.username}
          userLocaion={cardChosenOption.coords}
        />
      )}
    </div>
  );
};

export default MapPage;
