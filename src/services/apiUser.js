import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001/products";
const apiURL = "http://localhost:5000/users";

export async function getUsers(){
    return await axios.get(apiURL);
}
export async function getUser(id){
  return await axios.get(`${apiURL}/${id}`);
}
export async function addUser(formData){    
      return await axios.post(apiURL,formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
}

export async function updateUser(id,User){
    return await axios.put(`${apiURL}/${id}`,User);
}

export async function deleteUser(id){
    return await axios.delete(`${apiURL}/${id}`);
}

export async function LoginUser(User) {
  console.log("befor LoginUser " + User);
  return await axios.post(`${apiURL}/login`,User)
}