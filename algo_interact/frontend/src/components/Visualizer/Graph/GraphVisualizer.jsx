import React from "../../../../node_modules/react";
import { Graph } from "react-d3-graph";

const data = {
  nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
  links: [
    { source: "Harry", target: "Sally" },
    { source: "Harry", target: "Alice" }
  ]
};

const myConfig = {
  nodeHighlightBehavior: true,
  height: window.innerHeight * 0.811,
  width: window.innerWidth,
  node: {
    color: "lightgreen",
    size: 500,
    highlightStrokeColor: "blue"
  },
  link: {
    highlightColor: "lightblue"
  }
};

const GraphVisualizer = () => {
  return (
    <div class="box">
      <Graph id="graph-id" data={data} config={myConfig} />
    </div>
  );
};

export default GraphVisualizer;
