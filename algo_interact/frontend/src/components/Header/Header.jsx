import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Algo-Interact
      </a>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/visualizer">
              Visualizer
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
