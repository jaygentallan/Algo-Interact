import React from "../../../node_modules/react";
import Modal from "react-bootstrap/Modal";
import "./LearnCard.css";

/*  The Learn page will have LearnCards that will show a
    pop-up modal window when clicked.
*/
const LearnCard = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  return (
    <div class="card border shadow">
      <div class="card-body card-text">
        <img class="card-img-top" src={props.image} />
        <h3>{props.title}</h3>
        <p>{props.text}</p>
      </div>
      <>
        <button
          onClick={showModal}
          type="button"
          class="btn btn-outline-danger showModal"
        >
          <h5 class="button d-flex bd-highlight"> Learn More </h5>
        </button>
        <Modal show={isOpen} onHide={hideModal} size="lg">
          <Modal.Header>
            <Modal.Title> {props.title} </Modal.Title>
          </Modal.Header>
          <Modal.Body> {props.text} </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default LearnCard;
