import React, { useState } from "react";

import PropTypes from "prop-types";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./style.css";

function RegistrationForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [invitationCode, setInvitationCode] = useState("");

  return (
    <>
      <h1 className="h3">Sign up</h1>
      <div className="d-flex justify-content-center align-items-center">
        <Form className="registration-form">
          <Form.Group controlId="invitationCode">
            <Form.Control
              type="text"
              value={invitationCode}
              placeholder="Enter invitation code"
              onChange={(ev) => setInvitationCode(ev.target.value)}
              required
            />
            <Form.Text className="text-muted">
              In order to sign up, you will need an invitation code.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={(ev) => setUsername(ev.target.value)}
              required
              minLength={3}
            />
            <Form.Text className="text-muted">
              Do not user your real name.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email address"
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(ev) => setPassword(ev.target.value)}
              required
              minLength={8}
            />
          </Form.Group>
          <Form.Group controlId="password2">
            <Form.Control
              type="password"
              value={password2}
              placeholder="Retype password"
              onChange={(ev) => setPassword2(ev.target.value)}
              required
              minLength={8}
              isInvalid={password !== password2}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {"The two passwords must match"}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            id="submit"
            size="lg"
            type="submit"
            variant="primary"
            onClick={(ev) => {
              ev.preventDefault();
              props.onSubmit(invitationCode, username, email, password);
            }}
            disabled={
              (username === "" || password === "" || email === "") ||
              (password !== password2)
            }
          >
            Sign up
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

RegistrationForm.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default RegistrationForm;
