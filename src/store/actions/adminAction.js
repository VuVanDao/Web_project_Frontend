import actionTypes from "./actionTypes";
import userService from "../../services/userService";
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
      dispatch({
        type: actionTypes.CREATE_USER_REDUX_START,
      });
      let res = await userService.createNewUser(data);
      if (res && res.errCode === 0) {
        dispatch(createUserReduxSuccess(res.data));
      } else {
        dispatch(createUserReduxFail());
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
