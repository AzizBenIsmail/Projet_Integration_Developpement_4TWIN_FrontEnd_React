import React from "react";
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
        <MDBContainer className="py-5 chatFlow">
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
                  <MDBIcon fas icon="angle-left" disabled={true} onClick={openMap} />
                  <p className="mb-0 fw-bold">{props.user.first_Name}</p>
                  <MDBIcon fas icon="times" onClick={closeChat} />
                </MDBCardHeader>

                <MDBCardBody>
                  <div class="chat-container" id="chat-container">
                    <div class="chatbox">
                      <div className="d-flex flex-row justify-content-start mb-4">
                        <img
                          src={`http://localhost:5000/images/${props.user.image_user}`}
                          alt="avatar 1"
                          style={{ width: "45px", height: "100%" }}
                        />
                        <div
                          className="p-3 ms-3"
                          style={{
                            borderRadius: "15px",
                            backgroundColor: "rgba(57, 192, 237,.2)",
                          }}
                        >
                          <p className="small mb-0">
                            Hello and thank you for visiting MDBootstrap. Please
                            click the video below.
                          </p>
                        </div>
                      </div>

                      <div className="d-flex flex-row justify-content-end mb-4">
                        <div
                          className="p-3 me-3 border"
                          style={{
                            borderRadius: "15px",
                            backgroundColor: "#fbfbfb",
                          }}
                        >
                          <p className="small mb-0">
                            Thank you, I really like your product.
                          </p>
                        </div>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                          alt="avatar 1"
                          style={{ width: "45px", height: "100%" }}
                        />
                      </div>

                      <div className="d-flex flex-row justify-content-start mb-4">
                        <img
                          src={`http://localhost:5000/images/${props.user.image_user}`}
                          alt="avatar 1"
                          style={{ width: "45px", height: "100%" }}
                        />
                        <div className="ms-3" style={{ borderRadius: "15px" }}>
                          <div
                            className="p-3 ms-3"
                            style={{
                              borderRadius: "15px",
                              backgroundColor: "rgba(57, 192, 237,.2)",
                            }}
                          >
                            <p className="small mb-0">message1</p>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row justify-content-start mb-4">
                        <img
                          src={`http://localhost:5000/images/${props.user.image_user}`}
                          alt="avatar 1"
                          style={{ width: "45px", height: "100%" }}
                        />
                        <div
                          className="p-3 ms-3"
                          style={{
                            borderRadius: "15px",
                            backgroundColor: "rgba(57, 192, 237,.2)",
                          }}
                        >
                          <p className="small mb-0">message2</p>
                        </div>
                      </div>

                      <div className="d-flex flex-row justify-content-start mb-4">
                        <img
                          src={`http://localhost:5000/images/${props.user.image_user}`}
                          alt="avatar 1"
                          style={{ width: "45px", height: "100%" }}
                        />
                        <div
                          className="p-3 ms-3"
                          style={{
                            borderRadius: "15px",
                            backgroundColor: "rgba(57, 192, 237,.2)",
                          }}
                        >
                          <p className="small mb-0">...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <MDBTextArea
                    className="form-outline"
                    label="Type your message"
                    id="textAreaExample"
                    rows={4}
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )}
    </div>
  );
}
