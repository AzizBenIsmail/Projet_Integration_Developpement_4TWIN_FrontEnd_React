import React from "react";
import { Button, Card, Container, Row, Col ,Progress, Badge} from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import {setMyLocation} from "../../../../MapPage/mapSlice"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { Navigate } from "react-router-dom";

import createMessageBubble from "./ChatBubble";
import { useNavigate } from "react-router-dom";
import { error } from "jquery";
import { getFakeLocation } from "./FAKE_LOCATION";
import { connectionWithSocketIOServer } from "socketConnection/socketConn";
import { login } from "socketConnection/socketConn";
import { connectWithPeerServer } from "realtimeCommunication/webRTCHandler";

const locationOptions = {
  enableHightAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
export default function ChatBox(props) {
  const user = props.user;
  const [locationErrorOccurred,setLocationErrorOccurred]=useState(false)
  const onlineUsers = useSelector((state) => state.map.onlineUsers);

  const onSuccess = (position) => {

    dispatch(setMyLocation({
      lat: position.coords.latitude,
      log:position.coords.longitude,
    }
    ))
  };



  const myLocation= useSelector(state =>state.map.myLocation)


  const navigate = useNavigate();
const dispatch= useDispatch()

const [isVisible, setIsVisible] = useState(true);

  const onError = (error) => {
    
    console.log("error occurred when trying to get location");
    console.log("error" + error);
    setLocationErrorOccurred(true);
  };

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   onSuccess,
    //   onError,
    //   locationOptions
    // );
    onSuccess(getFakeLocation())
  }, []);

useEffect(()=>{
if(myLocation){
  connectionWithSocketIOServer();
  connectWithPeerServer();

}
},[
  myLocation
])



  function closeChat() {
    setIsVisible(false);
  }

  function openMap() {
    login({
      username: user.username,
      coords:{
        log:myLocation.log,
        lat:myLocation.lat
      }
    })
    navigate("/map");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("textAreaExample");
    const chatbox = document.querySelector(".chatbox");

    inputField.addEventListener("keydown", function (event) {
      if (event.code === "Enter" && !event.shiftKey) {
        event.preventDefault();
        const message = inputField.value.trim();
        if (message) {
          const messageBubble = createMessageBubble(props, "avatar1", message);
          chatbox.appendChild(messageBubble);
          inputField.value = "";
        }
      }
    });

    const chatContainer = document.getElementById("chat-container");

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const textArea = document.getElementById("textAreaExample");
    textArea.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    });
  });

  return (
    <div>
      {isVisible && (
        <Button
        className="mr-4"
        color="info"
        onClick={openMap}
        size="sm"
      >
        <span> Map Messager </span>
        <i className="ni ni-chat-round"></i>
      </Button>
       /*{<MDBContainer className="py-5 chatFlow">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="8" lg="6" xl="4">
              <MDBCard
                id="chat1"
                className="full-size"
                style={{ borderRadius: "15px" }}
              >
                <MDBCardHeader
                  className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0 "
                  style={{
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                >
                  Map messenger
                  <MDBIcon fas icon="angle-left" disabled={true} onClick={openMap} />
                  <p className="mb-0 fw-bold">{props.user.first_Name}</p>
                  <MDBIcon fas icon="times" onClick={closeChat} />
                </MDBCardHeader>

                
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>} */
      )}
    </div>
  );
}
