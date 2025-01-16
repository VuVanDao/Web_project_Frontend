const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //admin
  //gender
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAIL: "FETCH_GENDER_FAIL",
  //position
  FETCH_POSITION_START: "FETCH_POSITION_START",
  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAIL: "FETCH_POSITION_FAIL",
  //role
  FETCH_ROLE_START: "FETCH_ROLE_START",
  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAIL: "FETCH_ROLE_FAIL",
  //create user
  CREATE_USER_REDUX_START: "CREATE_USER_REDUX_START",
  CREATE_USER_REDUX_SUCCESS: "CREATE_USER_REDUX_SUCCESS",
  CREATE_USER_REDUX_FAIL: "CREATE_USER_REDUX_FAIL",
  //get user
  GET_USER_REDUX_SUCCESS: "GET_USER_REDUX_SUCCESS",
  GET_USER_REDUX_FAIL: "GET_USER_REDUX_FAIL",
  //delete user
  DELETE_USER_REDUX_SUCCESS: "DELETE_USER_REDUX_SUCCESS",
  DELETE_USER_REDUX_FAIL: "DELETE_USER_REDUX_FAIL",
  //update user
  UPDATE_USER_REDUX_SUCCESS: "UPDATE_USER_REDUX_SUCCESS",
  UPDATE_USER_REDUX_FAIL: "UPDATE_USER_REDUX_FAIL",
  //getListDoctor
  GET_LIST_DOCTOR_REDUX_SUCCESS: "GET_LIST_DOCTOR_REDUX_SUCCESS",
  GET_LIST_DOCTOR_REDUX_FAIL: "GET_LIST_DOCTOR_REDUX_FAIL",
  GET_ALL_LIST_DOCTOR_REDUX_SUCCESS: "GET_ALL_LIST_DOCTOR_REDUX_SUCCESS",
  GET_ALL_LIST_DOCTOR_REDUX_FAIL: "GET_ALL_LIST_DOCTOR_REDUX_FAIL",
  SAVE_INFO_DOCTOR_SUCCESS: "SAVE_INFO_DOCTOR_SUCCESS",
  SAVE_INFO_DOCTOR_FAIL: "SAVE_INFO_DOCTOR_FAIL",
  //datePicker
  GET_ALL_CODE_SCHEDULE_TIME_SUCCESS: "GET_ALL_CODE_SCHEDULE_TIME_SUCCESS",
  GET_ALL_CODE_SCHEDULE_TIME_FAIL: "GET_ALL_CODE_SCHEDULE_TIME_FAIL",
  //price
  FETCH_PRICE_START: "FETCH_PRICE_START",
  FETCH_PRICE_SUCCESS: "FETCH_PRICE_SUCCESS",
  FETCH_PRICE_FAIL: "FETCH_PRICE_FAIL",
  //payment
  FETCH_PAYMENT_START: "FETCH_PAYMENT_START",
  FETCH_PAYMENT_SUCCESS: "FETCH_PAYMENT_SUCCESS",
  FETCH_PAYMENT_FAIL: "FETCH_PAYMENT_FAIL",
  //province
  FETCH_PROVINCE_START: "FETCH_PROVINCE_START",
  FETCH_PROVINCE_SUCCESS: "FETCH_PROVINCE_SUCCESS",
  FETCH_PROVINCE_FAIL: "FETCH_PROVINCE_FAIL",
});

export default actionTypes;
