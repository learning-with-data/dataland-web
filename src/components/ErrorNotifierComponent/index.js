import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Toast from "react-bootstrap/Toast";

import ExclamationTriangleFillIcon from "bootstrap-icons/icons/exclamation-triangle-fill.svg";

import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

import { error_dismissed } from "../../redux/actionCreators";

function ErrorNotifierComponent(props) {
  dayjs.extend(RelativeTime);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="d-flex justify-content-center align-items-center"
      style={{ maxHeight: "0px", position: "relative", zIndex: 9999 }}
    >
      <div style={{ position: "absolute", top: "1em" }}>
        {props.errors.map((error) => {
          return (
            <Toast
              className="error-notification"
              key={error.id}
              style={{ minWidth: "40ch" }}
              onClose={() => props.error_dismissed(error.id)}
            >
              <Toast.Header>
                <ExclamationTriangleFillIcon className="mr-2" />
                <strong className="mr-auto">Whoops!</strong>
                <small>{dayjs(error.created).fromNow()}</small>
              </Toast.Header>
              <Toast.Body>
                Something went wrong.
                <br />
                {error.message}
              </Toast.Body>
            </Toast>
          );
        })}
      </div>
    </div>
  );
}

ErrorNotifierComponent.propTypes = {
  errors: PropTypes.array,
  error_dismissed: PropTypes.func,
};

const mapStateToProps = function (store) {
  return {
    errors: store.errorState.errors,
  };
};

export default connect(mapStateToProps, { error_dismissed })(
  ErrorNotifierComponent
);
