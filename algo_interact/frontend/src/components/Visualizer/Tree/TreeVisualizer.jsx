import React from "react";
import Graph from "./Graph/graph/Graph";
import TreeView from "react-treeview";
import ReactTooltip from "react-tooltip";
import { Dropdown, Form, Button } from "react-bootstrap";
import "./TreeVisualizer.css";
//import LeftWindow from "../../LeftVdWindow/LeftWindow";

// Graph Visualizer component to be called in visualizer page.
export default class GraphVisualizer extends React.Component {
  // constructor of the GraphVisualizer class. Contains the states:
  // config: the configuration used for the Graph component
  // generatedConfig:
  // data: the data used for the Graph component
  // nodeIdToBeRemoved: id of the node to be removed which is used in the removeNode function
  // addNodeName: a string used by the addNode function to set the new node name
  // removeNodeName: a string used by the removeNode function to delete the desired node
  // addNodePlaceholder: a string used by the addNode input box
  // removeNodePlaceholder: a string used by the removeNode input box
  constructor(props) {
    super(props);

    // Default data used by the Graph component
    const data = {
      nodes: [
        // default data
        {
          id: "Harry",
          color: "",
          strokeColor: "",
          // eslint-disable-next-line no-restricted-globals
          x: screen.width / 2,
          // eslint-disable-next-line no-restricted-globals
          y: screen.height / 10,
          level: 0,
          left: false,
          right: false,
          isRight: false,
          isRightRight: false,
        },
      ],
      links: [],
    };

    const tree = [
      {
        Harry: [],
      },
    ];

    // Default configurations used by the Graph component
    const config = {
      nodeHighlightBehavior: true,
      directed: true,
      staticGraph: true,
      //staticGraphWithDragAndDrop: true,
      //disableLinkForce: true,
      rederLabel: true,
      automaticRearrangeAfterDropNode: true,
      height: window.innerHeight * 0.86,
      width: window.innerWidth,
      node: {
        color: "#c34f6b",
        size: 600,
        highlightStrokeColor: "blue",
      },
      link: {
        highlightColor: "lightblue",
        fontSize: 13,
        renderLabel: false,
      },
    };

    const algoData = {
      startNode: "",
      endNode: "",
      tree: tree,
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
      addNodePlaceholder: "Enter as: name",
      removeNodePlaceholder: "Enter as: name",
      addLinkPlaceholder: "Enter as: source, target, weight",
      removeLinkPlaceholder: "Enter as: source, target",
      key: "", //state for Algorithm tabs
    };
  }

  // Function called by the addButton. Makes sure the addNodeName state is not an
  // empty string. Then checks that the data.nodes array in the state is NOT empty and
  // that the length is greater than 0. Then it creates a new node with the value of the
  // addNoneName and links it to a target node if given. Then it updates the state of
  // data array of the class and resets the add///NodeName and addNodePlaceholder.

  addNode = () => {
    // Checks if the addNodeName is an empty string
    if (this.state.addNodeName === "") {
      this.setState({
        addNodePlaceholder: "Please enter a value!",
      });
      return;
    }

    // Adds node to the nodes array in the state's data
    if (this.state.data.nodes && this.state.data.nodes.length) {
      var data = this.state.data;
      let newNode, parent;
      [newNode, parent] = this.state.addNodeName
        .split(/[ ,]+/)
        .filter(function (e) {
          return e.trim().length > 0;
        });

      for (let i = 0; i < data.nodes.length; i++) {
        if (parent === data.nodes[i].id) {
          if (!data.nodes[i].left) {
            let x =
              data.nodes[i].level === 0
                ? data.nodes[i].x * (0.468 + (data.nodes[i].level + 1) * 0.05)
                : data.nodes[i].isRightRight
                ? data.nodes[i].x * (0.82 + (data.nodes[i].level + 1) * 0.04)
                : data.nodes[i].isRight
                ? data.nodes[i].x * (0.77 + (data.nodes[i].level + 1) * 0.04)
                : data.nodes[i].x * (0.44 + (data.nodes[i].level + 1) * 0.04);
            let y = data.nodes[i].y * 1.5;

            data.nodes.push({
              id: newNode,
              level: data.nodes[i].level + 1,
              x: x,
              y: y,
              isRight: data.nodes[i].isRight,
              isRightRight: data.nodes[i].isRightRight,
            });

            data.nodes[i].left = true;
          } else if (!data.nodes[i].right) {
            let x =
              data.nodes[i].level === 0
                ? data.nodes[i].x * (1.47 + (data.nodes[i].level + 1) * 0.05)
                : data.nodes[i].isRightRight
                ? data.nodes[i].x * (1.26 - (data.nodes[i].level + 1) * 0.04)
                : data.nodes[i].isRight
                ? data.nodes[i].x * (1.26 - (data.nodes[i].level + 1) * 0.04)
                : data.nodes[i].x * (1.6 - (data.nodes[i].level + 1) * 0.04);
            let y = data.nodes[i].y * 1.5;

            let isRightRight =
              data.nodes[i].level === 1 && data.nodes[i].isRight
                ? true
                : data.nodes[i].isRightRight
                ? true
                : false;

            data.nodes.push({
              id: newNode,
              level: data.nodes[i].level + 1,
              x: x,
              y: y,
              isRight: true,
              isRightRight: isRightRight,
            });

            data.nodes[i].right = true;
          }

          data.links.push({
            source: parent,
            target: newNode,
          });

          this.setState({
            data: data,
          });

          break;
        }
      }
    } else {
      // 1st node
      const data = {
        nodes: [{ id: "Node 1" }],
        links: [],
      };

      this.setState({ data });
    }

    /*
    var undirected_neighbors = this.state.algoData.undirected_neighbors;
    var directed_neighbors = this.state.algoData.directed_neighbors;

    // Adds node to the neighbor array in the state's algoData
    let found = false;
    for (let i = 0; i < undirected_neighbors.length; i++) {
      if (this.state.addNodeName in undirected_neighbors[i]) {
        found = true;
      }
      if (this.state.addNodeName in directed_neighbors[i]) {
        found = true;
      }
    }

    if (!found) {
      var name = this.state.addNodeName;
      let undirected_neighbors = this.state.algoData.undirected_neighbors;
      let directed_neighbors = this.state.algoData.directed_neighbors;
      var newNeighbor = {};
      newNeighbor[name] = [];

      undirected_neighbors.push(newNeighbor);
      directed_neighbors.push(newNeighbor);

      this.setState({
        undirected_neighbors: undirected_neighbors,
        directed_neighbors: directed_neighbors,
      });

      console.log(
        "Added to UNDIRECTED_NEIGHBORS: ",
        this.state.algoData.undirected_neighbors
      );
      console.log(
        "Added to DIRECTED NEIGHBORS: ",
        this.state.algoData.directed_neighbors
      );
    }
    */

    this.setState({
      addNodeName: "",
      addNodePlaceholder: "Enter as: name",
    });
  };

  // Function called by the removeNode button. Makes sure the removeNodeName is not an empty string.
  // Then, makes sure the data.nodes array in the class state is NOT empty and the data.nodes.length
  // is greater than 0. Then filters the original nodes and links arrays in the data array using the
  // removeNodeName of the class state. THen update the class data state along with resetting
  // removeNodeName and removeNodePlaceholder.
  removeNode = () => {
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

      let neighbors = this.state.config.directed
        ? this.state.algoData.directed_neighbors
        : this.state.algoData.undirected_neighbors;

      for (let i = 0; i < neighbors.length; i++) {
        if (this.state.removeNodeName in neighbors[i]) {
          let undirected_neighbors = this.state.algoData.undirected_neighbors;
          let directed_neighbors = this.state.algoData.directed_neighbors;

          // First, remove any instances of the node in any of the nodes' neighbors
          for (let i = 0; i < undirected_neighbors.length; i++) {
            let key = Object.keys(undirected_neighbors[i])[0];
            undirected_neighbors[i][key].filter(
              (l) => l[0] !== this.state.removeNodeName
            );
            if (key === this.state.removeNodeName) {
              undirected_neighbors.splice(i, 1);
            }
          }
          // Do the same for the directed_neighbors list
          for (let i = 0; i < directed_neighbors.length; i++) {
            let key = Object.keys(directed_neighbors[i])[0];
            directed_neighbors[i][key].filter(
              (l) => l[0] !== this.state.removeNodeName
            );
            if (key === this.state.removeNodeName) {
              directed_neighbors.splice(i, 1);
            }
          }

          // Put the lists back into the state
          this.setState({
            undirected_neighbors: undirected_neighbors,
            directed_neighbors: directed_neighbors,
          });

          console.log(
            "Removed from UNDIRECTED_NEIGHBORS: ",
            this.state.algoData.undirected_neighbors
          );
          console.log(
            "Removed from DIRECTED NEIGHBORS: ",
            this.state.algoData.directed_neighbors
          );
        }
      }

      this.setState({
        data,
        removeNodeName: "",
        removeNodePlaceholder: "Enter as: name",
      });
    }
  };

  addLink = () => {
    if (this.state.addLink === "") {
      return;
    }
    if (this.state.data.nodes && this.state.data.nodes.length) {
      let source, target, weight;
      [source, target, weight] = this.state.addLink
        .split(/[ ,]+/)
        .filter(function (e) {
          return e.trim().length > 0;
        });

      weight = parseInt(weight);
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

      if (!sourceExists || !targetExists || !weight) {
        this.setState({
          addLink: "",
          addLinkPlaceholder: "Enter as: source, target, weight",
        });
        return;
      }

      for (var j = 0; j < this.state.data.links.length; j++) {
        if (
          this.state.data.links[j].source === source &&
          this.state.data.links[j].target === target
        ) {
          this.setState({
            addLink: "",
            addLinkPlaceholder: "Enter as: source, target, weight",
          });
          return;
        }
      }

      // Push to the links list in the data state
      this.state.data.links.push({
        source: source,
        target: target,
        label: weight,
      });

      var found_in_undirected = false;
      var found_in_directed = false;
      var target_weight = [target, weight];
      var source_weight = [source, weight];
      var undirected_neighbors = this.state.algoData.undirected_neighbors;
      var directed_neighbors = this.state.algoData.directed_neighbors;

      // Push to neighbors list if a node already has it as a neighbor for UNDIRECTED GRAPH
      for (let i = 0; i < undirected_neighbors.length; i++) {
        let already_exists = false;
        // Add both source and target to each other's neighbors list because the graph is undirected
        if (source in undirected_neighbors[i]) {
          for (let j = 0; j < undirected_neighbors[i][source].length; j++) {
            if (target === undirected_neighbors[i][source][j][0]) {
              already_exists = true;
            }
          }
          if (!already_exists) {
            undirected_neighbors[i][source].push(target_weight);
          }
          found_in_undirected = true;
        }

        already_exists = false;

        if (target in undirected_neighbors[i]) {
          for (let j = 0; j < undirected_neighbors[i][target].length; j++) {
            if (source === undirected_neighbors[i][target][j][0]) {
              already_exists = true;
            }
          }
          if (!already_exists) {
            undirected_neighbors[i][target].push(source_weight);
          }
          found_in_undirected = true;
        }
      }

      // Push to neighbors list if a node already
      for (let i = 0; i < directed_neighbors.length; i++) {
        let already_exists = false;
        // Add only the target node to the source neighbors list because it is a directed graph
        if (source in directed_neighbors[i]) {
          for (let j = 0; j < directed_neighbors[i][source].length; j++) {
            if (target === undirected_neighbors[i][source][j][0]) {
              already_exists = true;
            }
          }
          if (!already_exists) {
            directed_neighbors[i][source].push(target_weight);
          }
          found_in_directed = true;
        }
      }

      // Else push a new list containing this new node as a neighbor
      if (!found_in_undirected) {
        let sourceNeighbor = {};
        let targetNeighbor = {};
        sourceNeighbor[target] = target_weight;
        targetNeighbor[source] = source_weight;

        undirected_neighbors.push(sourceNeighbor);
        undirected_neighbors.push(targetNeighbor);
      }
      if (!found_in_directed) {
        let sourceNeighbor = {};
        sourceNeighbor[target] = target_weight;

        directed_neighbors.push(sourceNeighbor);
      }

      var algoData = this.state.algoData;
      algoData.undirected_neighbors = undirected_neighbors;
      algoData.directed_neighbors = directed_neighbors;

      this.setState({
        algoData: algoData,
      });

      this.setState({
        addLink: "",
        addLinkPlaceholder: "Enter as: source, target, weight",
      });
    }
  };

  removeLink = () => {
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

      var undirected_neighbors = this.state.algoData.undirected_neighbors;
      var directed_neighbors = this.state.algoData.directed_neighbors;

      // Remove links for both the source and target in the undirected neighbors list
      for (let i = 0; i < undirected_neighbors.length; i++) {
        if (source in undirected_neighbors[i]) {
          undirected_neighbors[i][source].filter((l) => l[0] !== target);
        }
        if (target in undirected_neighbors[i]) {
          undirected_neighbors[i][target].filter((l) => l[0] !== source);
        }
      }

      // Remove links for the directed neighbors list
      for (let i = 0; i < directed_neighbors.length; i++) {
        if (source in directed_neighbors[i]) {
          directed_neighbors[i][source].filter((l) => l[0] !== target);
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
      undirected_neighbors: this.state.algoData.undirected_neighbors,
      directed_neighbors: this.state.algoData.directed_neighbors,
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
      undirected_neighbors: this.state.algoData.undirected_neighbors,
      directed_neighbors: this.state.algoData.directed_neighbors,
      algorithm: this.state.algoData.algorithm,
      startAlgorithm: this.state.algoData.startAlgorithm,
      stack: this.state.algoData.stack,
    };

    this.setState({ algoData });
  };
  // Handler function that listens to the Remove key press
  // and calls the addNode function.
  _handleAddKeyEnter = (e) => {
    if (e.key === "Enter") {
      this.addNode();
    }
  };

  // Handler function that listens to the Enter key press
  // and calls the removeNode function.
  _handleRemoveKeyEnter = (e) => {
    if (e.key === "Enter") {
      this.removeNode();
    }
  };

  _handleLinkKeyEnter = (e) => {
    if (e.key === "Enter") {
      this.addLink();
    }
  };

  _handleremoveLinkKeyEnter = (e) => {
    if (e.key === "Enter") {
      this.removeLink();
    }
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
      this.dijkstraAlgorithm();
    }
  };

  depthFirstSearch = () => {
    console.log(this.state.algoData.neighbors);
    if (
      this.state.algoData.startNode !== "" &&
      this.state.algoData.endNode !== ""
    ) {
      const startNode = this.state.algoData.startNode;
      const endNode = this.state.algoData.endNode;
      var startNodeIsValid = false;
      var endNodeIsValid = false;

      // Uses the appropriate neighbors list if directed is turned on or not
      var neighbors = this.state.config.directed
        ? this.state.algoData.directed_neighbors
        : this.state.algoData.undirected_neighbors;

      // Does a loop through the undirect and directed neighbors list to make sure both are valid nodes
      for (let i = 0; i < neighbors.length; i++) {
        if (startNode in neighbors[i]) {
          startNodeIsValid = true;
        }
        if (endNode in neighbors[i]) {
          endNodeIsValid = true;
        }
      }

      // Checks whether both the start node and end node are valid
      if (startNodeIsValid && endNodeIsValid) {
        if (this.state.algoData.stack == null) {
          const algoData = this.state.data.algoData;
          algoData.stack = [];
          this.setState({ algoData });
        }

        // Intiailizes the variables needed for depth-first search
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

          // For looping through the neighbors array
          for (let i = 0; i < neighbors.length; i++) {
            if (
              curr in neighbors[i] &&
              neighbors[i][curr] !== null &&
              neighbors[i][curr].length !== 0
            ) {
              // For looping through the array within the neighbors array, this contains the name and weight of the link
              for (let j = 0; j < neighbors[i][curr].length; j++) {
                const newNode = neighbors[i][curr][j][0];
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

      // Uses the appropriate neighbors list if directed is turned on or not
      var neighbors = this.state.config.directed
        ? this.state.algoData.directed_neighbors
        : this.state.algoData.undirected_neighbors;

      for (let i = 0; i < neighbors.length; i++) {
        if (startNode in neighbors[i]) {
          startNodeIsValid = true;
        }
        if (endNode in neighbors[i]) {
          endNodeIsValid = true;
        }
      }

      if (startNodeIsValid && endNodeIsValid) {
        if (this.state.algoData.stack == null) {
          const algoData = {
            startNode: this.state.algoData.stack,
            endNode: this.state.algoData.endNode,
            undirected_neighbors: this.state.algoData.undirected_neighbors,
            directed_neighbors: this.state.algoData.directed_neighbors,
            algorithm: this.state.algoData.algorithm,
            startAlgorithm: this.state.algoData.startAlgorithm,
            stack: [],
          };
          this.setState({ algoData });
        }

        // Initializes all the variables needed for the breadth-first search
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

          for (let i = 0; i < neighbors.length; i++) {
            if (
              curr in neighbors[i] &&
              neighbors[i][curr] !== null &&
              neighbors[i][curr].length !== 0
            ) {
              for (let j = 0; j < neighbors[i][curr].length; j++) {
                const newNode = neighbors[i][curr][j][0];
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

        {console.log("GRAPH")}

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
              <div id="node" class="input-group mb-3 pt-2">
                <h5 class="font-weight-light h6"> Target Node </h5>
                <div class="input-group mb-3">
                  <input
                    class="L"
                    id="tNode"
                    type="text"
                    name="tarhetNode"
                    placeholder="Enter as: name"
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
                <input
                  type="text"
                  class="linkInput"
                  name="addNodeName"
                  placeholder={this.state.addNodePlaceholder}
                  value={this.state.addNodeName}
                  onChange={this._addNodeHandleChange}
                  onKeyPress={this._handleAddKeyEnter}
                />
              </div>

              <h5 class="font-weight-light"> Remove node: </h5>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="linkInput"
                  name="removeNodeName"
                  placeholder={this.state.removeNodePlaceholder}
                  value={this.state.removeNodeName}
                  onChange={this._removeNodeHandleChange}
                  onKeyPress={this._handleRemoveKeyEnter}
                />
              </div>
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

                    var neighbors = this.state.algoData.tree;

                    for (i = 0; i < neighbors.length; i++) {
                      if (name in neighbors[i]) {
                        return (
                          <TreeView key={type + "|" + i} nodeLabel={name}>
                            <TreeView
                              key={type + "|" + i}
                              nodeLabel="neighbors: "
                            >
                              {neighbors[i][name].map((neighbor, i) => {
                                return (
                                  <div className="info">{neighbor[0]}</div>
                                );
                              })}
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
