import axios from "axios";

const apiURL = "http://localhost:5000/badges";


export async function getBadge(username,config) {
  return await axios.get(`${apiURL}/${username}`,config);
}

export async function getTBadge(username,config) {
  return await axios.get(`${apiURL}/${username}/t`,config);
}

export async function getFBadge(username,config) {
  return await axios.get(`${apiURL}/${username}/f`,config);
}


export async function getFBadges(config) {
  return await axios.get(`${apiURL}/find/false`,config);
}


export async function addBadge(badgeData, config) {
  try {
    const response = await axios.post(`${apiURL}/add`, badgeData, config);
    return response.data.badge;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteBadge(id, config) {
  try {
    const response = await axios.delete(`${apiURL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function updateBadge(id,config) {
  return await axios.put(`${apiURL}/${id}/update`, config);
}



/*
export async function getBadges(config) {
  return await axios.get(apiURL,config);
}

export async function getUserAuth(id,config) {
  return await axios.get(`${apiURL}/getUser`,config);
}

export async function addUser(formData, config) {
  return await axios.post(apiURL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'foo': 'bar'
    },
    ...config
  });
}



export async function deleteUser(id,config) {
  return await axios.delete(`${apiURL}/${id}`,config);
}

export async function LoginUser(User) {
  return await axios.post(`${apiURL}/login`, User);
}

export async function register(formData) {
  return await axios.post(`${apiURL}/register`, formData ,{
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function forgotpwd(User) {
  return await axios.post(`${apiURL}/forgotpwd`, User.email);
}
*/