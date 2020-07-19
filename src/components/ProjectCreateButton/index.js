import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { create_project } from "../../redux/actionCreators";

import FilePlusIcon from "bootstrap-icons/icons/file-plus.svg";

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
        <FilePlusIcon title="create icon" className="mr-2 align-text-top" />
        Create new project
      </Button>
    </OverlayTrigger>
  );
}

ProjectCreateButton.propTypes = {
  create_project: PropTypes.func,
};

export default connect(null, { create_project })(ProjectCreateButton);
