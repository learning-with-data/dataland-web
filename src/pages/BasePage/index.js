import React from "react";

import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";

import PageNavBar from "../../components/NavBar";

function BasePage(props) {
  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      <PageNavBar />
      {props.children}
      <footer className="pt-2 my-md-3 pt-md-3 border-top text-center">
        <small className="text-muted">
          The DataLand Project | &copy; 2020 The University of North Carolina
          at Chapel Hill
        </small>
      </footer>
    </Container>
  );
}

BasePage.propTypes = {
  children: PropTypes.element,
};

export default BasePage;
