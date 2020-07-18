import React, { Component, Suspense } from "react";

import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";

import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import "dataland-gui/dist/main.css";

import BasePage from "../BasePage";
import LoadingPage from "../LoadingPage";
import {
  request_project_get,
  request_project_patch,
  unload_active_project,
  error_dismissed,
} from "../../redux/actionCreators";

const Gui = React.lazy(() => import("dataland-gui"));

class ProjectPage extends Component {
  componentDidMount() {
    const pid = this.props.match.params.pid;
    this.props.request_project_get(pid);
  }

  render() {
    if (isEmpty(this.props.activeProject)) {
      if (
        !isEmpty(this.props.lastError) &&
        this.props.lastError.error.name === "NotFound"
      ) {
        return <Redirect to="/not-found" />;
      } else {
        return <LoadingPage />;
      }
    } else {
      return (
        <BasePage>
          <Suspense fallback={<LoadingPage />}>
            <div className="flex-grow-1 d-flex flex-column">
              <Gui
                initialProjectTitle={this.props.activeProject.title || ""}
                backend={true}
                initialProject={
                  new Uint8Array(this.props.activeProject.projectBlob)
                }
                backendCodeSaveHandler={(c) =>
                  this.props.request_project_patch({
                    projectBlob: c,
                    id: this.props.activeProject.id,
                  })
                }
                backendCodeSaveInterval={
                  process.env.DATALAND_AUTOSAVE_INTERVAL * 1000
                }
                backendCodeSaveTimestamp={this.props.activeProjectSaveTimestamp}
                backendMetaDataSaveHandler={(p) =>
                  this.props.request_project_patch({
                    ...p,
                    id: this.props.activeProject.id,
                  })
                }
              />
            </div>
          </Suspense>
        </BasePage>
      );
    }
  }

  componentWillUnmount() {
    if (
      !isEmpty(this.props.lastError) &&
      this.props.lastError.error.name === "NotFound"
    ) {
      this.props.error_dismissed(this.props.lastError.id);
    } else {
      this.props.unload_active_project();
    }
  }
}

ProjectPage.propTypes = {
  match: PropTypes.object,
  activeProject: PropTypes.object,
  activeProjectSaveTimestamp: PropTypes.number,
  lastError: PropTypes.object,

  request_project_get: PropTypes.func,
  request_project_patch: PropTypes.func,
  unload_active_project: PropTypes.func,
  error_dismissed: PropTypes.func,
};

const mapStateToProps = function (store) {
  const lastError = store.errorState.errors.length
    ? store.errorState.errors[store.errorState.errors.length - 1]
    : {};
  return {
    activeProject: store.projectsState.activeProject,
    activeProjectSaveTimestamp: store.projectsState.activeProjectSaveTimestamp,
    lastError,
  };
};

export default connect(mapStateToProps, {
  request_project_get,
  request_project_patch,
  unload_active_project,
  error_dismissed,
})(withRouter(ProjectPage));
