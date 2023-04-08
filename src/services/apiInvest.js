import axios from "axios";

const apiURL = "http://localhost:5000/Invest";

export async function getInvests(config) {
  return await axios.get(apiURL,config);
}
export async function getInvestUser(id,config) {
  return await axios.get(`${apiURL}/${id}`,config);
}
export async function getlisteInverstors(id,config) {
  return await axios.get(`${apiURL}/listeInverstors/${id}`,config);
}
export async function addInvest(Invest, idUser,idProject,config) {
  return await axios.post(`${apiURL}/${idUser}/${idProject}`, Invest, {
    headers: {
      'Content-Type': 'application/json',
      'foo': 'bar'
    },
    ...config
  });
}
export async function deleteInvest(id,config) {
  return await axios.delete(`${apiURL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'foo': 'bar',
      ...config.headers, // Merge Authorization header from config object
    },
  });
}
