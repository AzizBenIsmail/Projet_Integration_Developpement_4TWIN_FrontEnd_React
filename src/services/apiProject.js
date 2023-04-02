import axios from "axios";

const apiURL = "http://localhost:5000/project";

export async function getProjects(config) {
  return await axios.get(apiURL,config);
}
export async function getProject(id,config) {
  return await axios.get(`${apiURL}/${id}`,config);
}
export async function getProjectuser(id,config) {
  return await axios.get(`${apiURL}/User/${id}`,config);
}
export async function addProject(formData,config) {
  return await axios.post(`${apiURL}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'foo': 'bar'
    },
    ...config
  });
}

export async function updateProject(Projects,id,config) {
  return await axios.put(`${apiURL}/${id}`, Projects,{
  headers: {
    'Content-Type': 'application/json',
    'foo': 'bar'
  },
  ...config
});
}

export async function deleteProject(id,config) {
  return await axios.delete(`${apiURL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'foo': 'bar',
      ...config.headers, // Merge Authorization header from config object
    },
  });
}
