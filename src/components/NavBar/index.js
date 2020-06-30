import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Navbar from "react-bootstrap/Navbar";

import { AUTHENTICATION_LOGOUT_REQUESTED } from "../../redux/actionsTypes";
import store from "../../redux/store";

import DropDown from "./dropdown";

function PageNavBar(props) {
  return (
    <Navbar className="navbar-expand-lg" bg="light" variant="light">
      <Link to="/"><Navbar.Brand>DataLand</Navbar.Brand></Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {props.authenticated === true && (
          <DropDown
            user={props.user}
            onLogout={() =>
              store.dispatch({
                type: AUTHENTICATION_LOGOUT_REQUESTED,
              })
            }
          />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

PageNavBar.propTypes = {
  authenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = function (store) {
  return {
    authenticated: store.authenticationState.authenticated,
    user: store.authenticationState.user,
  };
};

export default connect(mapStateToProps)(PageNavBar);
