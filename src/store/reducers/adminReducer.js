import actionTypes from "../actions/actionTypes";

const initialState = {
  genderArr: [],
  positionArr: [],
  roleArr: [],
  isLoadingGender: false,
  isLoadingPosition: false,
  isLoadingRole: false,
  users: [],
  listDoctor: [],
  AllDoctor: [],
  AllSchedule: [],
};

const adminReducer = (state = initialState, action) => {
  let copyState = { ...state };

  switch (action.type) {
    //gender
    case actionTypes.FETCH_GENDER_START:
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      copyState.isLoadingGender = false;
      copyState.genderArr = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      copyState.isLoadingGender = false;
      copyState.genderArr = [];
      return {
        ...copyState,
      };
    //position
    case actionTypes.FETCH_POSITION_START:
      copyState.isLoadingPosition = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      copyState.positionArr = action.data;
      copyState.isLoadingPosition = false;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      copyState.isLoadingPosition = false;
      copyState.positionArr = [];
      return {
        ...copyState,
      };
    //role
    case actionTypes.FETCH_ROLE_START:
      copyState.isLoadingRole = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      copyState.roleArr = action.data;
      copyState.isLoadingRole = false;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      copyState.isLoadingRole = false;
      copyState.roleArr = [];
      return {
        ...copyState,
      };
    //user
    case actionTypes.GET_USER_REDUX_SUCCESS:
      copyState.users = action.data;
      return {
        ...copyState,
      };
    case actionTypes.GET_USER_REDUX_FAIL:
      return {
        ...copyState,
      };
    //listDoctor
    case actionTypes.GET_LIST_DOCTOR_REDUX_SUCCESS:
      copyState.listDoctor = action.data;
      return {
        ...copyState,
      };
    case actionTypes.GET_LIST_DOCTOR_REDUX_FAIL:
      copyState.listDoctor = [];
      return {
        ...copyState,
      };
    case actionTypes.GET_ALL_LIST_DOCTOR_REDUX_SUCCESS:
      copyState.AllDoctor = action.data;
      return {
        ...copyState,
      };
    case actionTypes.GET_ALL_LIST_DOCTOR_REDUX_FAIL:
      copyState.AllDoctor = [];
      return {
        ...copyState,
      };
    //time
    case actionTypes.GET_ALL_CODE_SCHEDULE_TIME_SUCCESS:
      copyState.AllSchedule = action.data;
      return {
        ...copyState,
      };
    case actionTypes.GET_ALL_CODE_SCHEDULE_TIME_FAIL:
      copyState.AllSchedule = [];
      return {
        ...copyState,
      };

    default:
      return state;
  }
};

export default adminReducer;
