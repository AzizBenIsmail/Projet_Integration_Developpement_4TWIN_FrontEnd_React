import axios from "axios";

const apiURL = "http://localhost:5000/btype";


export async function getBtype(config) {
  return await axios.get(apiURL,config);
}

export async function addBType(btypeData, config) {
  try {
    const response = await axios.post(`${apiURL}/btype/add`, btypeData, config);
    return response.data.btype;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteBType(id, config) {
  try {
    const response = await axios.delete(`${apiURL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

