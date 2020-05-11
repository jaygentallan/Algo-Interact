import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "./AlgoTab.css";
import Algorithm from "./Algorithm";

//Renders Selected Algorithm
const AlgoTab = (props) => {
  //sets current algorithm tab
  var dataStructure;
  if (!props.dataStructure) dataStructure = "Graph";
  else dataStructure = Object.values(props.dataStructure)[0];
  const [tabKey, setTabkey] = useState(dataStructure);

  console.log(dataStructure);

  //Update tab key state
  const keyHandler = (event) => {
    setTabkey(event);
  };

  return (
    <div>
      <div class="Tab">
        <Tabs
          className="tabs"
          activeKey={tabKey}
          onSelect={(event) => keyHandler(event)}
        >
          <Tab eventKey="Graph" title="Graph"></Tab>
          <Tab eventKey="Tree" title="Tree"></Tab>
          <Tab eventKey="LinkedList" title="Linked List"></Tab>
        </Tabs>
      </div>

      <Algorithm algoKey={tabKey} />
    </div>
  );
};

export default AlgoTab;
