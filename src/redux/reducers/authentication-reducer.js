import {
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_LOGOUT_SUCCEEDED,
  AUTHENTICATION_SUCCESS,
} from "../actionsTypes";

const initialState = {
  authenticating: true,
  authenticated: false,
  user: {},
  authErrorMessage: "",
};

function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_FAILURE:
      return {
        authenticating: false,
        authenticated: false,
        user: {},
        authErrorMessage: action.payload,
      };
    case AUTHENTICATION_LOGOUT_SUCCEEDED:
      return {
        authenticating: false,
        authenticated: false,
        user: {},
        authErrorMessage: "",
      };
    case AUTHENTICATION_SUCCESS:
      return {
        authenticating: false,
        authenticated: true,
        user: action.payload,
        authErrorMessage: "",
      };
    default:
      return state;
  }
}

export default authenticationReducer;
