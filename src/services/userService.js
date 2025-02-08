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
let getAllSpecialty = () => {
  return axios.get("/api/get-all-specialty");
};
const GetAllDoctorBySpecialty = (id) => {
  return axios.get(`/api/get-all-doctor-by-specialty?id=${id}`);
};
const GetDetailSpecialty = (id) => {
  return axios.get(`/api/get-detail-specialty?id=${id}`);
};
const GetDoctorByProvince = (specialtyId, provinceId, actionId) => {
  return axios.get(
    `/api/get-doctor-by-province?specialtyId=${specialtyId}&provinceId=${provinceId}&actionId=${actionId}`
  );
};
let createClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};
let GetAllClinic = () => {
  return axios.get("/api/get-all-clinic");
};
const GetAllDoctorByClinic = (id) => {
  return axios.get(`/api/get-all-doctor-by-clinic?id=${id}`);
};
const GetDetailClinic = (id) => {
  return axios.get(`/api/get-detail-clinic?id=${id}`);
};
const PatientBooked = (doctorId, date) => {
  return axios.get(`/api/get-patient-booked?doctorId=${doctorId}&date=${date}`);
};
let SendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};
let createHandBook = (data) => {
  return axios.post("/api/create-new-handBook", data);
};
let GetAllHandBook = () => {
  return axios.get("/api/get-all-handBook");
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
  getAllSpecialty,
  GetAllDoctorBySpecialty,
  GetDetailSpecialty,
  GetDoctorByProvince,
  createClinic,
  GetAllClinic,
  GetAllDoctorByClinic,
  GetDetailClinic,
  PatientBooked,
  SendRemedy,
  createHandBook,
  GetAllHandBook,
};
