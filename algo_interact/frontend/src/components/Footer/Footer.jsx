import React from "../../../node_modules/react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="sticky-footer" class="py-2 bg-dark text-white-50">
      <div class="d-flex flex-row-reverse bd-highlight">
        <a class="nav-link" href="#">
          Support
        </a>
        <a class="nav-link" href="#">
          Team
        </a>
      </div>

      <div className="container text-center">
        <small>Copyright &copy; 2020 Algo Interact</small>
      </div>
    </footer>
  );
};

export default Footer;
