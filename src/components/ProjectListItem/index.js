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

import { PROJECT_PATCH_REQUESTED } from "../../redux/actionsTypes";

import "./style.css";

const FALLBACK_THUMBNAIL =
  "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3" +
  "aWR0aD0iMTYwcHgiIGhlaWdodD0iMTAwcHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI" +
  "0QzRDNEMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPHBhdGggZm" +
  "lsbC1ydWxlPSJldmVub2RkIiBkPSJNNCAxMUgydjNoMnYtM3ptNS00SDd2N2gyVjd6bTUtNWg" +
  "tMnYxMmgyVjJ6bS0yLTFhMSAxIDAgMCAwLTEgMXYxMmExIDEgMCAwIDAgMSAxaDJhMSAxIDAg" +
  "MCAwIDEtMVYyYTEgMSAwIDAgMC0xLTFoLTJ6TTYgN2ExIDEgMCAwIDEgMS0xaDJhMSAxIDAgM" +
  "CAxIDEgMXY3YTEgMSAwIDAgMS0xIDFIN2ExIDEgMCAwIDEtMS0xVjd6bS01IDRhMSAxIDAgMC" +
  "AxIDEtMWgyYTEgMSAwIDAgMSAxIDF2M2ExIDEgMCAwIDEtMSAxSDJhMSAxIDAgMCAxLTEtMXY" +
  "tM3oiLz4NCiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAxNC41YS41LjUgMCAw" +
  "IDEgLjUtLjVoMTVhLjUuNSAwIDAgMSAwIDFILjVhLjUuNSAwIDAgMS0uNS0uNXoiLz4NCjwvc" +
  "3ZnPg==";

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
      : FALLBACK_THUMBNAIL;
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
    if (this.props.project.projectThumbnailBlob)
      URL.revokeObjectURL(this.thumbNailImageUrl);
  }

  render() {
    return (
      <Col className="mb-4">
        <Card
          className="project-list-item"
          id={`projectListItem-${this.props.project.id}`}
        >
          <Card.Img variant="top" src={this.thumbNailImageUrl} />
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

  request_project_patch: PropTypes.func,
};

const request_project_patch = (project) => ({
  type: PROJECT_PATCH_REQUESTED,
  payload: project,
});

export default connect(null, { request_project_patch })(ProjectListItem);
