import { setOnlineUsers ,removeDisconnectedUser} from "../MapPage/mapSlice"
import store from "./store"

export const onlineUsersHandler=(socketId,usersData)=>{
    store.dispatch(setOnlineUsers(usersData.map(user=>{
        if(user.socketId===socketId){
            user.myself=true;
        }
        return user;
    })))
}

export const userDisconnectedHandler=(discoonectedUserSocketId)=>{
    store.dispatch(removeDisconnectedUser(discoonectedUserSocketId))
}