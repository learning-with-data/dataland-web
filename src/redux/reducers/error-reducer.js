import { ERROR_DISMISSED, ERROR_OCCURRED } from "../actionsTypes";

const initialState = {
  errors: [],
};

function errorReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_OCCURRED:
      var errorObj = {
        id: Math.random().toString(36).slice(2),
        error: action.payload,
        message: action.payload.message,
        created: Date.now(),
      };
      return { ...state, errors: state.errors.concat(errorObj) };
    case ERROR_DISMISSED:
      var error_id = action.payload;
      return {
        ...state,
        errors: state.errors.filter((err) => err.id !== error_id),
      };
    default:
      return state;
  }
}

export default errorReducer;
