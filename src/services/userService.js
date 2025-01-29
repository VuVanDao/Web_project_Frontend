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
const getAllDoctor = () => {
  return axios.get("/api/get-all-doctor");
};
const saveInfoDoctor = (data) => {
  return axios.post("/api/save-info-doctor", data);
};
const getDetailDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor?id=${id}`);
};
const saveSchedule = (data) => {
  return axios.post("/api/save-schedule", data);
};
const getAllScheduleByDay = (doctorId, date) => {
  return axios.get(
    `/api/get-all-schedule-by-day?doctorId=${doctorId}&date=${date}`
  );
};
let booking = (data) => {
  return axios.post("/api/patient-booking", data);
};
let verifyToken = (token, doctorId) => {
  return axios.post("/api/verify-booking", { token, doctorId });
};
let createSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};
export default {
  handleLogin,
  getAllUser,
  createNewUser,
  updateAUser,
  deleteAUser,
  getAllCode,
  getDoctor,
  getAllDoctor,
  saveInfoDoctor,
  getDetailDoctor,
  saveSchedule,
  getAllScheduleByDay,
  booking,
  verifyToken,
  createSpecialty,
};
