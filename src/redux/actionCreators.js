import * as actionTypes from "./actionTypes";

export const create_project = () => ({
  type: actionTypes.PROJECT_ADD_REQUESTED,
  payload: {
    title: "Untitled project",
    description: "",
    projectThumbnailBlob: null,
  },
});

export const request_logout = () => ({ type: actionTypes.AUTHENTICATION_LOGOUT_REQUESTED });

export const unload_active_project = () => ({ type: actionTypes.ACTIVE_PROJECT_UNLOADED });

export const request_project_get = (pid) => ({
  type: actionTypes.PROJECT_GET_REQUESTED,
  payload: pid,
});

export const request_project_patch = (project) => ({
  type: actionTypes.PROJECT_PATCH_REQUESTED,
  payload: project,
});

export const request_projects = () => ({
  type: actionTypes.PROJECTS_LOAD_REQUESTED,
  payload: {
    query: {
      $select: [
        "id",
        "title",
        "description",
        "updatedAt",
        "projectThumbnailBlob",
      ],
      $sort: { createdAt: -1 },
      $limit: 25,
    },
  },
});

export const error_dismissed = (error_id) => ({
  type: actionTypes.ERROR_DISMISSED,
  payload: error_id,
});

export const request_authentication = (username, password) => ({
  type: actionTypes.AUTHENTICATION_REQUESTED,
  payload: { username: username, password: password },
});

export const request_reauthentication = () => ({
  type: actionTypes.AUTHENTICATION_REQUESTED,
  payload: { reauthentication: true },
});

export const request_registration = (
  invitationCode,
  username,
  email,
  password
) => ({
  type: actionTypes.REGISTRATION_REQUESTED,
  payload: { invitationCode, username, email, password },
});
