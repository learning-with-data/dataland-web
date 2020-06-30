import React from "react";

import PropTypes from "prop-types";

import NavDropdown from "react-bootstrap/NavDropdown";

function DropDown(props) {
  return (
    <>
      <svg
        className="bi bi-person"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>person icon</title>
        <path
          fillRule="evenodd"
          d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
        />
      </svg>
      <NavDropdown
        id="navDropDown"
        title={props.user.username === undefined ? " " : props.user.username}
        alignRight
      >
        <NavDropdown.Item id="navLogoutLink" href="#" onClick={() => props.onLogout()}>
          <svg
            className="bi bi-power"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>logout icon</title>
            <path
              fillRule="evenodd"
              d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z"
            />
            <path fillRule="evenodd" d="M7.5 8V1h1v7h-1z" />
          </svg>{" "}
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
