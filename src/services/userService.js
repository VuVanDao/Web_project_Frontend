import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post(`/api/login`, { email, password });
};
const getAllUser = (userId) => {
  return axios.get(`/api/get-all-users?id=${userId}`);
};
const createNewUser = (data) => {
  return axios.post("/api/create-new-users", data);
};
const updateAUser = (data) => {
  return axios.put("/api/update-a-users", data);
};
const deleteAUser = (userId) => {
  return axios.delete(`/api/delete-a-users?id=${userId}`);
};
const getAllCode = (data) => {
  return axios.get(`/allCode?type=${data}`);
};
const getDoctor = () => {
  return axios.get("/api/get-doctor");
};
export default {
  handleLogin,
  getAllUser,
  createNewUser,
  updateAUser,
  deleteAUser,
  getAllCode,
  getDoctor,
};
