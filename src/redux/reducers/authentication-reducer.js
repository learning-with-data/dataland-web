import {
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_LOGOUT_SUCCEEDED,
  AUTHENTICATION_SUCCESS,
  REGISTRATION_FAILURE,
} from "../actionTypes";

const initialState = {
  authenticating: true,
  authenticated: false,
  user: {},
  authErrorMessage: "",
  registrationErrorMessage: "",
};

function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_FAILURE:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        user: {},
        authErrorMessage: action.payload,
      };
    case AUTHENTICATION_LOGOUT_SUCCEEDED:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        user: {},
        authErrorMessage: "",
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        authenticating: false,
        authenticated: true,
        user: action.payload,
        authErrorMessage: "",
      };
    case REGISTRATION_FAILURE:
      return {
        ...state,
        registrationErrorMessage: action.payload,
      };
    default:
      return state;
  }
}

export default authenticationReducer;
