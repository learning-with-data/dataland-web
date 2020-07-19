import React from "react";

import PropTypes from "prop-types";

import NavDropdown from "react-bootstrap/NavDropdown";

import PersonIcon from "bootstrap-icons/icons/person.svg";
import PowerIcon from "bootstrap-icons/icons/power.svg";

function DropDown(props) {
  return (
    <>
      <PersonIcon title="person icon" />
      <NavDropdown
        id="navDropDown"
        title={props.user.username === undefined ? " " : props.user.username}
        alignRight
      >
        <NavDropdown.Item
          id="navLogoutLink"
          href="#"
          onClick={() => props.onLogout()}
        >
          <PowerIcon title="logout icon" className="mr-2" />
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
}

DropDown.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
};

export default DropDown;
