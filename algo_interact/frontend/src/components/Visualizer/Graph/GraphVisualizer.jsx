import React from "react";
import Graph from "./Graph/graph/Graph";
import TreeView from "react-treeview";
import ReactTooltip from "react-tooltip";
import { Dropdown, Form, Button } from "react-bootstrap";
import HelpButton from "../../HelpButton/HelpButton";
import "./GraphVisualizer.css";
//import LeftWindow from "../../LeftVdWindow/LeftWindow";

// Priority Queue class used for Dijkstra's Algorithm
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

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
        {
          id: "Harry",
          color: "",
          strokeColor: "",
          // eslint-disable-next-line no-restricted-globals
          x: screen.width / 2,
          // eslint-disable-next-line no-restricted-globals
          y: screen.height / 2.8,
        },
      ],
      links: [],
    };

    const undirected_neighbors = [
      {
        Harry: [],
      },
    ];

    const directed_neighbors = [
      {
        Harry: [],
      },
    ];

    // Default configurations used by the Graph component
    const config = {
      nodeHighlightBehavior: true,
      directed: false,
      rederLabel: true,
      automaticRearrangeAfterDropNode: true,
      // eslint-disable-next-line no-restricted-globals
      height: screen.height * 0.73,
      // eslint-disable-next-line no-restricted-globals
      width: screen.width * 0.989,
      node: {
        color: "#c34f6b",
        size: 800,
        highlightStrokeColor: "orange",
        strokeWidth: 3,
        fontWeight: "lighter",
        highlightFontWeight: "lighter",
      },
      link: {
        highlightColor: "gold",
        fontSize: 13,
        renderLabel: false,
      },
    };

    const algoData = {
      startNode: "",
      endNode: "",
      undirected_neighbors: undirected_neighbors,
      directed_neighbors: directed_neighbors,
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
    };
  }

  // Function called by the addButton. Makes sure the addNodeName state is not an
  // empty string. Then checks that the data.nodes array in the state is NOT empty and
  // that the length is greater than 0. Then it creates a new node with the value of the
  // addNoneName and links it to a target node if given. Then it updates the state of
  // data array of the class and resets the addNodeName and addNodePlaceholder.

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
    if (this.state.data.nodes.length === 1) {
      this.setState({
        removeNodeName: "",
        removeNodePlaceholder: "Cannot remove last node!",
      });
      return;
    }
    if (this.state.data.nodes && this.state.data.nodes.length > 1) {
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

  _handleDirectedCheckBox = (e) => {
    const config = this.state.config;

    config.directed = this.refs.directed.checked;

    this.setState({
      config: config,
    });
  };

  _handleWeightedCheckBox = (e) => {
    const config = this.state.config;

    config.link.renderLabel = this.refs.weighted.checked;

    this.setState({
      config: config,
    });
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

  linkSizeHandler = (linkSize) => {
    const config = this.state.config;

    config.link.strokeWidth = linkSize;

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
  // handles which algorithm to call based on what button the user clicks on
  startAlgorithm = () => {
    if (this.state.algoData.algorithm === "dfs") {
      this.depthFirstSearch();
    } else if (this.state.algoData.algorithm === "bfs") {
      this.breadthFirstSearch();
    } else if (this.state.algoData.algorithm === "djk") {
      this.dijkstraAlgorithm();
    }
  };

  // searches by traversing down each neighboring nodes' branches
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
                  console.log("VISITED ");
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

  // searches by traversing each node's adjacent neighbors
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

  // looks for the shortest path to get to the target node
  dijkstraAlgorithm = () => {
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
          const algoData = this.state.algoData;
          algoData.stack = [];
          this.setState({ algoData: algoData });
        }

        const costFromStartTo = {};
        const checkList = new PriorityQueue();
        const prev = {};

        let current;
        let path = [];
        var neighbors = this.state.directed
          ? this.state.algoData.directed_neighbors
          : this.state.algoData.undirected_neighbors;

        var adjacencyList = {};

        for (let i = 0; i < neighbors.length; i++) {
          let key = Object.keys(neighbors[i])[0];
          adjacencyList[key] = {};
          for (let j = 0; j < neighbors[i][key].length; j++) {
            adjacencyList[key][neighbors[i][key][j][0]] =
              neighbors[i][key][j][1];
          }
        }

        for (let vert in adjacencyList) {
          if (vert === startNode) {
            costFromStartTo[vert] = 0;
            checkList.enqueue(vert, 0);
          } else {
            costFromStartTo[vert] = Infinity;
          }
          prev[vert] = null;
        }

        while (checkList.values.length) {
          current = checkList.dequeue().val;
          if (current === endNode) {
            // Done
            while (prev[current]) {
              path.push(current);
              current = prev[current];
            }
            break;
          } else {
            for (let neighbor in adjacencyList[current]) {
              let costToNeighbor =
                costFromStartTo[current] + adjacencyList[current][neighbor];
              if (costToNeighbor < costFromStartTo[neighbor]) {
                costFromStartTo[neighbor] = costToNeighbor;
                prev[neighbor] = current;
                checkList.enqueue(neighbor, costToNeighbor);
              }
            }
          }
        }

        path = path.concat(current).reverse();

        var counter = 0;
        console.log(path);
        for (let i = 0; i < path.length; i++) {
          if (path[i] === endNode) {
            for (let j = 0; j < 5; j++) {
              setTimeout(() => this.foundTarget(endNode), 1200 * counter);
              counter++;
            }
            console.log("FOUND TARGET");
            this.resetState(counter);
            return;
          }

          setTimeout(
            () => this.highlightHandler(path[i], counter),
            1000 * (counter + 1)
          );
          counter++;
        }

        this.resetState(counter);
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

  //updates preset directly
  updatePreset = (data, neighbors) => {
    this.setState({
      ...(this.state.data = data),
      ...(this.state.algoData.undirected_neighbors =
        neighbors["undirected_neighbors"]),
      ...(this.state.algoData.directed_neighbors =
        neighbors["directed_neighbors"]),
    });
  };

  // Main function of the React component. Returns what is displayed to the user. This includes
  // the left window, right window, the traversal log and the main graph visualizer component.
  render() {
    const neighborItems = this.state.algoData.stack.map((item) => {
      return <li class="list-group-item">{item}</li>;
    });

    //Selections of Presets
    const Default = {
      nodes: [
        {
          id: "Harry",
          color: "",
          strokeColor: "",
          // eslint-disable-next-line no-restricted-globals
          x: screen.width / 2,
          // eslint-disable-next-line no-restricted-globals
          y: screen.height / 3,
        },
      ],
      links: [],
    };

    const DefaultNeighbors = {
      undirected_neighbors: [{ Harry: [] }],
      directed_neighbors: [{ Harry: [] }],
    };

    // The Office preset data, contains the nodes and links lists
    const Office = {
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
        { source: "Michael", target: "Jan", label: 50 },
        { source: "Michael", target: "Holly", label: 5 },
        { source: "Michael", target: "Ryan", label: 20 },
        { source: "Michael", target: "Jim", label: 10 },
        { source: "Michael", target: "Toby", label: 100 },
        { source: "Jim", target: "Pam", label: 0 },
        { source: "Jim", target: "Karen", label: 30 },
        { source: "Jim", target: "Dwight", label: 15 },
        { source: "Pam", target: "Roy", label: 75 },
        { source: "Dwight", target: "Angela", label: 5 },
        { source: "Dwight", target: "Andy", label: 25 },
        { source: "Andy", target: "Erin", label: 35 },
        { source: "Ryan", target: "Kelly", label: 5 },
        { source: "Angela", target: "Oscar", label: 60 },
        { source: "Angela", target: "Kevin", label: 40 },
        { source: "Angela", target: "Senator", label: 10 },
        { source: "Oscar", target: "Senator", label: 15 },
        { source: "Oscar", target: "Phyllis", label: 20 },
        { source: "Phyllis", target: "Stanley", label: 10 },
        {
          source: "Phyllis",
          target: "Bob Vance, Vance Refrigeration",
          label: 0,
        },
      ],
    };

    // The Office neighbors list, used by the traversal algorithms.
    // prettier-ignore
    const OfficeNeighbors = {
      undirected_neighbors: [
        { Michael: [["Jan", 50], ["Holly", 5], ["Ryan", 20], ["Jim", 10], ["Toby", 100]] },
        { Jan: [["Michael", 50]] },
        { Holly: [["Michael", 5]] },
        { Toby: [["Michael", 100]] },
        { Jim: [["Michael", 10], ["Pam", 0], ["Karen", 30], ["Dwight", 15]] },
        { Pam: [["Jim", 0], ["Roy", 75]] },
        { Karen: [["Jim", 30]] },
        { Roy: [["Pam", 75]] },
        { Dwight: [["Jim", 15], ["Angela", 5], ["Andy", 25]] },
        { Andy: [["Dwight", 25], ["Erin", 35]] },
        { Erin: [["Andy", 35]] },
        { Ryan: [["Michael", 20], ["Kelly", 5]] },
        { Kelly: [["Ryan", 5]] },
        { Angela: [["Dwight", 5], ["Oscar", 60], ["Kevin", 40], ["Senator", 10]] },
        { Oscar: [["Angela", 60], ["Senator", 15], ["Phyllis", 20]] },
        { Kevin: [["Angela", 40]] },
        { Senator: [["Angela", 10], ["Oscar", 15]] },
        { Phyllis: [["Stanley", 10], ["Bob Vance, Vance Refrigeration", 0]] },
        { Stanley: [["Phyllis", 10]] },
        { "Bob Vance, Vance Refrigeration": [["Phyllis", 0]] },
      ],
      directed_neighbors: [
        { Michael: [["Jan", 50], ["Holly", 5], ["Ryan", 20], ["Jim", 10], ["Toby", 100]] },
        { Jan: [] },
        { Holly: [] },
        { Toby: [] },
        { Jim: [["Pam", 0], ["Karen", 30], ["Dwight", 15]] },
        { Pam: [["Roy", 75]] },
        { Karen: [] },
        { Roy: [] },
        { Dwight: [["Angela", 5], ["Andy", 25]] },
        { Andy: [["Erin", 35]] },
        { Erin: [] },
        { Ryan: [["Kelly", 5]] },
        { Kelly: [] },
        { Angela: [["Oscar", 60], ["Kevin", 40], ["Senator", 10]] },
        { Oscar: [["Senator", 15], ["Phyllis", 20]] },
        { Kevin: [] },
        { Senator: [] },
        { Phyllis: [["Stanley", 10], ["Bob Vance, Vance Refrigeration", 0]] },
        { Stanley: [] },
        { "Bob Vance, Vance Refrigeration": [] },
       ],
    };

    return (
      // Main display which contains the leftWindow, rightWindow, and the Graph Visualizer
      <div class="box">
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

              <h5 class="font-weight-light h6"> Link Size </h5>
              <div id="node" class="input-group mb-3">
                <input
                  class="L"
                  id="linkSize"
                  type="text"
                  placeholder="Enter link size"
                  onKeyPress={(e) => {
                    if (e.key === "Enter")
                      this.linkSizeHandler(
                        document.getElementById("linkSize").value
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
                  className="checkboxes font-weight-light"
                  type="checkbox"
                  id="direct"
                  label="Directed"
                  defaultChecked={false}
                  ref="directed"
                  onChange={this._handleDirectedCheckBox}
                />
                <Form.Check
                  className="checkboxes font-weight-light"
                  type="checkbox"
                  id="weight"
                  label="Weighted"
                  defaultChecked={false}
                  ref="weighted"
                  onChange={this._handleWeightedCheckBox}
                />
              </div>

              <div id="node" class="input-group mb-3">
                <h5 class="font-weight-light h6 pt-3"> Start Node: </h5>
                <div class="input-group mb-3">
                  <input
                    class="L"
                    id="sNode"
                    type="text"
                    name="startNode"
                    placeholder="Enter as: name"
                    onChange={this._addStartNodeHandleChange}
                    //onKeyPress={this._handleLinkKeyEnter}
                  />
                </div>

                <h5 class="font-weight-light h6"> Target Node: </h5>
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

                <h5 class="font-weight-light h6"> Algorithms: </h5>

                <div className="pt-1">
                  <Button
                    variant="outline-danger"
                    className="algoSelection"
                    onClick={() => (this.state.algoData.algorithm = "dfs")}
                  >
                    <h6 class="font-weight-normal">Depth-First Search</h6>
                  </Button>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline-danger"
                    className="algoSelection"
                    onClick={() => (this.state.algoData.algorithm = "bfs")}
                  >
                    <h6 class="font-weight-normal">Breadth-First Search</h6>
                  </Button>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline-danger"
                    className="algoSelection"
                    onClick={() => (this.state.algoData.algorithm = "djk")}
                  >
                    <h6 class="font-weight-normal">Dijkstra's</h6>
                  </Button>
                </div>

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
              <h5 class="font-weight-light h6 pt-4"> Add node: </h5>
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

              <h5 class="font-weight-light h6"> Remove node: </h5>
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

              <h5 class="font-weight-light h6"> Add link: </h5>
              <input
                class="linkInput"
                type="text"
                name="addLink"
                placeholder={this.state.addLinkPlaceholder}
                value={this.state.addLink}
                onChange={this._addLinkHandleChange}
                onKeyPress={this._handleLinkKeyEnter}
              />

              <h5 class="font-weight-light h6 pt-3"> Remove link: </h5>
              <input
                className="linkInput"
                type="text"
                name="removeLink"
                placeholder={this.state.removeLinkPlaceholder}
                value={this.state.removeLink}
                onChange={this._removeLinkHandleChange}
                onKeyPress={this._handleremoveLinkKeyEnter}
              />

              <div class="pt-3"></div>
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

                    var neighbors = this.state.config.directed
                      ? this.state.algoData.directed_neighbors
                      : this.state.algoData.undirected_neighbors;

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

          <div
            class="rightWindowHelpButton"
            data-tip="Help"
            data-for="helpButton"
          >
            <HelpButton
              mTitle="Graph Visualizer"
              algoDesc="Choose Directed to see the path direction or Weighted to see values associated
                      with each link in the graph. To prepare the execution of an algorithm, enter a
                      start node's name and a target node's name. Finally choose 1 algorithm to 
                      execute in the "
              nLinkDesc="Enter the name of a new node you'd like to add or the name of an existing node 
                      you'd like to delete from the graph. For a new node, follow the instructions to 
                      link it to an existing node: enter the source node's name, the target node's name, 
                      and an integer value for the link's weight between the 2 nodes. When deleting a 
                      link, enter the names of the nodes at each end of the link."
              nodeList="Node List"
              nListDesc=": Click on this button to view each node's neighboring nodes."
              rButtons="Right Buttons"
              b1="Default Graph"
              b1Desc=": This button resets the Graph to its default of one node, Harry."
              b2="The Office Graph"
              b2Desc=": Click to render a larger graph with connecting nodes."
            />
          </div>
        </div>

        <ReactTooltip
          id="buttons"
          place="right"
          backgroundColor="#c34f6b"
          effect="solid"
          multiline={true}
          className="extraClass"
        />

        <ReactTooltip
          id="helpButton"
          place="right"
          backgroundColor="#2e8b57"
          effect="solid"
          multiline={true}
          className="extraClass"
        />

        {/*Presets */}
        <div class="rightWindow">
          <div class="row pt-3">
            <Button
              data-tip="Default Graph"
              data-for="presetButton"
              variant="outline-danger"
              id="dropdown-basic"
              className="presetButton font-weight-light"
              type="submit" //activate Algorithm
              onClick={() => this.updatePreset(Default, DefaultNeighbors)} //Should call selected algorithm
            >
              <div class="iconPresets">
                <svg
                  class="bi bi-arrow-repeat"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </Button>
          </div>

          <div class="row pt-3">
            <Button
              data-tip="The Office Graph"
              data-for="presetButton"
              variant="outline-danger"
              id="dropdown-basic"
              className="presetButton font-weight-light"
              type="submit" //activate Algorithm
              onClick={() => this.updatePreset(Office, OfficeNeighbors)} //Should call selected algorithm
            >
              <div class="iconPresets">
                <svg
                  class="bi bi-building"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.285.089A.5.5 0 0115.5.5v15a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V14h-1v1.5a.5.5 0 01-.5.5H1a.5.5 0 01-.5-.5v-6a.5.5 0 01.418-.493l5.582-.93V3.5a.5.5 0 01.324-.468l8-3a.5.5 0 01.46.057zM7.5 3.846V8.5a.5.5 0 01-.418.493l-5.582.93V15h8v-1.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5V15h2V1.222l-7 2.624z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M6.5 15.5v-7h1v7h-1z"
                    clip-rule="evenodd"
                  />
                  <path d="M2.5 11h1v1h-1v-1zm2 0h1v1h-1v-1zm-2 2h1v1h-1v-1zm2 0h1v1h-1v-1zm6-10h1v1h-1V3zm2 0h1v1h-1V3zm-4 2h1v1h-1V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm-2 2h1v1h-1V7zm2 0h1v1h-1V7zm-4 0h1v1h-1V7zm0 2h1v1h-1V9zm2 0h1v1h-1V9zm2 0h1v1h-1V9zm-4 2h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1z" />
                </svg>
              </div>
            </Button>
          </div>
        </div>
        {/*Presets End */}

        <ReactTooltip
          id="presetButton"
          place="left"
          backgroundColor="#c34f6b"
          effect="solid"
          multiline={true}
          className="extraClass"
        />

        {/*Entry point for passing data to library to be displayed*/}
        <Graph
          id="graph-id"
          data={this.state.data}
          config={this.state.config}
          onRightClickNode={this._onRightClickNode}
        />
      </div>
    );
  }
}
