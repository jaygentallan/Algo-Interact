import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="sticky-footer" className="py-3 bg-dark text-white-50">
      <div className="d-flex flex-row-reverse bd-highlight">
        <div className="col-auto">Donate</div>
        <div className="col-auto">Team</div>
      </div>

      <div className="container text-center">
        <small>Copyright &copy; 2020 Algo Interact</small>
      </div>
    </footer>
  );
};

export default Footer;
