import React from "../../../node_modules/react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

import "./HelpButton.css";
import { ListGroupItem } from "react-bootstrap";

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
            <button 
              type="button" 
              class="btn btn-success" 
              onClick={showModal}
              >
              ?
            </button>
            <Modal 
                show={isOpen} 
                onHide={hideModal} 
                size="lg"
                >
              <Modal.Header class="helpHeader">
                <Modal.Title><h1 class="display-4">{props.mTitle}</h1></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <h2>Left Buttons</h2>
                  <p><strong>Graph Settings</strong>: Alter the color and size of all the nodes or links in the graph.</p>
                  <p><strong>Algorithm Settings</strong>: {props.algoDesc}</p>
                  <p><strong>Nodes & Links</strong>: {props.nLinkDesc}</p>
                  <p><strong>{props.nodeList}</strong>{props.nListDesc}</p>
                  <h2>{props.rButtons}</h2>
                  <p><strong>{props.b1}</strong>{props.b1Desc}</p>
                  <p><strong>{props.b2}</strong>{props.b2Desc}</p>
              </Modal.Body>
            </Modal>
        </div>
    );
};

export default HelpButton;