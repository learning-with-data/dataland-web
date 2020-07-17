import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import apiClient from "../../lib/api";
import * as actionTypes from "../actionsTypes";

// ----------------
// Authentication
// ----------------

function* authenticate(action) {
  let results;
  try {
    if (action.payload.reauthentication === true) {
      results = yield call(apiClient.reAuthenticate);
    } else {
      results = yield call(apiClient.authenticate, {
        username: action.payload.username,
        password: action.payload.password,
        strategy: "local",
      });
    }
    yield put({
      type: actionTypes.AUTHENTICATION_SUCCESS,
      payload: results.user,
    });
  } catch (e) {
    // We don't care about re-authentication failure messages
    if (action.payload.reauthentication !== true) {
      yield put({
        type: actionTypes.AUTHENTICATION_FAILURE,
        payload: e.message,
      });
    } else {
      yield put({ type: actionTypes.AUTHENTICATION_FAILURE, payload: "" });
    }
  }
}

function* logout() {
  yield call(apiClient.logout);
  yield put({ type: actionTypes.AUTHENTICATION_LOGOUT_SUCCEEDED });
}

function* register(action) {
  const usersService = apiClient.service("users");
  try {
    yield usersService.create(action.payload);
    // If registration succeeds, we directly log in user
    yield put({
      type: actionTypes.AUTHENTICATION_REQUESTED,
      payload: {
        username: action.payload.username,
        password: action.payload.password,
      },
    });
  } catch (e) {
    yield put({ type: actionTypes.REGISTRATION_FAILURE, payload: e.message });
  }
}

function* watchAuthenticationRequested() {
  yield takeEvery(actionTypes.AUTHENTICATION_REQUESTED, authenticate);
}

function* watchLogoutRequested() {
  yield takeEvery(actionTypes.AUTHENTICATION_LOGOUT_REQUESTED, logout);
}

function* watchRegistrationRequested() {
  yield takeEvery(actionTypes.REGISTRATION_REQUESTED, register);
}

// --------
// Projects
// --------

// FIXME:
// For some reason yield call(service.find) is not working.
// For now, using yield service.find instead
// Same with create() and patch()

function* loadProjects(action) {
  const projectsService = apiClient.service("projects");
  const projectsPage = yield projectsService.find(action.payload);
  yield put({
    type: actionTypes.PROJECTS_LOAD_SUCCESS,
    payload: projectsPage.data,
  });
}

function* addProject(action) {
  const projectsService = apiClient.service("projects");
  const newProject = yield projectsService.create(action.payload);
  yield put({ type: actionTypes.PROJECT_ADD_SUCCESS, payload: newProject });
}

function* patchProject(action) {
  const projectsService = apiClient.service("projects");
  const patchedProject = yield projectsService.patch(
    action.payload.id,
    action.payload
  );
  yield put({
    type: actionTypes.PROJECT_PATCH_SUCCESS,
    payload: { patchedProject: patchedProject },
  });
}

function* getProject(action) {
  const projectsService = apiClient.service("projects");
  const project = yield projectsService.get(action.payload);

  yield put({
    type: actionTypes.PROJECT_GET_SUCCESS,
    payload: project,
  });
}

function* watchProjectsLoadRequested() {
  yield takeEvery(actionTypes.PROJECTS_LOAD_REQUESTED, loadProjects);
}

function* watchProjectAddRequested() {
  yield takeEvery(actionTypes.PROJECT_ADD_REQUESTED, addProject);
}

function* watchProjectPatchRequested() {
  yield takeEvery(actionTypes.PROJECT_PATCH_REQUESTED, patchProject);
}

function* watchProjectGetRequested() {
  yield takeEvery(actionTypes.PROJECT_GET_REQUESTED, getProject);
}

export default function* root() {
  yield all([
    fork(watchAuthenticationRequested),
    fork(watchLogoutRequested),
    fork(watchRegistrationRequested),
    fork(watchProjectsLoadRequested),
    fork(watchProjectAddRequested),
    fork(watchProjectPatchRequested),
    fork(watchProjectGetRequested),
  ]);
}
