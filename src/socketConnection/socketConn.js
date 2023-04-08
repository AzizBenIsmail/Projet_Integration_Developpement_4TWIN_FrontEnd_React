import io from "socket.io-client"
import { onlineUsersHandler,userDisconnectedHandler } from "../store/usersActions";

let socket= null;
export const connectionWithSocketIOServer=()=>{
    socket= io('http://localhost:5000')
    socket.on('connect', ()=>{
        console.log('connected to the server')
    })
    socket.on('online-users', (usersData)=>{
        onlineUsersHandler(socket.id, usersData)
        console.log(usersData);
    });
  socket.on("user-disconnected", (disconnectedUserSocketId) => {
    userDisconnectedHandler(disconnectedUserSocketId);
  });
}

export const login=(data)=>{
    socket.emit('user-login',data)
}