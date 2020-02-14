import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        Algo-Interact
      </a>
      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Visualizer
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
