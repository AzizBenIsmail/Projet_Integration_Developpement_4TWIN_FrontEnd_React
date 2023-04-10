import React from "react";

const RightMessage = ({ content }) => {
  return <p className="chatbox_message_right">{content}</p>;
};

const LeftMessage = ({ content }) => {
  return <p className="chatbox_message_left">{content}</p>;
};

const SingleMessage = ({ content, myMessage }) => {
  return (
    <div
      className="chatbox_message_wrapper"
      style={
        myMessage
          ? { justifyContent: "flex-end" }
          : { justifyContent: "flex-start" }
      }
    >
      {myMessage ? (
        <RightMessage content={content} />
      ) : (
        <LeftMessage content={content} />
      )}
    </div>
  );
};

export default SingleMessage;
