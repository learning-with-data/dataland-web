import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useLocation, Redirect } from "react-router-dom";

import { AUTHENTICATION_REQUESTED } from "../../redux/actionsTypes";

import BasePage from "../BasePage";
import LoadingPage from "../LoadingPage";
import LoginForm from "../../components/LoginForm";

function LoginPage(props) {
  let location = useLocation();
  let from = location.state.from || { pathname: "/" };

  if (props.authenticated === true) {
    return <Redirect to={from} />;
  } else if (props.authenticating === true) {
    props.request_reauthentication();
    return <LoadingPage />;
  } else {
    return (
      <BasePage>
        <div className="py-5 text-center">
          <LoginForm
            errorMessage={props.authErrorMessage}
            onSubmit={(username, password) => props.request_authentication(username, password)}
          />
        </div>
      </BasePage>
    );
  }
}

LoginPage.propTypes = {
  authenticated: PropTypes.bool,
  authenticating: PropTypes.bool,
  authErrorMessage: PropTypes.string,
  request_authentication: PropTypes.func,
  request_reauthentication: PropTypes.func,
};

const mapStateToProps = function (store) {
  return {
    authenticated: store.authenticationState.authenticated,
    authenticating: store.authenticationState.authenticating,
    authErrorMessage: store.authenticationState.authErrorMessage,
  };
};

const request_authentication = (username, password) => ({
  type: AUTHENTICATION_REQUESTED,
  payload: { username: username, password: password },
});
const request_reauthentication = () => ({
  type: AUTHENTICATION_REQUESTED,
  payload: { reauthentication: true },
});

export default connect(mapStateToProps, {
  request_authentication,
  request_reauthentication,
})(LoginPage);
