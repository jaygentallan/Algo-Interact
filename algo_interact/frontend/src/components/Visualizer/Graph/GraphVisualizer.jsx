import React from "../../../../node_modules/react";
import Graph from "../../React-D3-Graph/Graph/graph/Graph";
import TreeView from "../../../../node_modules/react-treeview";
import { Dropdown, Form, Button } from "react-bootstrap";
import "./GraphVisualizer.css";
import { wait } from "@testing-library/react";
//import LeftWindow from "../../LeftVdWindow/LeftWindow";

// Graph Visualizer component to be called in visualizer page.
export default class GraphVisualizer extends React.Component {
  // constructor of the GraphVisualizer class. Contains the states:
  // config: the configuration used for the Graph component
  // generatedConfig:
  // data: the data used for the Graph component
  // nodeIdToBeRemoved: id of the node to be removed which is used in the onClickRemoveNode function
  // addNodeName: a string used by the onClickAddNode function to set the new node name
  // removeNodeName: a string used by the onClickRemoveNode function to delete the desired node
  // addNodePlaceholder: a string used by the addNode input box
  // removeNodePlaceholder: a string used by the removeNode input box
  constructor(props) {
    super(props);

    // Default data used by the Graph component
    const data = {
      //apply characteristics for each node
      nodes: [
        { id: "Harry", color: "", strokeColor: "" },
        { id: "Sally", color: "", strokeColor: "" },
        { id: "Alice", color: "", strokeColor: "" }
      ],
      links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" }
      ]
    };

    const neighbors = [
      { Harry: ["Sally", "Alice"] },
      { Sally: ["Harry"] },
      { Alice: ["Harry"] }
    ];

    // Default configurations used by the Graph component
    const config = {
      nodeHighlightBehavior: true,
      automaticRearrangeAfterDropNode: true,
      height: window.innerHeight * 0.811,
      width: window.innerWidth,
      node: {
        color: "#c34f6b",
        size: 500,
        highlightStrokeColor: "blue"
      },
      link: {
        highlightColor: "lightblue"
      }
    };

    const algoData = {
      startNode: "",
      endNode: "",
      neighbors: neighbors,
      algorithm: "dfs",
      stack: [],
      queue: []
    };

    // Class states
    this.state = {
      config,
      generatedConfig: {},
      data,
      algoData,
      nodeColor: "#c34f6b",
      strokeColor: "",
      nodeIdToBeRemoved: null,
      addNodeName: "",
      removeNodeName: "",
      addLink: "",
      addNodePlaceholder: "Enter node to add",
      removeNodePlaceholder: "Enter node to remove",
      addLinkPlaceholder: "Enter as: source, target",
      removeLinkPlaceholder: "Enter as: source, target"
    };
  }

  // Function called by the addButton. Makes sure the addNodeName state is not an
  // empty string. Then checks that the data.nodes array in the state is NOT empty and
  // that the length is greater than 0. Then it creates a new node with the value of the
  // addNoneName and links it to a target node if given. Then it updates the state of
  // data array of the class and resets the addNodeName and addNodePlaceholder.

  onClickAddNode = () => {
    // Checks if the addNodeName is an empty string
    if (this.state.addNodeName === "") {
      this.setState({
        addNodePlaceholder: "Please enter a value!"
      });
      return;
    }

    // Adds node to the nodes array in the state's data
    if (this.state.data.nodes && this.state.data.nodes.length) {
      const newNode = `${this.state.addNodeName}`;

      this.state.data.nodes.push({ id: newNode });

      this.setState({
        data: this.state.data
      });
    } else {
      // 1st node
      const data = {
        nodes: [{ id: "Node 1" }],
        links: []
      };

      this.setState({ data });
    }

    // Adds node to the neighbor array in the state's algoData
    let found = false;
    for (let i = 0; i < this.state.algoData.neighbors.length; i++) {
      if (this.state.addNodeName in this.state.algoData.neighbors[i]) {
        found = true;
      }
    }
    if (!found) {
      var name = this.state.addNodeName;
      var newNeighbor = {};
      newNeighbor[name] = [];

      this.state.algoData.neighbors.push(newNeighbor);
      this.setState({ algoData: this.state.algoData });
    }
    console.log(this.state.algoData.neighbors);

    this.setState({
      addNodeName: "",
      addNodePlaceholder: "Enter node to add"
    });
  };

  // Function called by the removeNode button. Makes sure the removeNodeName is not an empty string.
  // Then, makes sure the data.nodes array in the class state is NOT empty and the data.nodes.length
  // is greater than 0. Then filters the original nodes and links arrays in the data array using the
  // removeNodeName of the class state. THen update the class data state along with resetting
  // removeNodeName and removeNodePlaceholder.
  onClickRemoveNode = () => {
    if (this.state.removeNodeName === "") {
      this.setState({
        removeNodePlaceholder: "Please enter a value!"
      });
      return;
    }
    if (this.state.data.nodes && this.state.data.nodes.length >= 1) {
      const nodes = this.state.data.nodes.filter(
        l => l.id !== this.state.removeNodeName
      );
      const links = this.state.data.links.filter(
        l =>
          l.source !== this.state.removeNodeName &&
          l.target !== this.state.removeNodeName
      );
      const data = { nodes, links };

      this.setState({
        data,
        removeNodeName: "",
        removeNodePlaceholder: "Enter node to remove"
      });
    }
  };

  onClickAddLink = () => {
    if (this.state.addLink === "") {
      return;
    }
    if (this.state.data.nodes && this.state.data.nodes.length) {
      let source, target;
      [source, target] = this.state.addLink.split(/[ ,]+/).filter(function(e) {
        return e.trim().length > 0;
      });

      var sourceExists, targetExists;
      sourceExists = targetExists = false;

      for (var i = 0; i < this.state.data.nodes.length; i++) {
        if (this.state.data.nodes[i].id === source) {
          sourceExists = true;
        }
        if (this.state.data.nodes[i].id === target) {
          targetExists = true;
        }
      }

      if (!sourceExists || !targetExists) {
        console.log("NODE DOES NOT EXIST!");
        this.setState({
          addLink: "",
          addLinkPlaceholder: "Enter as: source, target"
        });
        return;
      }

      for (var j = 0; j < this.state.data.links.length; j++) {
        if (
          this.state.data.links[j].source === source &&
          this.state.data.links[j].target === target
        ) {
          console.log("ALREADY EXISTS!");
          this.setState({
            addLink: "",
            addLinkPlaceholder: "Enter as: source, target"
          });
          return;
        }
      }

      this.state.data.links.push({
        source: source,
        target: target
      });

      var found = false;

      for (let i = 0; i < this.state.algoData.neighbors.length; i++) {
        if (source in this.state.algoData.neighbors[i]) {
          this.state.algoData.neighbors[i][source].push(target);
          found = true;
        }
      }

      if (!found) {
        var newNeighbor = {};
        newNeighbor[source] = [target];
        this.state.algoData.neighbors.push(newNeighbor);
      }

      this.setState({
        addLink: "",
        addLinkPlaceholder: "Enter as: source, target"
      });
    }
  };

  onClickRemoveLink = () => {
    if (this.state.removeLink === "") {
      return;
    }
    if (this.state.data.nodes && this.state.data.nodes.length) {
      let source, target;
      [source, target] = this.state.removeLink
        .split(/[ ,]+/)
        .filter(function(e) {
          return e.trim().length > 0;
        });

      var sourceExists, targetExists;
      sourceExists = targetExists = false;

      for (var i = 0; i < this.state.data.nodes.length; i++) {
        if (this.state.data.nodes[i].id === source) {
          sourceExists = true;
        }
        if (this.state.data.nodes[i].id === target) {
          targetExists = true;
        }
      }

      if (!sourceExists || !targetExists) {
        console.log("NODE DOES NOT EXIST!");
        this.setState({
          removeLink: "",
          removeLinkPlaceholder: "Enter as: source, target"
        });
        return;
      }

      const links = this.state.data.links.filter(
        l => l.source !== source && l.target !== target
      );

      const data = { nodes: this.state.data.nodes, links };

      for (let i = 0; i < this.state.algoData.neighbors.length; i++) {
        if (source in this.state.algoData.neighbors[i]) {
          this.state.algoData.neighbors[i][
            source
          ] = this.state.algoData.neighbors[i][source].filter(
            l => l !== target
          );
        }
      }

      this.setState({
        data: data,
        removeLink: "",
        removeLinkPlaceholder: "Enter as: source, target"
      });
    }
  };

  // Handler function that is used by the addNode input box, keeps track of the changes
  // and then updates the addNodeName of the state accordingly.
  _addNodeHandleChange = event => {
    this.setState({ addNodeName: event.target.value });
  };

  // Handler function that is used by the removeNode input box, keeps track of the changes
  // and then updates the removeNodeName of the state accordingly.
  _removeNodeHandleChange = event => {
    this.setState({ removeNodeName: event.target.value });
  };

  _addLinkHandleChange = event => {
    this.setState({ addLink: event.target.value });
  };

  _removeLinkHandleChange = event => {
    this.setState({ removeLink: event.target.value });
  };

  _addStartNodeHandleChange = event => {
    const algoData = {
      startNode: event.target.value,
      endNode: this.state.algoData.endNode,
      neighbors: this.state.algoData.neighbors,
      algorithm: this.state.algoData.algorithm,
      startAlgorithm: this.state.algoData.startAlgorithm,
      stack: this.state.algoData.stack
    };

    this.setState({ algoData });
  };

  _addEndNodeHandleChange = event => {
    const algoData = {
      startNode: this.state.algoData.startNode,
      endNode: event.target.value,
      neighbors: this.state.algoData.neighbors,
      algorithm: this.state.algoData.algorithm,
      startAlgorithm: this.state.algoData.startAlgorithm,
      stack: this.state.algoData.stack
    };

    this.setState({ algoData });
  };
  // Handler function that listens to the Remove key press
  // and calls the onClickAddNode function.
  _handleAddKeyEnter = e => {
    if (e.key === "Enter") {
      this.onClickAddNode();
    }
  };

  // Handler function that listens to the Enter key press
  // and calls the onClickRemoveNode function.
  _handleRemoveKeyEnter = e => {
    if (e.key === "Enter") {
      this.onClickRemoveNode();
    }
  };

  _handleLinkKeyEnter = e => {
    if (e.key === "Enter") {
      this.onClickAddLink();
    }
  };

  _handleRemoveLinkKeyEnter = e => {
    if (e.key === "Enter") {
      this.onClickRemoveLink();
    }
  };

  _onRightClickNode = () => {
    console.log("RIGHT CLICK");
  };

  //Functions for state handling
  nodeSizeHandler = size => {
    const config = this.state.config;

    config.node.size = size;

    this.setState({
      config: config
    });
  };

  nodeColorHandler = color => {
    const config = this.state.config;

    config.node.color = color;

    this.setState({
      config: config
    });
  };

  linkColorHandler = linkColor => {
    const config = this.state.config;

    config.link.color = linkColor;

    this.setState({
      config: config
    });
  };

  startAlgorithm = () => {
    if (this.state.algoData.algorithm === "dfs") {
      this.depthFirstSearch();
    } else if (this.state.algoData.algorithm === "bfs") {
      this.breadthFirstSearch();
    } else if (this.state.algoData.algorithm === "djk") {
    }
  };

  depthFirstSearch = () => {
    if (
      this.state.algoData.startNode !== "" &&
      this.state.algoData.endNode !== ""
    ) {
      const startNode = this.state.algoData.startNode;
      const endNode = this.state.algoData.endNode;
      var startNodeIsValid = false;
      var endNodeIsValid = false;

      for (let i = 0; i < this.state.algoData.neighbors.length; i++) {
        if (startNode in this.state.algoData.neighbors[i]) {
          startNodeIsValid = true;
        }
        if (endNode in this.state.algoData.neighbors[i]) {
          endNodeIsValid = true;
        }
      }

      if (startNodeIsValid && endNodeIsValid) {
        if (this.state.algoData.stack == null) {
          const algoData = {
            startNode: this.state.algoData.stack,
            endNode: this.state.algoData.endNode,
            neighbors: this.state.algoData.neighbors,
            algorithm: this.state.algoData.algorithm,
            startAlgorithm: this.state.algoData.startAlgorithm,
            stack: []
          };
          this.setState({ algoData });
        }
        this.state.algoData.stack = [];
        this.state.algoData.stack.push(startNode);
        const visited = {};
        var counter = 0;
        visited[startNode] = startNode;

        while (
          this.state.algoData.stack !== undefined ||
          this.state.algoData.stack.length !== 0
        ) {
          const curr = this.state.algoData.stack.pop();
          if (curr === endNode) {
            for (let i = 0; i < 5; i++) {
              setTimeout(() => this.foundTarget(endNode), 1200 * counter);
              counter++;
            }
            console.log("FOUND TARGET");
            this.resetState(counter);
            return;
          }
          setTimeout(
            () => this.highlightHandler(curr, counter),
            1000 * (counter + 1)
          );
          counter++;
          console.log(curr);

          for (let i = 0; i < this.state.algoData.neighbors.length; i++) {
            if (
              curr in this.state.algoData.neighbors[i] &&
              this.state.algoData.neighbors[i][curr] !== null &&
              this.state.algoData.neighbors[i][curr].length !== 0
            ) {
              for (
                let j = 0;
                j < this.state.algoData.neighbors[i][curr].length;
                j++
              ) {
                const newNode = this.state.algoData.neighbors[i][curr][j];
                if (newNode in visited) {
                  console.log("VISITED");
                  continue;
                }

                this.state.algoData.stack.push(newNode);
                visited[newNode] = newNode;
              }
            }
          }
        }

        // Reset node color state after DFS is done
        this.resetState();
      } else {
        console.log("FAILURE!!!");
      }
    } else {
      console.log("FAIL");
      console.log(
        this.state.algoData.startNode,
        this.state.algoData.endNode,
        this.state.algoData.algorithm
      );
    }
  };

  breadthFirstSearch = () => {
    if (
      this.state.algoData.startNode !== "" &&
      this.state.algoData.endNode !== ""
    ) {
      const startNode = this.state.algoData.startNode;
      const endNode = this.state.algoData.endNode;
      var startNodeIsValid = false;
      var endNodeIsValid = false;

      for (let i = 0; i < this.state.algoData.neighbors.length; i++) {
        if (startNode in this.state.algoData.neighbors[i]) {
          startNodeIsValid = true;
        }
        if (endNode in this.state.algoData.neighbors[i]) {
          endNodeIsValid = true;
        }
      }

      if (startNodeIsValid && endNodeIsValid) {
        if (this.state.algoData.stack == null) {
          const algoData = {
            startNode: this.state.algoData.stack,
            endNode: this.state.algoData.endNode,
            neighbors: this.state.algoData.neighbors,
            algorithm: this.state.algoData.algorithm,
            startAlgorithm: this.state.algoData.startAlgorithm,
            stack: []
          };
          this.setState({ algoData });
        }
        this.state.algoData.queue = [];
        this.state.algoData.queue.push(startNode);
        const visited = {};
        var counter = 0;
        visited[startNode] = startNode;

        while (
          this.state.algoData.queue !== undefined ||
          this.state.algoData.queue.length !== 0
        ) {
          const curr = this.state.algoData.queue.shift();
          if (curr === endNode) {
            for (let i = 0; i < 5; i++) {
              setTimeout(() => this.foundTarget(endNode), 1200 * counter);
              counter++;
            }
            console.log("FOUND TARGET");
            this.resetState(counter);
            return;
          }

          setTimeout(
            () => this.highlightHandler(curr, counter),
            1000 * (counter + 1)
          );
          counter++;

          for (let i = 0; i < this.state.algoData.neighbors.length; i++) {
            if (
              curr in this.state.algoData.neighbors[i] &&
              this.state.algoData.neighbors[i][curr] !== null &&
              this.state.algoData.neighbors[i][curr].length !== 0
            ) {
              for (
                let j = 0;
                j < this.state.algoData.neighbors[i][curr].length;
                j++
              ) {
                const newNode = this.state.algoData.neighbors[i][curr][j];
                if (newNode in visited) {
                  console.log("VISITED");
                  continue;
                }

                this.state.algoData.queue.push(newNode);
                visited[newNode] = newNode;
              }
            }
          }
        }

        // Reset node color state after DFS is done
        this.resetState();
      } else {
        console.log("FAILURE!!!");
      }
    } else {
      console.log("FAIL");
      console.log(
        this.state.algoData.startNode,
        this.state.algoData.endNode,
        this.state.algoData.algorithm
      );
    }
  };

  //Node Highlight Rotation Test -- Use Algorithm functions in replace
  rotateHandler = () => {
    //provide index "i" to invoke a delay
    this.state.data.nodes.forEach((node, i) => {
      setTimeout(() => this.highlightHandler(node.id, i), 1500 * (i + 1));
    });
  };

  //reset node color back to original
  resetState = counter => {
    const myP = new Promise(function(resolve, reject) {
      // promise for time delay
      setTimeout(() => resolve("Successful Switch!"), 2000 * (counter - 2));
    });

    this.sucessHandler = msg => {
      // If things go well
      console.log(msg); //check console for msg from resolve
      const origNodes = this.state.data.nodes;

      origNodes.forEach(node => {
        node.color = this.state.nodeColor;
        node.strokeColor = this.state.strokeColor;
      });

      this.setState({
        ...(this.state.data.nodes = origNodes)
      });
    };
    //calls when promise is resolved
    myP.then(this.sucessHandler);
  };

  //Highlight Node -> Parameter: Node id
  highlightHandler = id => {
    //Get index of the node
    const nodeIndex = this.state.data.nodes.findIndex(node => {
      //return node index that matches the passed id
      return node.id === id;
    });

    const origNode = {
      ...this.state.data.nodes[nodeIndex]
    };

    const newNode = {
      ...this.state.data.nodes[nodeIndex]
    };

    //Set colors for new node
    newNode.color = "gold";
    newNode.strokeColor = "orange"; //node outer color

    //create a copy of the entire nodes state
    const nodes = [...this.state.data.nodes];
    //store newNode updates at the proper index of the copy
    nodes[nodeIndex] = newNode;

    //update original state with the new state
    this.setState({
      ...(this.state.data.nodes = nodes)
    });
    //call to reset back to original state
    //this.resetState(origNode, nodeIndex);
  };

  foundTarget = id => {
    //Get index of the node
    const nodeIndex = this.state.data.nodes.findIndex(node => {
      //return node index that matches the passed id
      return node.id === id;
    });
    console.log("Found target " + this.state.data.nodes[nodeIndex].id);

    const origNode = {
      ...this.state.data.nodes[nodeIndex]
    };

    const newNode = {
      ...this.state.data.nodes[nodeIndex]
    };

    origNode.color = "gold";
    origNode.strokeColor = "orange"; //node outer color

    //Set colors for new node
    newNode.color = "#28f655";
    newNode.strokeColor = "#009f23"; //node outer color

    //create a copy of the entire nodes state
    const nodes = [...this.state.data.nodes];

    for (let i = 0; i < 5; i++) {
      console.log(i);
      //store newNode updates at the proper index of the copy
      nodes[nodeIndex] = newNode;
      this.setState({
        ...(this.state.data.nodes = nodes)
      });

      setTimeout(() => {
        console.log("POP");
        nodes[nodeIndex] = origNode;
        this.setState({ ...(this.state.data.nodes = nodes) });
      }, 500);
    }
  };

  // Main function of the React component. Returns what is displayed to the user. This includes
  // the left window, right window, the traversal log and the main graph visualizer component.
  render() {
    const neighborItems = this.state.algoData.stack.map(
      (item) => {return <li class="list-group-item">{item}</li>}
    );
    return (
      // Main display which contains the leftWindow, rightWindow, and the Graph Visualizer
      <div class="box">

        <div class="tLog fixed-bottom">
        <ul class="list-group list-group-flush">
            {neighborItems}
          </ul>
        </div>
        
        <div class="leftWindow">
          <Dropdown id="graphConfig" className="LeftWindow pt-3 ml-2">
            <Dropdown.Toggle
              variant="outline-danger"
              id="dropdown-basic"
              className="dropdown font-weight-light"
            >
              Graph Configurations
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <h5 class="font-weight-light pt-3 h6"> Node Size </h5>
              <div id="node" class="input-group mb-3">
                <input
                  class="L"
                  id="color"
                  type="text"
                  placeholder="Enter node size"
                  onKeyPress={e => {
                    if (e.key === "Enter")
                      this.nodeSizeHandler(
                        document.getElementById("size").value
                      );
                  }}
                />
              </div>

              <h5 class="font-weight-light h6"> Node Color </h5>
              <div id="node" class="input-group mb-3">
                <input
                  class="L"
                  id="color"
                  type="text"
                  name="nodeColor"
                  placeholder="Enter node color"
                  onKeyPress={e => {
                    if (e.key === "Enter")
                      this.nodeColorHandler(
                        document.getElementById("color").value
                      );
                  }}
                />
              </div>

              <h5 class="font-weight-light h6"> Link Color </h5>
              <div id="node" class="input-group mb-3">
                <input
                  class="L linkColor"
                  id="linkColor"
                  type="text"
                  name="linkColor"
                  placeholder="Enter link color"
                  onKeyPress={e => {
                    if (e.key === "Enter")
                      this.linkColorHandler(
                        document.getElementById("linkColor").value
                      );
                  }}
                />
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown id="algo" className="pt-3 ml-2">
            <Dropdown.Toggle
              variant="outline-danger"
              id="dropdown-basic"
              className="dropdown font-weight-light"
            >
              Algorithm Settings
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className="mt-2 mb-2">
                <Form.Check
                  className="mr-3"
                  type="checkbox"
                  id="direct"
                  label="Directed"
                />
                <Form.Check type="checkbox" id="weight" label="Weighted" />
              </div>

              <div id="node" class="input-group mb-3">
                <h5 class="font-weight-light h6 pt-3"> Start Node </h5>
                <div class="input-group mb-3">
                  <input
                    class="L"
                    id="sNode"
                    type="text"
                    name="startNode"
                    placeholder="Enter starting node"
                    onChange={this._addStartNodeHandleChange}
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
                    onChange={this._addEndNodeHandleChange}
                    //onKeyPress={this._handleLinkKeyEnter}
                  />
                </div>

                <Dropdown className="dropdown pt-2" drop="right">
                  <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                    Algorithm
                  </Dropdown.Toggle>

                  <Dropdown.Menu id="algoSelection">
                    <Dropdown.Item
                      eventKey="1"
                      onSelect={() => (this.state.algoData.algorithm = "dfs")}
                    >
                      Depth-First Search
                    </Dropdown.Item>
                    <Dropdown.Item
                      evenyKey="2"
                      onSelect={() => (this.state.algoData.algorithm = "bfs")}
                    >
                      Breadth-First Search
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="3"
                      onSelect={() => (this.state.algoData.algorithm = "djk")}
                    >
                      Dijkstra's
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Button
                  className="submit mt-2 font-weight-normal"
                  type="submit" //activate Algorithm
                  variant="outline-success"
                  onClick={() => this.startAlgorithm()} //Should call selected algorithm
                >
                  Start Algorithm
                </Button>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div class="rightWindow">
          <Dropdown id="graphConfig" className="LeftWindow pt-3 ml-2">
            <Dropdown.Toggle
              variant="outline-danger"
              id="dropdown-basic"
              className="dropdown font-weight-light"
            >
              Nodes & Links
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <h5 class="font-weight-light pt-2"> Add node: </h5>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button
                    onClick={this.onClickAddNode}
                    type="button"
                    class="btn btn-outline-danger"
                    id="button-addon1"
                  >
                    <h6 class="align-middle"> + </h6>
                  </button>
                </div>
                <input
                  type="text"
                  class="nodeInput"
                  name="addNodeName"
                  placeholder={this.state.addNodePlaceholder}
                  value={this.state.addNodeName}
                  onChange={this._addNodeHandleChange}
                  onKeyPress={this._handleAddKeyEnter}
                />
              </div>

              <h5 class="font-weight-light"> Remove node: </h5>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button
                    onClick={this.onClickRemoveNode}
                    type="button"
                    class="btn btn-outline-danger pl-3 pr-2.5"
                    id="button-addon1"
                  >
                    <h6 class="align-middle"> - </h6>
                  </button>
                </div>
                <input
                  type="text"
                  class="nodeInput"
                  name="removeNodeName"
                  placeholder={this.state.removeNodePlaceholder}
                  value={this.state.removeNodeName}
                  onChange={this._removeNodeHandleChange}
                  onKeyPress={this._handleRemoveKeyEnter}
                />
              </div>

              <h5 class="font-weight-light"> Add link: </h5>
              <input
                class="linkInput"
                type="text"
                name="addLink"
                placeholder={this.state.addLinkPlaceholder}
                value={this.state.addLink}
                onChange={this._addLinkHandleChange}
                onKeyPress={this._handleLinkKeyEnter}
              />

              <h5 class="font-weight-light pt-3"> Remove link: </h5>
              <input
                class="linkInput"
                type="text"
                name="removeLink"
                placeholder={this.state.removeLinkPlaceholder}
                value={this.state.removeLink}
                onChange={this._removeLinkHandleChange}
                onKeyPress={this._handleRemoveLinkKeyEnter}
              />
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown id="graphConfig" className="LeftWindow pt-3 ml-2">
            <Dropdown.Toggle
              variant="outline-danger"
              id="dropdown-basic"
              className="dropdown font-weight-light"
            >
              Show Node List
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className="json-data-container mt-3">
                <TreeView class="nodes" key="nodes" nodeLabel="Nodes">
                  {this.state.data.nodes.map((node, i) => {
                    const type = node.type;
                    const name = node.id;
                    for (i = 0; i < this.state.algoData.neighbors.length; i++) {
                      if (name in this.state.algoData.neighbors[i]) {
                        return (
                          <TreeView key={type + "|" + i} nodeLabel={name}>
                            <TreeView
                              key={type + "|" + i}
                              nodeLabel="neighbors: "
                            >
                              {this.state.algoData.neighbors[i][name].map(
                                (neighbor, i) => {
                                  return (
                                    <div className="info"> {neighbor}</div>
                                  );
                                }
                              )}
                            </TreeView>
                          </TreeView>
                        );
                      }
                    }
                  })}
                </TreeView>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Graph
          //Entry point for passing data to library to be displayed
          id="graph-id"
          data={this.state.data}
          config={this.state.config}
          onRightClickNode={this._onRightClickNode}
        />
      </div>
    );
  }
}
