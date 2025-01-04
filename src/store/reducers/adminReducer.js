import actionTypes from "../actions/actionTypes";

const initialState = {
  genderArr: [],
  positionArr: [],
  roleArr: [],
};

const adminReducer = (state = initialState, action) => {
  let copyState = { ...state };

  switch (action.type) {
    //gender
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      copyState.genderArr = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      return {
        ...state,
      };
    //position
    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      copyState.positionArr = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      return {
        ...state,
      };
    //role
    case actionTypes.FETCH_ROLE_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      copyState.roleArr = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
