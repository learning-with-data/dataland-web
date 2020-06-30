import { combineReducers } from "redux";

// Reducers
import authenticationReducer from "./authentication-reducer";
import projectsReducer from "./project-reducer";

// Combine Reducers
var reducers = combineReducers({
  authenticationState: authenticationReducer,
  projectsState: projectsReducer,
});

export default reducers;
