import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useLocation, Redirect } from "react-router-dom";

import { AUTHENTICATION_REQUESTED } from "../../redux/actionsTypes";
import store from "../../redux/store";

import BasePage from "../BasePage";
import LoadingPage from "../LoadingPage";
import LoginForm from "../../components/LoginForm";

function LoginPage(props) {
  let location = useLocation();
  let from = location.state.from || { pathname: "/" } ;

  if (props.authenticated === true) {
    return <Redirect to={from} />;
  } else if (props.authenticating === true) {
    store.dispatch({
      type: AUTHENTICATION_REQUESTED,
      payload: { reauthentication: true },
    });
    return <LoadingPage />;
  } else {
    return (
      <BasePage>
        <div className="py-5 text-center">
          <LoginForm
            errorMessage={props.authErrorMessage}
            onSubmit={(username, password) =>
              store.dispatch({
                type: AUTHENTICATION_REQUESTED,
                payload: { username: username, password: password },
              })
            }
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
};

const mapStateToProps = function (store) {
  return {
    authenticated: store.authenticationState.authenticated,
    authenticating: store.authenticationState.authenticating,
    authErrorMessage: store.authenticationState.authErrorMessage,
  };
};

export default connect(mapStateToProps)(LoginPage);
