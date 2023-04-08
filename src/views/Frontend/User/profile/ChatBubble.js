import React from "react";

function createMessageBubble(props, avatar, message) {
  const messageBubble = document.createElement("div");
  messageBubble.classList.add(
    "d-flex",
    "flex-row",
    "justify-content-end",
    "mb-4"
  );

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

export default createMessageBubble;
