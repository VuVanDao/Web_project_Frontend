import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import { toast } from "react-toastify";
//start doing end
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await userService.getAllCode("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (error) {
      dispatch(fetchGenderFail());
      console.log("error", error);
    }
  };
};
export const fetchGenderSuccess = (gender) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: gender,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_POSITION_START,
      });
      let res = await userService.getAllCode("position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (error) {
      dispatch(fetchGenderFail());
      console.log("error", error);
    }
  };
};
export const fetchPositionSuccess = (position) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: position,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_ROLE_START,
      });
      let res = await userService.getAllCode("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleSuccess());
      }
    } catch (error) {
      dispatch(fetchGenderFail());
      console.log("error", error);
    }
  };
};
export const fetchRoleSuccess = (role) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: role,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});
//user
export const createUserReduxStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.createNewUser(data);
      if (res && res.errCode === 0) {
        dispatch(createUserReduxSuccess(res.data));
        dispatch(getUserReduxStart("ALL"));
        toast.success("create new user success");
      } else {
        dispatch(createUserReduxFail());
        toast.error("create new user is not complete");
      }
    } catch (error) {
      dispatch(createUserReduxFail());
      console.log("error", error);
    }
  };
};
export const createUserReduxSuccess = (data) => ({
  type: actionTypes.CREATE_USER_REDUX_SUCCESS,
  data,
});
export const createUserReduxFail = () => ({
  type: actionTypes.CREATE_USER_REDUX_FAIL,
});
export const getUserReduxStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllUser(data);
      if (res && res.errCode === 0) {
        let listUserReverse = res.userData.reverse();
        dispatch(getUserReduxSuccess(listUserReverse));
      } else {
        dispatch(getUserReduxFail());
      }
    } catch (error) {
      dispatch(getUserReduxFail());
      console.log("error", error);
    }
  };
};
export const getUserReduxSuccess = (data) => ({
  type: actionTypes.GET_USER_REDUX_SUCCESS,
  data,
});
export const getUserReduxFail = () => ({
  type: actionTypes.GET_USER_REDUX_FAIL,
});
export const deleteUserReduxStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.deleteAUser(id);
      if (res && res.errCode === 0) {
        dispatch(deleteUserReduxSuccess());
        dispatch(getUserReduxStart("ALL"));
        toast.success("delete user successful");
      } else {
        dispatch(deleteUserReduxFail());
        toast.error("can not delete this user");
      }
    } catch (error) {
      dispatch(deleteUserReduxFail());
      console.log("error", error);
    }
  };
};
export const deleteUserReduxSuccess = () => ({
  type: actionTypes.DELETE_USER_REDUX_SUCCESS,
});
export const deleteUserReduxFail = () => ({
  type: actionTypes.DELETE_USER_REDUX_FAIL,
});
export const updateUserReduxStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.updateAUser(data);
      if (res && res.errCode === 0) {
        dispatch(updateUserReduxSuccess(res.data));
        dispatch(getUserReduxStart("ALL"));
        toast.success("update new user success");
      } else {
        dispatch(updateUserReduxFail());
        toast.error("update new user is not complete");
      }
    } catch (error) {
      dispatch(updateUserReduxFail());
      console.log("error", error);
    }
  };
};
export const updateUserReduxSuccess = (data) => ({
  type: actionTypes.UPDATE_USER_REDUX_SUCCESS,
  data,
});
export const updateUserReduxFail = () => ({
  type: actionTypes.UPDATE_USER_REDUX_FAIL,
});
export const getListDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getDoctor();
      if (res && res.errCode === 0) {
        dispatch(getListDoctorSuccess(res.listDoctor));
      } else {
        dispatch(getListDoctorFail());
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const getListDoctorSuccess = (data) => ({
  type: actionTypes.GET_LIST_DOCTOR_REDUX_SUCCESS,
  data,
});
export const getListDoctorFail = () => ({
  type: actionTypes.GET_LIST_DOCTOR_REDUX_FAIL,
});
export const getAllListDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllDoctor();
      if (res && res.errCode === 0) {
        dispatch(getAllListDoctorSuccess(res.listDoctor));
      } else {
        dispatch(getAllListDoctorFail());
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const getAllListDoctorSuccess = (data) => ({
  type: actionTypes.GET_ALL_LIST_DOCTOR_REDUX_SUCCESS,
  data,
});
export const getAllListDoctorFail = () => ({
  type: actionTypes.GET_ALL_LIST_DOCTOR_REDUX_FAIL,
});
export const saveInfoDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.saveInfoDoctor(data);
      console.log(">>>", res);
      if (res && res.errCode === 0) {
        dispatch(saveInfoDoctorSuccess());
        toast.success(res.errMessage);
      } else {
        toast.error("not success");
        dispatch(saveInfoDoctorFail());
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const saveInfoDoctorSuccess = () => ({
  type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
});
export const saveInfoDoctorFail = () => ({
  type: actionTypes.SAVE_INFO_DOCTOR_FAIL,
});
export const fetchAllSchedule = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllCode("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_ALL_CODE_SCHEDULE_TIME_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_ALL_CODE_SCHEDULE_TIME_FAIL,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const fetchPriceStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_PRICE_START,
      });
      let res = await userService.getAllCode("price");
      if (res && res.errCode === 0) {
        dispatch(fetchPriceSuccess(res.data));
      } else {
        dispatch(fetchPriceFail());
      }
    } catch (error) {
      dispatch(fetchPriceFail());
      console.log("error", error);
    }
  };
};
export const fetchPriceSuccess = (price) => ({
  type: actionTypes.FETCH_PRICE_SUCCESS,
  data: price,
});
export const fetchPriceFail = () => ({
  type: actionTypes.FETCH_PRICE_FAIL,
});
export const fetchPaymentStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_PAYMENT_START,
      });
      let res = await userService.getAllCode("payment");
      if (res && res.errCode === 0) {
        dispatch(fetchPaymentSuccess(res.data));
      } else {
        dispatch(fetchPaymentFail());
      }
    } catch (error) {
      dispatch(fetchPaymentFail());
      console.log("error", error);
    }
  };
};
export const fetchPaymentSuccess = (payment) => ({
  type: actionTypes.FETCH_PAYMENT_SUCCESS,
  data: payment,
});
export const fetchPaymentFail = () => ({
  type: actionTypes.FETCH_PAYMENT_FAIL,
});
export const fetchProvinceStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_PROVINCE_START,
      });
      let res = await userService.getAllCode("province");
      if (res && res.errCode === 0) {
        dispatch(fetchProvinceSuccess(res.data));
      } else {
        dispatch(fetchProvinceFail());
      }
    } catch (error) {
      dispatch(fetchProvinceFail());
      console.log("error", error);
    }
  };
};
export const fetchProvinceSuccess = (province) => ({
  type: actionTypes.FETCH_PROVINCE_SUCCESS,
  data: province,
});
export const fetchProvinceFail = () => ({
  type: actionTypes.FETCH_PROVINCE_FAIL,
});
export const fetchSpecialtyStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_SPECIALTY_START,
      });
      let res = await userService.getAllSpecialty();
      if (res && res.errCode === 0) {
        dispatch(fetchSpecialtySuccess(res.data));
      } else {
        dispatch(fetchSpecialtyFail());
      }
    } catch (error) {
      dispatch(fetchSpecialtyFail());
      console.log("error", error);
    }
  };
};
export const fetchSpecialtySuccess = (specialty) => ({
  type: actionTypes.FETCH_SPECIALTY_SUCCESS,
  data: specialty,
});
export const fetchSpecialtyFail = () => ({
  type: actionTypes.FETCH_SPECIALTY_FAIL,
});
