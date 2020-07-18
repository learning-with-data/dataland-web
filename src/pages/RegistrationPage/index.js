import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useLocation, Redirect } from "react-router-dom";

import {
  request_registration,
  request_reauthentication,
} from "../../redux/actionCreators";

import BasePage from "../BasePage";
import LoadingPage from "../LoadingPage";
import RegistrationForm from "../../components/RegistrationForm";

function RegistrationPage(props) {
  let location = useLocation();
  let from = (location.state && location.state.from) || { pathname: "/" };

  if (props.authenticated === true) {
    return <Redirect to={from} />;
  } else if (props.authenticating === true) {
    props.request_reauthentication();
    return <LoadingPage />;
  } else {
    return (
      <BasePage>
        <div className="py-5 text-center">
          <RegistrationForm
            errorMessage={props.registrationErrorMessage}
            onSubmit={props.request_registration}
          />
        </div>
      </BasePage>
    );
  }
}

RegistrationPage.propTypes = {
  authenticated: PropTypes.bool,
  authenticating: PropTypes.bool,
  registrationErrorMessage: PropTypes.string,
  request_registration: PropTypes.func,
  request_reauthentication: PropTypes.func,
};

const mapStateToProps = function (store) {
  return {
    authenticated: store.authenticationState.authenticated,
    authenticating: store.authenticationState.authenticating,
    registrationErrorMessage:
      store.authenticationState.registrationErrorMessage,
  };
};

export default connect(mapStateToProps, {
  request_registration,
  request_reauthentication,
})(RegistrationPage);
