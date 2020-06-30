import React from "react";

import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

function LoadingPage() {
  return (
    <Container className="d-flex flex-column min-vh-100 justify-content-center">
      <div className="text-center w-100">
        <h3>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading animation</span>
          </Spinner>{" "}
          Loading...
        </h3>
      </div>
    </Container>
  );
}

export default LoadingPage;
