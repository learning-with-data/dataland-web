import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { create_project } from "../../redux/actionCreators";

function ProjectCreateButton(props) {
  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip id="button-tooltip">
          Create a new project and start editing its code
        </Tooltip>
      }
    >
      <Button
        id="createButton"
        variant="primary"
        onClick={() => props.create_project()}
      >
        <svg
          className="bi bi-file-plus"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>create icon</title>
          <path d="M9 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8h-1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5V1z" />
          <path
            fillRule="evenodd"
            d="M13.5 1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V1.5a.5.5 0 0 1 .5-.5z"
          />
          <path
            fillRule="evenodd"
            d="M13 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"
          />
        </svg>{" "}
        Create new project
      </Button>
    </OverlayTrigger>
  );
}

ProjectCreateButton.propTypes = {
  create_project: PropTypes.func,
};

export default connect(null, { create_project })(ProjectCreateButton);
