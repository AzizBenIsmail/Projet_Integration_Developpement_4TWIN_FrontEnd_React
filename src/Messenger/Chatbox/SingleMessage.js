import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

const RightMessage = ({ content, favoriteColor }) => {
  return <p className="chatbox_message_right" style={{ backgroundColor: favoriteColor }}>{content}</p>;
};

const LeftMessage = ({ content }) => {
  return <p className="chatbox_message_left">{content}</p>;
};

const SingleMessage = ({ content, myMessage, favoriteColor }) => {
  const [color, setColor] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const ff = JSON.parse(Cookies.get("user")).user.favColor;
      setColor(ff);
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [favoriteColor]);

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
        <RightMessage content={content} favoriteColor={color} />
      ) : (
        <LeftMessage content={content} />
      )}
    </div>
  );
};

export default SingleMessage;
