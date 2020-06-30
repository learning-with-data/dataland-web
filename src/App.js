import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/projects/:pid">
          <ProjectPage/>
        </PrivateRoute>
        <PrivateRoute path="/">
          <HomePage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
