import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool,
  children: PropTypes.element,
};

const mapStateToProps = function (store) {
  return {
    authenticated: store.authenticationState.authenticated,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
