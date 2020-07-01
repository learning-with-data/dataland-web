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
  PROJECT_EDITOR_EXITED,
  PROJECT_GET_REQUESTED,
  PROJECT_PATCH_REQUESTED,
} from "../../redux/actionsTypes";
import store from "../../redux/store";

class ProjectPage extends Component {
  componentDidMount() {
    const pid = this.props.match.params.pid;
    store.dispatch({
      type: PROJECT_GET_REQUESTED,
      payload: pid,
    });
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
                this.patchProject({ projectBlob: c.buffer })
              }
              backendCodeSaveInterval={
                process.env.DATALAND_AUTOSAVE_INTERVAL * 1000
              }
              backendCodeSaveTimestamp={this.props.activeProjectSaveTimestamp}
              backendMetaDataSaveHandler={(p) => this.patchProject(p)}
            />
          </div>
        </BasePage>
      );
    }
  }

  componentWillUnmount() {
    store.dispatch({ type: PROJECT_EDITOR_EXITED });
  }

  patchProject(project) {
    console.log(project);
    store.dispatch({
      type: PROJECT_PATCH_REQUESTED,
      payload: { ...project, id: this.props.activeProject.id },
    });
  }
}

ProjectPage.propTypes = {
  match: PropTypes.object,
  activeProject: PropTypes.object,
  activeProjectSaveTimestamp: PropTypes.number,
};

const mapStateToProps = function (store) {
  return {
    activeProject: store.projectsState.activeProject,
    activeProjectSaveTimestamp: store.projectsState.activeProjectSaveTimestamp,
  };
};

export default connect(mapStateToProps)(withRouter(ProjectPage));
