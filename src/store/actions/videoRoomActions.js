import { v4 as uuid } from "uuid";
import store from "../store";
import {
  setInRoom,
  setRooms,
} from "../../realtimeCommunication/videoRoomsSlice";
import * as socketConn from "../../socketConnection/socketConn";
import {
  getAccessToLocalStream,
  getPeerId,
  disconnect,
} from "../../realtimeCommunication/webRTCHandler";

export const createVideoRoom = async () => {
  try {
    // get access to local stream
    const stream = await getAccessToLocalStream();
    console.log('Camera is working!');

    const newRoomId = uuid();

    store.dispatch(setInRoom(newRoomId));

    socketConn.createVideoRoom({
      peerId: getPeerId(),
      newRoomId,
    });
  } catch (error) {
    console.error('Error accessing camera:', error);
    // You can show a user-friendly error message here if you'd like
  }
};

export const joinVideoRoom = async (roomId) => {
  // get access to local stream
  const success = await getAccessToLocalStream();

  if (success) {
    store.dispatch(setInRoom(roomId));

    socketConn.joinVideoRoom({
      roomId,
      peerId: getPeerId(),
    });
  }
};

export const videoRoomsListHandler = (videoRooms) => {
  store.dispatch(setRooms(videoRooms));
};

export const leaveVideoRoom = (roomId) => {
  disconnect();
  socketConn.leaveVideoRoom({
    roomId,
  });

  store.dispatch(setInRoom(false));
};
