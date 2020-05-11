import React from "../../../node_modules/react";
import "./Header.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

/*
  The static Header serves as the way for users to navigate
  to the Home, Visualizer, or Learn pages. The Header also has 
  the Algo-Interact logo that when clicked, is another way of 
  navigating back to the Home page.
*/
const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-header">
        <a className="navbar-brand" href="/">
          <img
            src={"/static/images/header_logo.png"}
            width={10}
            height={40}
            className="logo"
          />
        </a>
      </div>

      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item px-3">
            <Link
              className="linkHeader"
              to={{
                pathname: "/",
              }}
            >
              <a class="nav-link">Home</a>
            </Link>
          </li>
          <li class="nav-item px-2">
            <Link
              className="linkHeader"
              to={{
                pathname: "/visualizer",
              }}
            >
              <a class="nav-link">Visualizer</a>
            </Link>
          </li>
          <li class="nav-item px-3">
            <Link
              className="linkHeader"
              to={{
                pathname: "/learn",
              }}
            >
              <a class="nav-link">Learn</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
