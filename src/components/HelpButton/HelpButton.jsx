import React from "../../../node_modules/react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

import "./HelpButton.css";
import { ListGroupItem } from "react-bootstrap";

/*
  The HelpButton is used in all the data structure
  tabs on the Visualizer page. When clicked, a modal
  window is triggered which lists information for each
  of the buttons on the left/right side of the Visualizer
  window.
*/
const HelpButton = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  return (
    <div class="row pt-3">
      <button type="button" class="btn btn-success" onClick={showModal}>
        <svg
          class="bi bi-question-circle"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
            clip-rule="evenodd"
          />
          <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
        </svg>
      </button>
      <Modal show={isOpen} onHide={hideModal} size="lg">
        <Modal.Header className="helpHeader">
          <Modal.Title>
            <h1 class="display-4">{props.mTitle}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="helpModal">Left Buttons</h2>
          <p>
            <strong>Graph Settings</strong>: Alter the color and size of all the
            nodes or links in the graph.
          </p>
          <p>
            <strong>Algorithm Settings</strong>: {props.algoDesc}
          </p>
          <p>
            <strong>Nodes & Links</strong>: {props.nLinkDesc}
          </p>
          <p>
            <strong>{props.nodeList}</strong>
            {props.nListDesc}
          </p>
          {props.rButtons ? (
            <h2 className="helpModal2">{props.rButtons}</h2>
          ) : (
            <div></div>
          )}
          <p>
            <strong>{props.b1}</strong>
            {props.b1Desc}
          </p>
          <p>
            <strong>{props.b2}</strong>
            {props.b2Desc}
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HelpButton;
