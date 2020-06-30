import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import BasePage from "../BasePage";
import ProjectCreateButton from "../../components/ProjectCreateButton";
import ProjectList from "../../components/ProjectList";

class HomePage extends Component {
  render() {
    return (
      <BasePage>
        <Container className="flex-grow-1">
          <Card className="mt-4">
            <Card.Header className="d-flex">
              <h3>Your projects</h3>
              <div className="ml-auto">
                <ProjectCreateButton />
              </div>
            </Card.Header>
            <Card.Body>
              <ProjectList />
            </Card.Body>
          </Card>
        </Container>
      </BasePage>
    );
  }
}

export default HomePage;
