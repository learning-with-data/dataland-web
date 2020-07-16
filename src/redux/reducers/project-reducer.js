import isEmpty from "lodash/isEmpty";

import {
  PROJECT_ADD_SUCCESS,
  PROJECTS_LOAD_SUCCESS,
  PROJECT_PATCH_SUCCESS,
  PROJECT_GET_SUCCESS,
  ACTIVE_PROJECT_UNLOADED,
} from "../actionsTypes";

const initialState = {
  projects: [],
  activeProject: {},
  activeProjectSaveTimestamp: 0,
};


function updateProjectInProjects(projects, patchedProject) {
  return projects.map((project) => {
    if (project.id !== patchedProject.id) {
      return project;
    }

    return {
      ...project,
      ...patchedProject,
    };
  });
}

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECTS_LOAD_SUCCESS:
      return {
        ...state,
        projects: action.payload,
      };
    case PROJECT_ADD_SUCCESS:
      return {
        ...state,
        projects: [action.payload].concat(state.projects),
      };
    case PROJECT_PATCH_SUCCESS:
      return {
        ...state,
        projects: updateProjectInProjects(
          state.projects,
          action.payload.patchedProject
        ),
        activeProjectSaveTimestamp: Date.now(),
        activeProject:
          isEmpty(state.activeProject) ? {} : action.payload.patchedProject,
      };
    case PROJECT_GET_SUCCESS:
      return {
        ...state,
        activeProject: action.payload,
      };
    case ACTIVE_PROJECT_UNLOADED:
      return {
        ...state,
        activeProject: {},
      };
    default:
      return state;
  }
}

export default projectsReducer;
