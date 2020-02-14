import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="sticky-footer" class="py-3 bg-dark text-white-50">
      <div class="d-flex flex-row-reverse bd-highlight">
        <div class="col-auto">Donate</div>
        <div class="col-auto">Team</div>
      </div>

      <div class="container text-center">
        <small>Copyright &copy; 2020 Algo Interact</small>
      </div>
    </footer>
  );
};

export default Footer;
