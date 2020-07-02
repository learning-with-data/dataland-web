import React, { Component } from "react";

import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import Gui from "dataland-gui";
import "dataland-gui/dist/dataland-gui.css";

import BasePage from "../BasePage";
import LoadingPage from "../LoadingPage";
import {
  ACTIVE_PROJECT_UNLOADED,
  PROJECT_GET_REQUESTED,
  PROJECT_PATCH_REQUESTED,
} from "../../redux/actionsTypes";

class ProjectPage extends Component {
  componentDidMount() {
    const pid = this.props.match.params.pid;
    this.props.request_project_get(pid);
  }

  render() {
    if (isEmpty(this.props.activeProject)) {
      return <LoadingPage />;
    } else {
      return (
        <BasePage>
          <div className="flex-grow-1 d-flex flex-column">
            <Gui
              key={this.props.activeProject.id}
              projectTitle={this.props.activeProject.title || ""}
              backend={true}
              initialCode={new Uint8Array(this.props.activeProject.projectBlob)}
              // The backend needs the underlying "buffer" of the Uint8Array, otherwise,
              // we end up with [object Object] string in the DB
              backendCodeSaveHandler={(c) =>
                this.props.request_project_patch({ projectBlob: c.buffer, id: this.props.activeProject.id })
              }
              backendCodeSaveInterval={
                process.env.DATALAND_AUTOSAVE_INTERVAL * 1000
              }
              backendCodeSaveTimestamp={this.props.activeProjectSaveTimestamp}
              backendMetaDataSaveHandler={(p) =>
                this.props.request_project_patch({...p, id: this.props.activeProject.id})
              }
            />
          </div>
        </BasePage>
      );
    }
  }

  componentWillUnmount() {
    this.props.unload_active_project();
  }
}

ProjectPage.propTypes = {
  match: PropTypes.object,
  activeProject: PropTypes.object,
  activeProjectSaveTimestamp: PropTypes.number,

  request_project_get: PropTypes.func,
  request_project_patch: PropTypes.func,
  unload_active_project: PropTypes.func,
};

const mapStateToProps = function (store) {
  return {
    activeProject: store.projectsState.activeProject,
    activeProjectSaveTimestamp: store.projectsState.activeProjectSaveTimestamp,
  };
};

const request_project_get = (pid) => ({
  type: PROJECT_GET_REQUESTED,
  payload: pid,
});
const request_project_patch = (project) => ({
  type: PROJECT_PATCH_REQUESTED,
  payload: project,
});
const unload_active_project = () => ({ type: ACTIVE_PROJECT_UNLOADED });

export default connect(mapStateToProps, {
  request_project_get,
  request_project_patch,
  unload_active_project,
})(withRouter(ProjectPage));
