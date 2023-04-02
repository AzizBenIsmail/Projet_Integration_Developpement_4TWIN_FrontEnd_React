import axios from "axios";

const apiURL = "http://localhost:5000/Invest";

export async function getInvests() {
  return await axios.get(apiURL);
}
export async function getInvestUser(id) {
  return await axios.get(`${apiURL}/${id}`);
}
export async function addInvest(Invest, idUser,idProject) {
  return await axios.post(`${apiURL}/${idUser}/${idProject}`, Invest);
}

// export async function updateProject(Projects,id) {
//   return await axios.put(`${apiURL}/${id}`, Projects);
// }

export async function deleteInvest(id) {
  return await axios.delete(`${apiURL}/${id}`);
}
