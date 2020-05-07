import React from "../../../node_modules/react";
import Modal from "react-bootstrap/Modal";
import "./Footer.css";

const Footer = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  return (
    <footer id="sticky-footer" class="py-2 bg-dark text-white-50">
      <div class="d-flex flex-row-reverse bd-highlight">
        <a class="nav-link" href="#">
          Support
        </a>

        <a class="nav-link" href="#TeamInfoModal" data-toggle="modal" onClick={showModal}>
          Team
        </a>
        <Modal 
          class="center" 
          show={isOpen} 
          onHide={hideModal} 
          size="lg"
        >
          <Modal.Header class="teamHeader">
            <Modal.Title><h1 class="display-3">Meet the Team!</h1></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p class="lead"> 
                  We are undergraduate Computer Science students at California State 
                  East Bay. As students that have taken Data Structures and Analysis of Algorithms,
                  we understood the visual disconnect that some students struggle with when
                  first learning about how certain algorithms are implemented with their respective
                  data structures. Our goal of creating Algo-Interact was to help students better
                  understand algorithms through an interactive and visually-appealing website.
              </p>
            </div>

          </Modal.Body>
        </Modal>
      </div>

      <div className="container text-center">
        <small>Copyright &copy; 2020 Algo-Interact</small>
      </div>
    </footer>
  );
};

export default Footer;
