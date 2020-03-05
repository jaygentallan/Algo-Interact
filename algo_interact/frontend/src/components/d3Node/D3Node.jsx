import React, {useState} from 'react'
import { Graph } from "react-d3-graph";
import Input from '../Input/Input'

const D3Node = (props) => {
  
  const [data, setData] = useState({
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" }
    ]
}); 

  const createNode = (name, target) => {
    setData({
      nodes: [...data.nodes, {id: name}],
      links: [
        ...data.links,
        { source: name, target: target }
      ]
    })
  }

  const [myConfig, setMyConfig] = useState({
    nodeHighlightBehavior: true,
    height: window.innerHeight * 0.811,
    width: window.innerWidth,
    node: {
      color: "lightgreen",
      size: 500,
      highlightStrokeColor: "blue",
      symbolType: ""
    },
    link: {
      highlightColor: "lightblue"
    }
    });

    const handleConfig = (color, shape) => {
      setMyConfig({
        nodeHighlightBehavior: true,
        height: window.innerHeight * 0.811,
        width: window.innerWidth,
        node: {
          color: color,
          size: 500,
          highlightStrokeColor: "blue",
          symbolType: shape
        },
        link: {
          highlightColor: "lightblue"
        }
      })
    }

  return (
    <div class="box">
      <Graph id="graph-id" data={data} config={myConfig} />
      <Input createNode={createNode} handleConfig={handleConfig}/>
    </div>
  );
};

export default D3Node;
