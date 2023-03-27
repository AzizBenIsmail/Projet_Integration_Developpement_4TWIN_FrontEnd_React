import axios from "axios";

const apiURL = "http://localhost:5000/project";

export async function getProjects() {
  return await axios.get(apiURL);
}
export async function getProject(id) {
  return await axios.get(`${apiURL}/${id}`);
}
export async function addProject(formData, idUser) {
  return await axios.post(`${apiURL}/${idUser}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function updateProject(id, Projects) {
  return await axios.put(`${apiURL}/${id}`, Projects);
}

export async function deleteProject(id) {
  return await axios.delete(`${apiURL}/${id}`);
}
