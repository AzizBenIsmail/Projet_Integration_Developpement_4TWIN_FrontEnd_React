import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../MapPage/mapSlice'
import messengerReducer from '../Messenger/messengerSlice'
const store = configureStore({
    reducer : {
        map: mapReducer,
        messenger: messengerReducer,
    },
})

export default store;