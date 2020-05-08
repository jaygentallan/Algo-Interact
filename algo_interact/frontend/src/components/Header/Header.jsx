import React from "../../../node_modules/react";
import "./Header.css";

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
            src={"/header_logo.png"}
            width={10}
            height={40}
            className="logo"
          />
        </a>
      </div>

      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item px-3">
            <a class="nav-link" href="/">
              Home
            </a>
          </li>
          <li class="nav-item px-2">
            <a class="nav-link" href="/visualizer">
              Visualizer
            </a>
          </li>
          <li class="nav-item px-3">
            <a class="nav-link" href="/learn">
              Learn
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
