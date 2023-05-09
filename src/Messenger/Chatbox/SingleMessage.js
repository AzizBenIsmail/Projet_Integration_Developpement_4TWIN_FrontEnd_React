import React from "react";

const RightMessage = ({ content, favoriteColor }) => {
  return <p className="chatbox_message_right" style={{ backgroundColor: favoriteColor }}>{content}</p>;
};


const LeftMessage = ({ content }) => {
  return <p className="chatbox_message_left">{content}</p>;
};

const SingleMessage = ({ content, myMessage, favoriteColor}) => {


  return (
    <div
      className="chatbox_message_wrapper"
      style={
        myMessage
          ? { justifyContent: "flex-end"}
          : { justifyContent: "flex-start" }
      }
    >
      {myMessage ? (
        <RightMessage content={content} favoriteColor={favoriteColor} />
      ) : (
        <LeftMessage content={content} />
      )}
    </div>
  );
};

export default SingleMessage;
