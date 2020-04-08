import React from "../../../../node_modules/react";
import Graph from "../../React-D3-Graph/Graph/graph/Graph";
import TreeView from "../../../../node_modules/react-treeview";
import ReactTooltip from "../../../../node_modules/react-tooltip";
import { Dropdown, Form, Button, Tabs, Tab} from "react-bootstrap";
import "./GraphVisualizer.css";
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
        { id: "Michael", color: "", strokeColor: "" },
        { id: "Jim", color: "", strokeColor: "" },
        { id: "Pam", color: "", strokeColor: "" },
        { id: "Dwight", color: "", strokeColor: "" },
        { id: "Angela", color: "", strokeColor: "" },
        { id: "Jan", color: "", strokeColor: "" },
        { id: "Kevin", color: "", strokeColor: "" },
        { id: "Andy", color: "", strokeColor: "" },
        { id: "Toby", color: "", strokeColor: "" },
        { id: "Erin", color: "", strokeColor: "" },
        { id: "Karen", color: "", strokeColor: "" },
        { id: "Stanley", color: "", strokeColor: "" },
        { id: "Phyllis", color: "", strokeColor: "" },
        { id: "Oscar", color: "", strokeColor: "" },
        { id: "Ryan", color: "", strokeColor: "" },
        { id: "Kelly", color: "", strokeColor: "" },
        { id: "Holly", color: "", strokeColor: "" },
        { id: "Senator", color: "", strokeColor: "" },
        { id: "Roy", color: "", strokeColor: "" },
        { id: "Bob Vance, Vance Refrigeration" },
      ],
      links: [
        { source: "Michael", target: "Jan" },
        { source: "Michael", target: "Holly" },
        { source: "Michael", target: "Ryan" },
        { source: "Michael", target: "Jim" },
        { source: "Michael", target: "Toby" },
        { source: "Jim", target: "Pam" },
        { source: "Jim", target: "Karen" },
        { source: "Jim", target: "Dwight" },
        { source: "Pam", target: "Roy" },
        { source: "Dwight", target: "Angela" },
        { source: "Dwight", target: "Andy" },
        { source: "Andy", target: "Erin" },
        { source: "Ryan", target: "Kelly" },
        { source: "Angela", target: "Oscar" },
        { source: "Angela", target: "Kevin" },
        { source: "Angela", target: "Senator" },
        { source: "Oscar", target: "Senator" },
        { source: "Oscar", target: "Phyllis" },
        { source: "Phyllis", target: "Stanley" },
        { source: "Phyllis", target: "Bob Vance, Vance Refrigeration" },
      ],
    };

    const neighbors = [
      { Michael: [("Jan", 10), "Holly", "Ryan", "Jim", "Toby"] },
      { Jim: ["Pam", "Karen", "Dwight"] },
      { Pam: ["Roy"] },
      { Dwight: ["Angela", "Andy"] },
      { Andy: ["Erin"] },
      { Ryan: ["Kelly"] },
      { Angela: ["Oscar", "Kevin", "Senator"] },
      { Oscar: ["Senator", "Phyllis"] },
      { Phyllis: ["Stanley", "Bob Vance, Vance Refrigeration"] },
    ];

    // Default configurations used by the Graph component
    const config = {
      nodeHighlightBehavior: true,
      automaticRearrangeAfterDropNode: true,
      height: window.innerHeight * 0.86,
      width: window.innerWidth,
      node: {
        color: "#c34f6b",
        size: 500,
        highlightStrokeColor: "blue",
      },
      link: {
        highlightColor: "lightblue",
      },
    };

    const algoData = {
      startNode: "",
      endNode: "",
      neighbors: neighbors,
      algorithm: "dfs",
      stack: [],
      queue: [],
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
      removeLinkPlaceholder: "Enter as: source, target",
      key: '' //state for Algorithm tabs 
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
        addNodePlaceholder: "Please enter a value!",
      });
      return;
    }

    // Adds node to the nodes array in the state's data
    if (this.state.data.nodes && this.state.data.nodes.length) {
      const newNode = `${this.state.addNodeName}`;

      this.state.data.nodes.push({ id: newNode });

      this.setState({
        data: this.state.data,
      });
    } else {
      // 1st node
      const data = {
        nodes: [{ id: "Node 1" }],
        links: [],
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
      addNodePlaceholder: "Enter node to add",
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
        removeNodePlaceholder: "Please enter a value!",
      });
      return;
    }
    if (this.state.data.nodes && this.state.data.nodes.length >= 1) {
      const nodes = this.state.data.nodes.filter(
        (l) => l.id !== this.state.removeNodeName
      );
      const links = this.state.data.links.filter(
        (l) =>
          l.source !== this.state.removeNodeName &&
          l.target !== this.state.removeNodeName
      );
      const data = { nodes, links };

      this.setState({
        data,
        removeNodeName: "",
        removeNodePlaceholder: "Enter node to remove",
      });
    }
  };

  onClickAddLink = () => {
    if (this.state.addLink === "") {
      return;
    }
    if (this.state.data.nodes && this.state.data.nodes.length) {
      let source, target;
      [source, target] = this.state.addLink.split(/[ ,]+/).filter(function (e) {
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
          addLinkPlaceholder: "Enter as: source, target",
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
            addLinkPlaceholder: "Enter as: source, target",
          });
          return;
        }
      }

      this.state.data.links.push({
        source: source,
        target: target,
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
        addLinkPlaceholder: "Enter as: source, target",
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
        .filter(function (e) {
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
          removeLinkPlaceholder: "Enter as: source, target",
        });
        return;
      }

      const links = this.state.data.links.filter(
        (l) => l.source !== source && l.target !== target
      );

      const data = { nodes: this.state.data.nodes, links };

      for (let i = 0; i < this.state.algoData.neighbors.length; i++) {
        if (source in this.state.algoData.neighbors[i]) {
          this.state.algoData.neighbors[i][
            source
          ] = this.state.algoData.neighbors[i][source].filter(
            (l) => l !== target
          );
        }
      }

      this.setState({
        data: data,
        removeLink: "",
        removeLinkPlaceholder: "Enter as: source, target",
      });
    }
  };

  // Handler function that is used by the addNode input box, keeps track of the changes
  // and then updates the addNodeName of the state accordingly.
  _addNodeHandleChange = (event) => {
    this.setState({ addNodeName: event.target.value });
  };

  // Handler function that is used by the removeNode input box, keeps track of the changes
  // and then updates the removeNodeName of the state accordingly.
  _removeNodeHandleChange = (event) => {
    this.setState({ removeNodeName: event.target.value });
  };

  _addLinkHandleChange = (event) => {
    this.setState({ addLink: event.target.value });
  };

  _removeLinkHandleChange = (event) => {
    this.setState({ removeLink: event.target.value });
  };

  _addStartNodeHandleChange = (event) => {
    const algoData = {
      startNode: event.target.value,
      endNode: this.state.algoData.endNode,
      neighbors: this.state.algoData.neighbors,
      algorithm: this.state.algoData.algorithm,
      startAlgorithm: this.state.algoData.startAlgorithm,
      stack: this.state.algoData.stack,
    };

    this.setState({ algoData });
  };

  _addEndNodeHandleChange = (event) => {
    const algoData = {
      startNode: this.state.algoData.startNode,
      endNode: event.target.value,
      neighbors: this.state.algoData.neighbors,
      algorithm: this.state.algoData.algorithm,
      startAlgorithm: this.state.algoData.startAlgorithm,
      stack: this.state.algoData.stack,
    };

    this.setState({ algoData });
  };
  // Handler function that listens to the Remove key press
  // and calls the onClickAddNode function.
  _handleAddKeyEnter = (e) => {
    if (e.key === "Enter") {
      this.onClickAddNode();
    }
  };

  // Handler function that listens to the Enter key press
  // and calls the onClickRemoveNode function.
  _handleRemoveKeyEnter = (e) => {
    if (e.key === "Enter") {
      this.onClickRemoveNode();
    }
  };

  _handleLinkKeyEnter = (e) => {
    if (e.key === "Enter") {
      this.onClickAddLink();
    }
  };

  _handleRemoveLinkKeyEnter = (e) => {
    if (e.key === "Enter") {
      this.onClickRemoveLink();
    }
  };

  _onRightClickNode = () => {
    console.log("RIGHT CLICK");
  };

  //Functions for state handling
  nodeSizeHandler = (size) => {
    const config = this.state.config;

    config.node.size = size;

    this.setState({
      config: config,
    });
  };

  nodeColorHandler = (color) => {
    const config = this.state.config;

    config.node.color = color;

    this.setState({
      config: config,
    });
  };

  linkColorHandler = (linkColor) => {
    const config = this.state.config;

    config.link.color = linkColor;

    this.setState({
      config: config,
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
        console.log(startNode, endNode);
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
            stack: [],
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
            stack: [],
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
  resetState = (counter) => {
    const myP = new Promise(function (resolve, reject) {
      // promise for time delay
      setTimeout(() => resolve("Successful Switch!"), 2000 * (counter - 2));
    });

    this.sucessHandler = (msg) => {
      // If things go well
      console.log(msg); //check console for msg from resolve
      const origNodes = this.state.data.nodes;

      origNodes.forEach((node) => {
        node.color = this.state.nodeColor;
        node.strokeColor = this.state.strokeColor;
      });

      this.setState({
        ...(this.state.data.nodes = origNodes),
      });
    };
    //calls when promise is resolved
    myP.then(this.sucessHandler);
  };

  //Highlight Node -> Parameter: Node id
  highlightHandler = (id) => {
    //Get index of the node
    const nodeIndex = this.state.data.nodes.findIndex((node) => {
      //return node index that matches the passed id
      return node.id === id;
    });

    const origNode = {
      ...this.state.data.nodes[nodeIndex],
    };

    const newNode = {
      ...this.state.data.nodes[nodeIndex],
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
      ...(this.state.data.nodes = nodes),
    });
    //call to reset back to original state
    //this.resetState(origNode, nodeIndex);
  };

  foundTarget = (id) => {
    //Get index of the node
    const nodeIndex = this.state.data.nodes.findIndex((node) => {
      //return node index that matches the passed id
      return node.id === id;
    });
    console.log("Found target " + this.state.data.nodes[nodeIndex].id);

    const origNode = {
      ...this.state.data.nodes[nodeIndex],
    };

    const newNode = {
      ...this.state.data.nodes[nodeIndex],
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
        ...(this.state.data.nodes = nodes),
      });

      setTimeout(() => {
        console.log("POP");
        nodes[nodeIndex] = origNode;
        this.setState({ ...(this.state.data.nodes = nodes) });
      }, 500);
    }
  };

  //sets current algorithm tab
  eventKeyHandler = (key) => {
      let tabKey = this.state.key
      tabKey = key
     
      this.setState({
        key: tabKey
      })
  }


  // Main function of the React component. Returns what is displayed to the user. This includes
  // the left window, right window, the traversal log and the main graph visualizer component.
  render() {
  
    const neighborItems = this.state.algoData.stack.map((item) => {
      return <li class="list-group-item">{item}</li>;

    });

    return (
      // Main display which contains the leftWindow, rightWindow, and the Graph Visualizer
      <div class="box">
        <div class="tLog fixed-bottom">
          <ul class="list-group list-group-flush">{neighborItems}</ul>
        </div>

        <div class='Tab'>
        <Tabs
            id="controlled-tab-example"
            activeKey={this.state.key}
            onSelect={event => this.eventKeyHandler(event)}
          >
            <Tab eventKey="1" title="Depth-First Search">
            </Tab>
            <Tab eventKey="2" title="Breadth-First Search">
            </Tab>
            <Tab eventKey="3" title="Dijkstra's">
            </Tab>
          </Tabs>
        </div>


        <div class="leftWindow">
          <Dropdown id="graphConfig" className="LeftWindow pt-3 ml-2">
            <Dropdown.Toggle
              data-tip="Graph Settings"
              data-for="buttons"
              variant="outline-danger"
              id="dropdown-basic"
              className="dropdown font-weight-light"
            >
              <div class="icon">
                <svg
                  class="bi bi-gear"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <h5 class="font-weight-light pt-3 h6"> Node Size </h5>
              <div id="node" class="input-group mb-3">
                <input
                  class="L"
                  id="size"
                  type="text"
                  placeholder="Enter node size"
                  onKeyPress={(e) => {
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
                  onKeyPress={(e) => {
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
                  onKeyPress={(e) => {
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
              data-tip="Algorithm Settings"
              data-for="buttons"
              variant="outline-danger"
              id="dropdown-basic"
              className="dropdown font-weight-light"
            >
              <div class="icon">
                <svg
                  class="bi bi-code-slash"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.854 4.146a.5.5 0 010 .708L1.707 8l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm6.292 0a.5.5 0 000 .708L14.293 8l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0zm-.999-3.124a.5.5 0 01.33.625l-4 13a.5.5 0 01-.955-.294l4-13a.5.5 0 01.625-.33z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className="mt-2 mb-2">
                <Form.Check
                  className="checkboxes"
                  type="checkbox"
                  id="direct"
                  label="Directed"
                />
                <Form.Check
                  className="checkboxes"
                  type="checkbox"
                  id="weight"
                  label="Weighted"
                />
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
                  <Dropdown.Toggle variant="outline-info" id="dropdown-two">
                    Algorithm
                  </Dropdown.Toggle>

                  <Dropdown.Menu id="algoSelection">
                    <Dropdown.Item
                      eventKey="1"
                      onSelect={() => (this.state.algoData.algorithm = "dfs")}
                      onSelect={(event) => this.eventKeyHandler(event)} //Tab selector
                    >
                      Depth-First Search
                    </Dropdown.Item>
                    <Dropdown.Item
                      evenyKey="2"
                      onSelect={() => (this.state.algoData.algorithm = "bfs")}
                      onSelect={(event) => this.eventKeyHandler(2)} //Tab Selector
                    >
                      Breadth-First Search
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="3"
                      onSelect={() => (this.state.algoData.algorithm = "djk")}
                      onSelect={(event) => this.eventKeyHandler(event)}
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

          <Dropdown id="graphConfig" className="LeftWindow pt-3 ml-2">
            <Dropdown.Toggle
              data-tip="Nodes & Links"
              data-for="buttons"
              variant="outline-danger"
              id="dropdown-basic"
              className="dropdown font-weight-light"
            >
              <div class="icon">
                <svg
                  class="bi bi-bounding-box-circles"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.5 2h-9V1h9v1zm-10 1.5v9h-1v-9h1zm11 9v-9h1v9h-1zM3.5 14h9v1h-9v-1z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M14 3a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zm0 11a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zM2 3a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zm0 11a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
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
              data-tip="Node List"
              data-for="buttons"
              variant="outline-danger"
              id="dropdown-basic"
              className="dropdown font-weight-light"
            >
              <div class="icon">
                <svg
                  class="bi bi-list-ul"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 11.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm-3 1a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
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

        <ReactTooltip
          id="buttons"
          place="right"
          backgroundColor="#c34f6b"
          effect="solid"
          multiline={true}
          className="extraClass"
        />

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
