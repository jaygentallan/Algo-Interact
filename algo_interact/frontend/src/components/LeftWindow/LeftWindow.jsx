import React, { useState } from "react";
import "./LeftWindow.css";
import { Dropdown, Form, Button } from "react-bootstrap";

const LeftWindow = props => {
  //Property States
  const [nSize, setnSize] = useState("");
  const [nColor, setnColor] = useState("");
  const [lColor, setlColor] = useState("");

  //Event Handler
  const inputHandler = event => {
    //prevent the forn submission from refreshing the page
    event.preventDefault();

    //Pass states to GraphVisualizer
    props.nSize(nSize);
    props.nColor(nColor);
    props.lColor(lColor);
  };

  return (
    <div class="leftWindow">
      <form onSubmit={inputHandler}>
        <div className="mt-3">
          <Form.Check type="checkbox" id="direct" label="Directed" />
        </div>

        <div className="">
          <Form.Check type="checkbox" id="weight" label="Weighted" />
        </div>

        <h5 class="font-weight-light pt-3 h6"> Node Size </h5>
        <div class="input-group mb-3">
          <input
            class="L nSize"
            id="nSize"
            type="text"
            name="nodeSize"
            placeholder="Enter node size"
            onChange={e => setnSize(document.getElementById("nSize").value)}
            //onKeyPress={}
          />
        </div>

        <h5 class="font-weight-light h6"> Node Color </h5>
        <div class="input-group mb-3">
          <input
            class="L nColor"
            id="nColor"
            type="text"
            name="nodeColor"
            placeholder="Enter node color"
            onChange={e => setnColor(document.getElementById("nColor").value)}
            //onKeyPress={this._handleLinkKeyEnter}
          />
        </div>

        <h5 class="font-weight-light h6"> Link Color </h5>
        <div class="input-group mb-3">
          <input
            class="L lColor"
            id="lColor"
            type="text"
            name="linkColor"
            placeholder="Enter link color"
            onChange={e => setlColor(document.getElementById("lColor").value)}
            //onKeyPress={this._handleLinkKeyEnter}
          />
        </div>

        <Dropdown class="dropdown" drop="right">
          <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
            Algorithm
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="1" active>
              Depth-First Search
            </Dropdown.Item>
            <Dropdown.Item evenyKey="2">Breadth-First Search</Dropdown.Item>
            <Dropdown.Item eventKey="3">Dijkstra's</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <h5 class="font-weight-light h6 pt-3"> Start Node </h5>
        <div class="input-group mb-3">
          <input
            class="L"
            id="sNode"
            type="text"
            name="startNode"
            placeholder="Enter starting node"
            onChange={e => setlColor(document.getElementById("lColor").value)}
            //onKeyPress={this._handleLinkKeyEnter}
          />
        </div>

        <h5 class="font-weight-light h6"> Target Node </h5>
        <div class="input-group mb-3">
          <input
            class="L"
            id="tNode"
            type="text"
            name="tarhetNode"
            placeholder="Enter ending node"
            onChange={e => setlColor(document.getElementById("lColor").value)}
            //onKeyPress={this._handleLinkKeyEnter}
          />
        </div>

        <Button class="submit mt-3" type="submit" variant="outline-success">
          Start
        </Button>
      </form>
    </div>
  );
};

export default LeftWindow;
