import React from "react";
import Graph from "../Visualizer/Graph/GraphVisualizer";
import LinkedList from "../Visualizer/LinkedList/LinkedListVisualizer";
import Tree from "../Visualizer/Tree/TreeVisualizer";

/*
  AlgoTab passes current tabKey 
  so Algorithm knows which component to render 
  */
const Algorithm = (props) => {
  //Selected Algo Component is stored into this variable
  let selectedAlgo = null;

  //Conditional Rendering
  switch (props.algoKey) {
    case "Graph":
      selectedAlgo = <Graph />;
      break;
    case "LinkedList":
      selectedAlgo = <LinkedList />;
      break;
    case "Tree":
      selectedAlgo = <Tree />;
      break;
    default:
      selectedAlgo = <h1>Warning something went wrong!!!</h1>;
  }

  return <div>{selectedAlgo}</div>;
};

export default Algorithm;
