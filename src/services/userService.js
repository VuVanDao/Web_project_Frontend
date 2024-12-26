import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post(`/api/login`, { email, password });
};
const getAllUser = (userId) => {
  return axios.get(`/api/get-all-users?id=${userId}`);
};
export default { handleLogin, getAllUser };
