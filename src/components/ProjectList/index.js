import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";

import { PROJECTS_LOAD_REQUESTED } from "../../redux/actionsTypes";
import ProjectListItem from "../ProjectListItem";
import store from "../../redux/store";

class ProjectList extends Component {
  componentDidMount() {
    store.dispatch({
      type: PROJECTS_LOAD_REQUESTED,
      payload: {
        query: {
          $select: ["id", "title", "description", "updatedAt"],
          $sort: { createdAt: -1 },
          $limit: 25,
        },
      },
    });
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
};

const mapStateToProps = function (store) {
  return {
    projects: store.projectsState.projects,
  };
};

export default connect(mapStateToProps)(ProjectList);
