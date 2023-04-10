import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../MapPage/mapSlice'
import messengerReducer from '../Messenger/messengerSlice'
import videoRoomsReducer from "../realtimeCommunication/videoRoomsSlice";
const store = configureStore({
    reducer: {
      map: mapReducer,
      messenger: messengerReducer,
      videoRooms: videoRoomsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: [
            "videoRooms/setLocalStream",
            "videoRooms/setRemoteStream",
          ],
          ignoredPaths: ["videoRooms.localStream", "videoRooms.remoteStream"],
        },
      }),
  });

export default store;