import React from "react";

import { Link } from "react-router-dom";

import BasePage from "../BasePage";

import ExclamationCircleFill from "bootstrap-icons/icons/exclamation-circle-fill.svg";

function NotFoundPage() {
  return (
    <BasePage>
      <div className="py-5 text-center alert alert-warning" role="alert">
        <h2>
          <ExclamationCircleFill className="mr-2 align-text-top" />
          Not found
        </h2>
        <p className="mt-5 lead">
          Sorry, the page or resource you were looking for was not found.
          <br />
          Please click <Link to="/">here</Link> to go back to the homepage.
        </p>
      </div>
    </BasePage>
  );
}

NotFoundPage.propTypes = {};

export default NotFoundPage;
