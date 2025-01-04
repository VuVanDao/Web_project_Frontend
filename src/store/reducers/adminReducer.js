import actionTypes from "../actions/actionTypes";

const initialState = {
  genderArr: [],
  positionArr: [],
  roleArr: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      console.log("test reduxxx", action);

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = { ...state };
      copyState.genderArr = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      console.log("test reduxxx", action);

      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
