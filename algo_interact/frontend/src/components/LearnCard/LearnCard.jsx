import React from "../../../node_modules/react";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";


import "./LearnCard.css";
import { TabContent } from "react-bootstrap";

/*  The Learn page will have LearnCards that will show a
    pop-up modal window when clicked. The modals contain
    tabs that organizes the information. 
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
          <div class="container">
            <h5 class="button d-flex bd-highlight">Learn More</h5>
          </div>
        </button>
        <Modal show={isOpen} onHide={hideModal} size="lg">
          <Modal.Header>
            <Modal.Title> <h3>{props.title}</h3> </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs>
              <Tab eventKey="tab1" title={props.tab1title}>
                <TabContent>
                  <h4 class="mt-3">{props.tab1title}</h4>
                  <img src=  {props.tab1image}/>
                  <p>{props.tab1text}</p>
                </TabContent>
              </Tab>
              <Tab eventKey="tab2" title={props.tab2title}>
                <TabContent>
                  <h4 class="mt-3">{props.tab2title}</h4>
                  <img src=  {props.tab2image}/>
                  <p>{props.tab2text}</p>
                </TabContent>
              </Tab>
              <Tab eventKey="tab3" title={props.tab3title}>
                <TabContent>
                  <h4 class="mt-3">{props.tab3title}</h4>
                  <img src= {props.tab3image}/>
                  <p>{props.tab3text}</p>
                </TabContent>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default LearnCard;
