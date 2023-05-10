import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import Marker from "./Marker";

import "./MapPage.css";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import Messenger from "Messenger/Messenger";
import VideoRooms from "VideoRooms/VideoRooms";
import Cookies from "js-cookie";
import DemoNavbar from "../components/Navbars/DemoNavbar";
import axios from "axios";
const MapPage = () => {
  const myLocation = useSelector((state) => state.map.myLocation);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const cardChosenOption = useSelector((state) => state.map.cardChosenOption);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5000/chat/messages/");
        const data = response.data;
        const username = JSON.parse(Cookies.get("user")).user.username;
        const users = Object.keys(data.messages).filter((user) => user !== username);
        setUsers(users);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("No response:", error.request);
        } else {
          console.error("Error:", error.message);
        }
        setUsers([]);
      }
    }
    
    fetchUsers();
    const timer = setInterval(fetchUsers, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const userId = JSON.parse(Cookies.get("user")).user._id;

    fetch(`http://localhost:5000/chat/PA/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const latestPA = data[data.length - 1];
        if (latestPA) {
          setMessage(latestPA.message);
          setAnswer(latestPA.answer);
        }
      })
      .catch((error) => {
        console.error("Error retrieving PAs:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userId = JSON.parse(Cookies.get("user")).user._id;

    fetch("http://localhost:5000/chat/pa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        message,
        answer,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("PA created:", data);
        // do something with the new PA data
      })
      .catch((error) => {
        console.error("Error creating PA:", error);
      });
  };

  const [color, setColor] = useState("");

  const handleColorChange = (newColor) => {


    setColor(newColor);
  };

  const handleColor = (event) => {
    const userId = JSON.parse(Cookies.get("user")).user._id;
    const userData = JSON.parse(Cookies.get("user"));
    const updatedUserData = { ...userData, user: { ...userData.user, favColor: color } };
    Cookies.set("user", JSON.stringify(updatedUserData));
    event.preventDefault();
    axios
      .post("http://localhost:5000/chat/color/", {
        userId: userId,
        newColor: color,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userCookie = Cookies.get("user");
  const u = JSON.parse(Cookies.get("user"));
  const email = u.user.email;
  const im = u.user.im;

  const defaultMapProps = {
    center: {
      lat:
        myLocation && myLocation.lat
          ? myLocation.lat
          : navigator.geolocation.getCurrentPosition(
              (position) => position.coords.latitude
            ),
      lng:
        myLocation && myLocation.log
          ? myLocation.log
          : navigator.geolocation.getCurrentPosition(
              (position) => position.coords.longitude
            ),
    },
    zoom: 8,
  };
  return (
    <>
      <div className="full_map_page">
        <div className="left_chat">
          <div className="circle-container">
            <img
              src={`http://localhost:5000/images/${im}`}
              alt="Your Image"
              className="circle-image"
            />
          </div>

          <div className="icon-container">
            <h3> {email}</h3>
            <a href={`/profile-page`}>
              <i class="fas fa-user fa-lg"></i>
            </a>
          </div>

          <div className="collapse-label">
            <input type="checkbox" id="toggle-3" className="collapse-input" />
            <label htmlFor="toggle-3" className="collapse-trigger">
              Preanswered question
            </label>
            <div className="collapse-content">
              <form onSubmit={handleSubmit}>
                <p>Your question:</p>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your question here"
                />
                <p>Your answer:</p>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Write your answer here"
                />

                <input
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#5E72E4",
                    color: "#fff",
                    fontSize: "16px",
                    height: "40px",
                    marginTop: "20px",
                  }}
                  value="Save"
                />
              </form>
            </div>
          </div>

          <div className="collapse-label">
            <input type="checkbox" id="toggle-4" className="collapse-input" />
            <label htmlFor="toggle-4" className="collapse-trigger">
              Chat's color
            </label>
            <div className="collapse-content">
              <div className="color-circles">
                <div
                  className="color-circle red"
                  onClick={() => handleColorChange("#FFB6C1")}
                ></div>
                <div
                  className="color-circle green"
                  onClick={() => handleColorChange("#BDEA09")}
                ></div>
                <div
                  className="color-circle blue"
                  onClick={() => handleColorChange("#0084FF")}
                ></div>
                <div
                  className="color-circle orange"
                  onClick={() => handleColorChange("#FF7E02")}
                ></div>
                <div
                  className="color-circle purple"
                  onClick={() => handleColorChange("#800080")}
                ></div>
              </div>
              <form onSubmit={handleColor}>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#5E72E4",
                    color: "#fff",
                    fontSize: "16px",
                    height: "40px",
                    marginTop: "20px",
                  }}
                >
                  Save
                </button>
              </form>
            </div>
          </div>

          <div className="blackbox">
            {" "}
            <div class="user-list">
  <h2>User Sentiment Analysis Rankings</h2>
  <p>
    Ranking users based on their positive sentiment scores can influence
    their behavior, making them more likely to invest or recruit.
  </p>
  {users && users.length > 0 ? (
    <div>
      <h3>User List:</h3>
      <ol>
        {users.map((user, index) => (
          <li key={user}>
            {user}
          </li>
        ))}
      </ol>
    </div>
  ) : (
    <p>
      <strong>There are no users yet.</strong>
    </p>
  )}
</div>

          </div>
        </div>

        <div className="map_page_container">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyD8EsP6LrDD5wsHHLPaN6SP_22cvKXTNE0",
            }}
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
          <VideoRooms />
        </div>
      </div>
    </>
  );
};

export default MapPage;
