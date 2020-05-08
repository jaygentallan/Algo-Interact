import React from "../../../node_modules/react";
import Modal from "react-bootstrap/Modal";
import "./Footer.css";

/*
  The Footer has a link called Team that when clicked,
  triggers a modal window with more information about
  our group and why we decided to create this project.
  This modal will also have pictures of each member of 
  the team.
*/
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

        <a
          class="nav-link"
          href="#TeamInfoModal"
          data-toggle="modal"
          onClick={showModal}
        >
          Team
        </a>
        <Modal class="center" show={isOpen} onHide={hideModal} size="lg">
          <Modal.Header className="teamHeader">
            <Modal.Title>
              <h1 className="title">Meet the Team!</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p class="lead">
                We are undergraduate Computer Science students at California
                State East Bay. As students that have taken Data Structures and
                Analysis of Algorithms, we understood the visual disconnect that
                some students struggle with when first learning about how
                certain algorithms are implemented with their respective data
                structures. Our goal of creating Algo-Interact was to help
                students better understand algorithms through an interactive and
                visually-appealing website.
              </p>
            </div>
            <div class="container">
              <div class="row">
                <div class="col">
                  <img 
                    class="circular--portrait AC" 
                    src={"/teamPhotos/AC.jpeg"}
                  />
                </div>
                <div class="col-8">
                  <h4 className="name">Anthony Carnero</h4>
                  <p className="description">
                    "I love spicy food and making pepper sauce."  
                  </p>
                </div>
              </div>
              <div class="row pt-3">
                <div class="col">
                  <img
                    class="circular--landscape jay"
                    src="/teamPhotos/photo-jay.jpg"
                  />
                </div>
                <div class="col-8">
                  <h4 className="name">Jay Ivan Gentallan</h4>
                  <p className="description">
                    "I like to play the guitar and drink Monster Energy."
                  </p>
                </div>
              </div>
              <div class="row pt-3">
                <div class="col">
                  <img 
                    class="circular--landscape" 
                    src="/teamPhotos/photo-baljeet.jpeg" />
                </div>
                <div class="col-8">
                  <h4 className="name">Baljeet Singh</h4>
                  <p className="description">
                    "I can't go one day without drinking chai."
                  </p>
                </div>
              </div>
              <div class="row pt-3">
                <div class="col">
                  <img
                    class="circular--landscape"
                    src="/teamPhotos/photo-Mikaela.jpg"
                  />
                </div>
                <div class="col-8">
                  <h4 className="name">Mikaela Valenciano</h4>
                  <p className="description">
                    "I love attending concerts, playing guitar, and drawing."
                  </p>
                </div>
              </div>
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
