import React, { useState } from "react";

import PropTypes from "prop-types";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./style.css";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <h1 className="h3">Please log in</h1>
      <div className="d-flex justify-content-center align-items-center">
        <Form className="login-form">
          <Form.Group controlId="username">
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </Form.Group>
          <Button
            id="submit"
            size="lg"
            type="submit"
            variant="primary"
            onClick={(ev) => {
              ev.preventDefault();
              props.onSubmit(username, password);
            }}
            disabled={username === "" && password === ""}
          >
            Log in
          </Button>
          {props.errorMessage !== "" && (
            <Alert variant="danger" className="mt-2 align-middle">
              {props.errorMessage}
            </Alert>
          )}
        </Form>
      </div>
    </>
  );
}

LoginForm.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default LoginForm;
