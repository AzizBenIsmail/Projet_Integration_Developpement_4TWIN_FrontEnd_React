import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../MapPage/mapSlice'
const store = configureStore({
    reducer : {
        map: mapReducer,
    },
})

export default store;