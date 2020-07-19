import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import ContentEditable from "react-contenteditable";

import { Link } from "react-router-dom";

import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

import sanitizeHtml from "sanitize-html";

import PencilSquareIcon from "bootstrap-icons/icons/pencil-square.svg";
import BarChartLineIcon from "bootstrap-icons/icons/bar-chart-line.svg";

import { request_project_patch } from "../../redux/actionCreators";

import "./style.css";

function bufferToImageUrl(buffer) {
  const blob = new Blob([new Uint8Array(buffer)], { type: "image/png" });
  return URL.createObjectURL(blob);
}

dayjs.extend(RelativeTime);

class ProjectListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draftProjectTitle: this.props.project.title,
      draftProjectDescription: this.props.project.description,
    };

    this.sanitizeConf = {
      allowedTags: [],
      allowedAttributes: {},
    };

    this.thumbNailImageUrl = this.props.project.projectThumbnailBlob
      ? bufferToImageUrl(this.props.project.projectThumbnailBlob)
      : null;
  }

  updateDraftField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  onFieldBlur(name, ev) {
    ev.target.scrollTo(0, 0);

    let project;

    if (name === "draftProjectTitle") {
      project = {
        id: this.props.project.id,
        title: sanitizeHtml(this.state.draftProjectTitle, this.sanitizeConf),
      };
    } else if (name === "draftProjectDescription") {
      project = {
        id: this.props.project.id,
        description: sanitizeHtml(
          this.state.draftProjectDescription,
          this.sanitizeConf
        ),
      };
    } else {
      return;
    }

    this.props.request_project_patch(project);
  }

  componentWillUnmount() {
    if (this.thumbNailImageUrl) URL.revokeObjectURL(this.thumbNailImageUrl);
  }

  render() {
    return (
      <Col className="mb-4">
        <Card
          className="project-list-item"
          id={`projectListItem-${this.props.project.id}`}
        >
          {this.thumbNailImageUrl ? (
            <Card.Img variant="top" src={this.thumbNailImageUrl} />
          ) : (
            <BarChartLineIcon
              style={{ color: "lightgray" }}
              className="card-img-top"
            />
          )}
          <Card.Body>
            <Card.Title className="rounded">
              <ContentEditable
                html={this.state.draftProjectTitle}
                onChange={(ev) =>
                  this.updateDraftField("draftProjectTitle", ev)
                }
                onBlur={(ev) => this.onFieldBlur("draftProjectTitle", ev)}
              />
            </Card.Title>
            <ContentEditable
              className="card-text rounded"
              html={this.state.draftProjectDescription}
              onChange={(ev) =>
                this.updateDraftField("draftProjectDescription", ev)
              }
              onBlur={(ev) => this.onFieldBlur("draftProjectDescription", ev)}
            />
          </Card.Body>
          <Card.Footer className="d-flex align-items-center">
            <small className="updated-timestamp text-muted flex-grow-1">
              Updated: {dayjs(this.props.project.updatedAt).fromNow()}
            </small>
            <Link to={`/projects/${this.props.project.id}`}>
              <Button variant="info" size="sm" className="ml-auto">
                <PencilSquareIcon
                  title="edit icon"
                  className="mr-2 align-text-top"
                />
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

  request_project_patch: PropTypes.func,
};

export default connect(null, { request_project_patch })(ProjectListItem);
