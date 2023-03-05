import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001/products";
const apiURL = "http://localhost:3001/users";
export async function getUsers(){
    return await axios.get(apiURL);
}
export async function addUser(User){
    return await axios.post(apiURL,User);
}
export async function updateUser(id,User){
    return await axios.put('${apiURL}/${id}',User);
}
export async function deleteUser(id){
    return await axios.delete('${apiURL}/${id}');
}