import React from "react";
import{ useState } from 'react';
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


export default function ChatBox(props) {
    const [isVisible, setIsVisible] = useState(true);

function closeChat() {
    setIsVisible(false);
    console.log('Icon clicked!');
  }


  
  document.addEventListener("DOMContentLoaded", function() {
  const inputField = document.getElementById("textAreaExample");
const chatbox = document.querySelector(".chatbox");

inputField.addEventListener("keydown", function (event) {
  if (event.code === "Enter" && !event.shiftKey) {
    event.preventDefault();
    const message = inputField.value.trim();
    if (message) {
      const messageBubble = createMessageBubble(props,"avatar1", message);
      chatbox.appendChild(messageBubble);
      inputField.value = "";
    }
  }
});

function createMessageBubble(props,avatar, message) {
  const messageBubble = document.createElement("div");
  messageBubble.classList.add("d-flex", "flex-row", "justify-content-end", "mb-4");

  const messageContent = document.createElement("div");
  messageContent.classList.add("p-3", "me-3", "border");
  messageContent.style.borderRadius = "15px";
  messageContent.style.backgroundColor = "#fbfbfb";

  const messageText = document.createElement("p");
  messageText.classList.add("small", "mb-0");
  messageText.textContent = message;

  messageContent.appendChild(messageText);
  messageBubble.appendChild(messageContent);

  const avatarImage = document.createElement("img");
  avatarImage.src = `http://localhost:5000/images/${props.user.image_user}`;
  avatarImage.alt = `avatar`;
  avatarImage.style.width = "45px";
  avatarImage.style.height = "100%";

  messageBubble.appendChild(avatarImage);

  return messageBubble;
}



// get the chat container element
const chatContainer = document.getElementById("chat-container");

// scroll to the bottom of the chat container
chatContainer.scrollTop = chatContainer.scrollHeight;

// add an event listener to the text area element
const textArea = document.getElementById("textAreaExample");
textArea.addEventListener("keydown", function (event) {
  // if the enter key is pressed
  if (event.key === "Enter") {
    // prevent default behavior
    event.preventDefault();

    // add the new message to the chat container

    // scroll to the bottom of the chat container
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
          <MDBCard id="chat1" className="full-size"  style={{ borderRadius: "15px" }}>
            <MDBCardHeader
              className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0 "
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              <MDBIcon fas icon="angle-left" />
              <p className="mb-0 fw-bold">{props.user.first_Name}</p>
              <MDBIcon fas icon="times"onClick={closeChat}  />
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
                    Hello and thank you for visiting MDBootstrap. Please click
                    the video below.
                  </p>
                </div>
              </div>

              <div className="d-flex flex-row justify-content-end mb-4">
                <div
                  className="p-3 me-3 border"
                  style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}
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