import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import ContentEditable from "react-contenteditable";

import { Link } from "react-router-dom";

import moment from "moment";
import sanitizeHtml from "sanitize-html";

import { PROJECT_PATCH_REQUESTED } from "../../redux/actionsTypes";
import store from "../../redux/store";

import "./style.css";

class ProjectListItem extends Component {
  state = {
    draftProjectTitle: this.props.project.title,
    draftProjectDescription: this.props.project.description,
    draftUpdatedAt: this.props.project.updatedAt,
  };
  sanitizeConf = {
    allowedTags: [],
    allowedAttributes: {},
  };

  updateDraftField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  onFieldBlur(name) {
    let payload;

    if (name === "draftProjectTitle") {
      payload = {
        id: this.props.project.id,
        title: sanitizeHtml(this.state.draftProjectTitle, this.sanitizeConf),
      };
    } else if (name === "draftProjectDescription") {
      payload = {
        id: this.props.project.id,
        description: sanitizeHtml(
          this.state.draftProjectDescription,
          this.sanitizeConf
        ),
      };
    } else {
      return;
    }

    store.dispatch({
      type: PROJECT_PATCH_REQUESTED,
      payload: payload,
    });
  }

  render() {
    return (
      <Col className="mb-4">
        <Card
          className="project-list-item"
          id={`projectListItem-${this.props.project.id}`}
        >
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title className="rounded">
              <ContentEditable
                html={this.state.draftProjectTitle}
                onChange={(ev) =>
                  this.updateDraftField("draftProjectTitle", ev)
                }
                onBlur={() => this.onFieldBlur("draftProjectTitle")}
              />
            </Card.Title>
            <ContentEditable
              className="card-text rounded"
              html={this.state.draftProjectDescription}
              onChange={(ev) =>
                this.updateDraftField("draftProjectDescription", ev)
              }
              onBlur={() => this.onFieldBlur("draftProjectDescription")}
            />
          </Card.Body>
          <Card.Footer className="d-flex align-items-center">
            <small className="text-muted flex-grow-1">
              Updated: {moment(this.state.draftUpdatedAt).fromNow()}
            </small>
            <Link to={`/projects/${this.props.project.id}`}>
              <Button variant="info" size="sm" className="ml-auto">
                <svg
                  className="bi bi-pencil-square"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>edit icon</title>
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>{" "}
                Edit code
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    );
  }
}

ProjectListItem.propTypes = {
  project: PropTypes.object,
};

export default ProjectListItem;
