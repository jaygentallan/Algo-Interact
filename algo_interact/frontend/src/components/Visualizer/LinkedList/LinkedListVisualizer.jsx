import React from "react";
import Graph from "./Graph/graph/Graph";
import ReactTooltip from "react-tooltip";
import { Dropdown, Form, Button } from "react-bootstrap";
import "./LinkedListVisualizer.css";
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
      //nodeid gives each node a unique index
      //next is our pointer
      nodes: [{ id: "Michael", nodeid: 1, next: null, color: "" }],
      links: [
        // { source: "", target: "" },
      ],
    };
    //private info for linked list, head & tail refers to nodeid attribute of a node
    const listInfo = {
      head: 1,
      tail: 1,
    };

    // Default configurations used by the Graph component
    const config = {
      nodeHighlightBehavior: true,
      automaticRearrangeAfterDropNode: true,
      staticGraph: true,
      directed: true,
      height: window.innerHeight * 0.86,
      width: window.innerWidth,
      directed: true,
      node: {
        color: "#c34f6b",
        size: 1000,
        highlightStrokeColor: "blue",
        symbolType: "square",
      },
      link: {
        highlightColor: "lightblue",
      },
    };

    const neighbors = [];

    const algoData = {
      startNode: data.nodes[0].id,
      keyNode: "",
      neighbors: neighbors,
      algorithm: "search",
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
      preNodeName: "",
      removeNodeName: "",
      addLink: "",
      addNodePlaceholder: "Enter node to append",
      preNodePlaceholder: "Enter node to prepend",
      removeNodePlaceholder: "Enter node to remove",
      addLinkPlaceholder: "Enter as: source, target",
      removeLinkPlaceholder: "Enter as: source, target",
      listInfo,
      headName: "",
      tailName: "",
    };
  }

  // Function called by the addButton. Makes sure the addNodeName state is not an
  // empty string. Then checks that the data.nodes array in the state is NOT empty and
  // that the length is greater than 0. Then it creates a new node with the value of the
  // addNoneName and links it to a target node if given. Then it updates the state of
  // data array of the class and resets the addNodeName and addNodePlaceholder.

  //LINK LIST METHODS

  appendNode = () => {
    //get link list tail and the newest added node
    let listInfo = this.state.listInfo;
    let newNode = this.getNewNode();
    //find the new tail index
    let tailIndex = this.state.data.nodes.findIndex((node) => {
      return node.nodeid === listInfo.tail;
    });
    //create instance of the tail node
    const tailNode = {
      ...this.state.data.nodes[tailIndex],
    };
    //assign current tail to new node
    tailNode.next = newNode.nodeid;
    //copy of the array of nodes
    let newNodes = [...this.state.data.nodes];
    //update copy of nodes
    newNodes[tailIndex] = tailNode;
    //update tail to point to the new tail node
    listInfo.tail = newNode.nodeid;
    //update state of nodes and tail state
    this.setState({
      listInfo: listInfo,
    });

    this.setState({
      ...(this.state.data.nodes = newNodes),
    });
    //update link state
    this.state.data.links.push({
      source: newNode.id,
      target: tailNode.id,
    });
  };

  prependNode = () => {
    //get link list head and the newest added node
    let listInfo = this.state.listInfo;
    let newNode = this.getNewNode();
    //find the current head node
    let headIndex = this.state.data.nodes.findIndex((node) => {
      return node.nodeid === listInfo.head;
    });
    //create instance of the head node
    const headNode = {
      ...this.state.data.nodes[headIndex],
    };
    //update head positioning
    newNode.next = headNode.nodeid;
    listInfo.head = newNode.nodeid;
    //copy of the array of nodes
    let newNodes = [...this.state.data.nodes];
    //get index of newNode and update node array
    let lastIndex = newNodes.lastIndexOf();
    newNodes[lastIndex] = newNode;

    //update state of nodes
    const data = { nodes: newNodes };
    this.setState(data);
    //head state
    this.setState({
      listInfo: listInfo,
    });

    this.state.data.links.push({
      source: headNode.id,
      target: newNode.id,
    });
  };
  //Add links between two nodes when middle is removed
  handleMiddleConnection = (update) => {
    const timer = setTimeout(() => this.onClickAddLink(update), 500);
    return () => clearTimeout(timer);
  };

  //Helper function for remove node
  updateConnection = () => {
    console.log("REMOVE", this.state.data.nodes, this.state.listInfo);
    let removeName = this.state.removeNodeName;
    let listInfo = this.state.listInfo;

    let removeIndex = this.state.data.nodes.findIndex((node) => {
      return node.id === removeName;
    });

    let newNodes = [...this.state.data.nodes];

    let removeNode = newNodes[removeIndex];

    if (this.state.data.nodes.length === 0) {
      console.log("Remove last node");
      console.log("Length", this.state.data.nodes.length);
      listInfo.head = null;
      listInfo.tail = null;
    } else if (listInfo.head === removeNode.nodeid) {
      console.log("Remove Head");
      listInfo.head = removeNode.next;
      removeNode.next = null;
      newNodes[removeIndex] = removeNode;
    } else if (listInfo.tail === removeNode.nodeid) {
      console.log("Remove Tail");
      let newTailIndex = this.state.data.nodes.findIndex((node) => {
        return node.next === removeNode.nodeid;
      });

      let newTailNode = newNodes[newTailIndex];

      listInfo.tail = newTailNode.nodeid;
      newTailNode.next = null;
      newNodes[newTailIndex] = newTailNode;
    } else {
      console.log("Remove middle node");
      let prevIndex = this.state.data.nodes.findIndex((node) => {
        return node.next === removeNode.nodeid;
      });
      let prevNode = newNodes[prevIndex];
      prevNode.next = removeNode.next;
      removeNode.next = null;
      newNodes[prevIndex] = prevNode;
      newNodes[removeIndex] = removeNode;

      let middleIndex = this.state.data.links.findIndex((link) => {
        return link.target === removeNode.id;
      });

      let removeLinkIndex = this.state.data.links.findIndex((link) => {
        return link.source === removeNode.id;
      });
      //update link
      let newLinks = [...this.state.data.links];

      let modifyRemoveLink = newLinks[removeLinkIndex];

      newLinks[middleIndex] = {
        ...newLinks[middleIndex],
        target: modifyRemoveLink.target,
      };

      let updateMiddle = newLinks[middleIndex];
      //remove link
      let newLink = [...this.state.data.links];

      let updateLink = newLink.filter((node, index) => {
        return index !== middleIndex;
      });

      console.log("updated middle", updateLink);

      this.setState({
        ...(this.state.data.links = updateLink),
      });

      this.handleMiddleConnection(updateMiddle);
    }

    //remove node
    let updateNode = newNodes.filter((node, index) => {
      return index !== removeIndex;
    });

    this.setState({
      ...(this.state.data.nodes = updateNode),
    });

    this.setState({
      listInfo: listInfo,
    });

    let links = [...this.state.data.links];

    let removeLinkIndex = links.findIndex((link) => {
      return link.source === removeNode.id;
    });
    //remove link
    let updateLinks = links.filter((link, index) => {
      return index !== removeLinkIndex;
    });

    this.setState({
      ...(this.state.data.links = updateLinks),
    });

    console.log("Link Update", this.state.data.links);
  };

  //set head and tail colors
  updateListColor = (index) => {
    console.log("updateColor", this.state.data.nodes, this.state.listInfo);
    //get index of head and tail

    let headIndex = this.state.data.nodes.findIndex((node) => {
      return node.nodeid === index.head;
    });

    let tailIndex = this.state.data.nodes.findIndex((node) => {
      return node.nodeid === index.tail;
    });
    //copy of array
    let newNodes = [...this.state.data.nodes];
    //set all nodes to original color
    newNodes.forEach((node) => {
      node.color = this.state.nodeColor;
    });
    //update new head or tail with color
    newNodes[headIndex].color = "blue";
    newNodes[tailIndex].color = "red";
    //update display head and tail
    let headName = newNodes[headIndex].id;
    let tailName = newNodes[tailIndex].id;

    //update state of nodes
    this.setState({
      ...(this.state.data.nodes = newNodes),
    });

    this.setState({
      headName: headName,
      tailName: tailName,
    });
  };

  //used for assigning new nodes with a unique node id
  getCount = () => {
    let curCount =
      this.state.data.nodes.length + Math.floor(Math.random() * 100);
    curCount = curCount + Math.floor(Math.random() * 100);
    return curCount;
  };
  //retrieve new node
  getNewNode = () => {
    let length = this.state.data.nodes.length;
    return this.state.data.nodes[length - 1];
  };
  //appends or prepends node
  onClickAppNode = () => {
    console.log("APPEND", this.state.data.nodes, this.state.listInfo);
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
      //create unique node id
      let newid = this.getCount();
      //add node id
      this.state.data.nodes.push({
        id: newNode,
        nodeid: newid,
        next: null,
        color: "",
      });

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
    //decides to use either append or prepend based on button event
    this.appendNode();

    //call to update head and tail color
    let index = this.state.listInfo;
    this.updateListColor(index);

    //console test -> please use for debug
    console.log("nodes", this.state.data.nodes);
    console.log("listInfo", this.state.listInfo);

    this.setState({
      addNodeName: "",
      addNodePlaceholder: "Enter node to add",
    });
    console.log("Links", this.state.data.links);
  };

  onClickPreNode = () => {
    console.log("PREPEND", this.state.data.nodes, this.state.listInfo);
    // Checks if the addNodeName is an empty string
    if (this.state.preNodeName === "") {
      this.setState({
        preNodePlaceholder: "Please enter a value!",
      });
      return;
    }

    // Adds node to the nodes array in the state's data
    if (this.state.data.nodes && this.state.data.nodes.length) {
      const newNode = `${this.state.preNodeName}`;
      //create unique node id
      let newid = this.getCount();
      //add node id
      this.state.data.nodes.push({
        id: newNode,
        nodeid: newid,
        next: null,
        color: "",
      });

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
    //decides to use either append or prepend based on button event
    this.prependNode();

    //call to update head and tail color
    let index = this.state.listInfo;
    this.updateListColor(index);

    //console test -> please use for debug
    console.log("nodes", this.state.data.nodes);
    console.log("listInfo", this.state.listInfo);

    this.setState({
      preNodeName: "",
      preNodePlaceholder: "Enter node to add",
    });
    console.log("Links", this.state.data.links);
  };

  // Function called by the removeNode button. Makes sure the removeNodeName is not an empty string.
  // Then, makes sure the data.nodes array in the class state is NOT empty and the data.nodes.length
  // is greater than 0. Then filters the original nodes and links arrays in the data array using the
  // removeNodeName of the class state. THen update the class data state along with resetting
  // removeNodeName and removeNodePlaceholder.
  onClickRemoveNode = () => {
    console.log("REMOVENode", this.state.data.nodes, this.state.listInfo);

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

      //remove node helper function
      this.updateConnection();
      //update color state
      let index = this.state.listInfo;
      this.updateListColor(index);

      //test
      console.log("nodes", this.state.data.nodes);
      console.log("listInfo", this.state.listInfo);

      this.setState({
        data,
        removeNodeName: "",
        removeNodePlaceholder: "Enter node to remove",
      });
    }
  };

  onClickAddLink = (middleNode) => {
    /*
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
      } */
    /*
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
      } */

    this.state.data.links.push({
      source: middleNode.source,
      target: middleNode.target,
    });
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

  _preNodeHandleChange = (event) => {
    this.setState({ preNodeName: event.target.value });
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
      keyNode: this.state.algoData.keyNode,
      neighbors: this.state.algoData.neighbors,
      algorithm: this.state.algoData.algorithm,
      startAlgorithm: this.state.algoData.startAlgorithm,
      stack: this.state.algoData.stack,
    };

    this.setState({ algoData });
  };

  _addKeyNodeHandleChange = (event) => {
    const algoData = {
      startNode: this.state.algoData.startNode,
      keyNode: event.target.value,
      neighbors: this.state.algoData.neighbors,
      algorithm: this.state.algoData.algorithm,
      startAlgorithm: this.state.algoData.startAlgorithm,
      stack: this.state.algoData.stack,
    };
  };
  // Handler function that listens to the Remove key press
  // and calls the onClickAppNode function.
  _handleAddKeyEnter = (e) => {
    if (e.key === "Enter") {
      this.onClickAppNode();
    }
  };

  _handlePreKeyEnter = (e) => {
    if (e.key === "Enter") {
      this.onClickPreNode();
    }
  };

  // Handler function that listens to the Enter key press
  // and calls the onClickRemoveNode function.
  _handleRemoveKeyEnter = (e) => {
    if (e.key === "Enter") {
      this.onClickRemoveNode();
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
    if (this.state.algoData.algorithm === "search") {
      this.searchList();
    } else if (this.state.algoData.algorithm === "bfs") {
      this.breadthFirstSearch();
    } else if (this.state.algoData.algorithm === "djk") {
    }
  };

  searchList = () => {
    // Loops through nodes to see if the key node actually exists
    var keyIndex = null;
    // initialize algoData stack to start as empty
    this.state.algoData.stack = [];
    for (let i = 0; i < this.data.nodes.length; i++) {
      // add the traversed node to the stack
      this.state.algoData.stack.push(this.data.nodes[i]);
      // set the index equal to i if the key is found in the list
      if (this.algoData.keyNode in this.data.nodes[i].id) {
        keyIndex = i;
        break;
      }
    }
    // add a setTimeout for the rendering of the algorithm
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

  // Main function of the React component. Returns what is displayed to the user. This includes
  // the left window, right window, the traversal log and the main graph visualizer component.
  render() {
    const head = { color: "blue", margin: "13px" };
    const tail = { color: "red", margin: "13px" };

    return (
      // Main display which contains the leftWindow, rightWindow, and the Graph Visualizer
      <div class="box">
        <div className="listInfo">
          <h5 style={head}>{`Head: ${this.state.headName}`}</h5>
          <h5 style={tail}>{`Tail: ${this.state.tailName}`}</h5>
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
              <h5 class="font-weight-light pt-2"> Append node: </h5>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button
                    onClick={() => this.onClickAppNode()}
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

              <h5 class="font-weight-light pt-2"> Prepend node: </h5>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button
                    onClick={() => this.onClickPreNode()}
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
                  name="preNodeName"
                  placeholder={this.state.preNodePlaceholder}
                  value={this.state.preNodeName}
                  onChange={this._preNodeHandleChange}
                  onKeyPress={this._handlePreKeyEnter}
                />
              </div>

              <h5 class="font-weight-light"> Remove node: </h5>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button
                    onClick={() => this.onClickRemoveNode()}
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
