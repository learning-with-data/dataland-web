import { combineReducers } from "redux";

// Reducers
import authenticationReducer from "./authentication-reducer";
import errorReducer from "./error-reducer";
import projectsReducer from "./project-reducer";

// Combine Reducers
var reducers = combineReducers({
  authenticationState: authenticationReducer,
  errorState: errorReducer,
  projectsState: projectsReducer,
});

export default reducers;
