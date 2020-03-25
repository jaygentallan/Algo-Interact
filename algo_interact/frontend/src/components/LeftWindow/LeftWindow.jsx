import React, { useState } from "react";
import "./LeftWindow.css";


const LeftWindow = props => {
  //Property States
  const [nSize, setnSize] = useState("");
  const [nColor, setnColor] = useState("");
  const [lColor, setlColor] = useState("");

  //Event Handler
  const inputHandler = event => {
    //prevent the forn submission from refreshing the page
    //event.preventDefault();

    //Pass states to GraphVisualizer
    props.nSize(nSize);
    props.nColor(nColor);
    props.lColor(lColor);
  };

  return (
    <div class="leftWindow">
        
          <h5 class="font-weight-light mt-5 pt-3 h6"> Node Size </h5>
        <div id='node' class="input-group mb-3">
          <input
            class="L nSize"
            id="nSize"
            type="text"
            name="nodeSize"
            placeholder="Enter node size"
            onKeyPress={ e => { if (e.key === "Enter") inputHandler() }}
            onChange={e => setnSize(document.getElementById("nSize").value)}
          />
        </div>

        <h5 class="font-weight-light h6"> Node Color </h5>
        <div id='node' class="input-group mb-3">
          <input
            class="L nColor"
            id="nColor"
            type="text"
            name="nodeColor"
            placeholder="Enter node color"
            onChange={e => setnColor(document.getElementById("nColor").value)}
            onKeyPress={e => { if (e.key === "Enter") inputHandler() }}
          />
        </div>

        <h5 class="font-weight-light h6"> Link Color </h5>
        <div id='node' class="input-group mb-3">
          <input
            class="L lColor"
            id="lColor"
            type="text"
            name="linkColor"
            placeholder="Enter link color"
            onChange={e => setlColor(document.getElementById("lColor").value)}
            onKeyPress={e => { if (e.key === "Enter") inputHandler() }}
          />
        </div>
    </div>
  );
};

export default LeftWindow;
