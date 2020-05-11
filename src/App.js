import React, { Component } from "react";
import "./App.css";

// Used for routing different pages
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

// Pages
import HomePage from "./pages/home";
import VisualizerPage from "./pages/visualizer";
import LearnPage from "./pages/learn";
import NotFoundPage from "./pages/404";

// Main App class to be rendered by the React DOM
// in the index.js file.
class App extends Component {
  render() {
    return (
      // Uses Router class to be able to switch
      // around different paths with its corresponding components.
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/visualizer" component={VisualizerPage} />
          <Route exact path="/learn" component={LearnPage} />
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default App;
