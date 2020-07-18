import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";

import { request_projects } from "../../redux/actionCreators";
import ProjectListItem from "../ProjectListItem";

class ProjectList extends Component {
  componentDidMount() {
    this.props.request_projects();
  }

  render() {
    return (
      <Row className="row-cols-1 row-cols-md-3">
        {this.props.projects.map((project) => {
          return <ProjectListItem project={project} key={project.id} />;
        })}
      </Row>
    );
  }
}

ProjectList.propTypes = {
  projects: PropTypes.array,
  request_projects: PropTypes.func,
};

const mapStateToProps = function (store) {
  return {
    projects: store.projectsState.projects,
  };
};

export default connect(mapStateToProps, { request_projects })(ProjectList);
