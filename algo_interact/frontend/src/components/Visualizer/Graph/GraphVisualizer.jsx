import React from "../../../../node_modules/react";
import { Graph } from "react-d3-graph";
import "./GraphVisualizer.css";

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
      nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
      links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" }
      ]
    };

    // Default configurations used by the Graph component
    const config = {
      nodeHighlightBehavior: true,
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

    // Class states
    this.state = {
      config,
      generatedConfig: {},
      data,
      nodeIdToBeRemoved: null,
      addNodeName: "",
      removeNodeName: "",
      addNodePlaceholder: "Enter node to add",
      removeNodePlaceholder: "Enter node to remove"
    };
  }

  // Function called by the addButton. Makes sure the addNodeName state is not an
  // empty string. Then checks that the data.nodes array in the state is NOT empty and
  // that the length is greater than 0. Then it creates a new node with the value of the
  // addNoneName and links it to a target node if given. Then it updates the state of
  // data array of the class and resets the addNodeName and addNodePlaceholder.
  onClickAddNode = () => {
    if (this.state.addNodeName === "") {
      this.setState({
        addNodePlaceholder: "Please enter a value!"
      });
      return;
    }
    if (this.state.data.nodes && this.state.data.nodes.length) {
      const maxIndex = this.state.data.nodes.length - 1;
      const minIndex = 0;

      let i = Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex),
        nLinks = Math.floor(Math.random() * (5 - minIndex + 1) + minIndex);
      const newNode = `${this.state.addNodeName}`;

      this.state.data.nodes.push({ id: newNode });

      while (
        this.state.data.nodes[i] &&
        this.state.data.nodes[i].id &&
        nLinks
      ) {
        this.state.data.links.push({
          source: newNode,
          target: this.state.data.nodes[i].id
        });

        i++;
        nLinks--;
      }

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

  // Handler function that is used by the addNode input box, keeps track of the changes
  // and then updates the addNodeName of the state accordingly.
  _addHandleChange = event => {
    this.setState({ addNodeName: event.target.value });
  };

  // Handler function that is used by the removeNode input box, keeps track of the changes
  // and then updates the removeNodeName of the state accordingly.
  _removeHandleChange = event => {
    this.setState({ removeNodeName: event.target.value });
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

  // Main function of the React component. Returns what is displayed to the user. This includes
  // the left window, right window, and the main graph visualizer component.
  render() {
    return (
      // Main display which contains the leftWindow, rightWindow, and the Graph Visualizer
      <div class="box">
        <div class="leftWindow">
          <h1 class="name text-center font-weight-light pt-2"> Graph </h1>
        </div>

        <div class="rightWindow">
          <h5 class="font-weight-light pt-3"> Add a node </h5>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <button
                onClick={this.onClickAddNode}
                type="button"
                class="btn btn-outline-danger"
                id="button-addon1"
              >
                +
              </button>
            </div>
            <input
              type="text"
              name="addNodeName"
              placeholder={this.state.addNodePlaceholder}
              value={this.state.addNodeName}
              onChange={this._addHandleChange}
              onKeyPress={this._handleAddKeyEnter}
            />
          </div>

          <h5 class="font-weight-light"> Remove a node </h5>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <button
                onClick={this.onClickRemoveNode}
                type="button"
                class="btn btn-outline-danger pl-3 pr-2.5"
                id="button-addon1"
              >
                -
              </button>
            </div>
            <input
              type="text"
              name="removeNodeName"
              placeholder={this.state.removeNodePlaceholder}
              value={this.state.removeNodeName}
              onChange={this._removeHandleChange}
              onKeyPress={this._handleRemoveKeyEnter}
            />
          </div>
        </div>

        <Graph
          id="graph-id"
          data={this.state.data}
          config={this.state.config}
        />
      </div>
    );
  }
}
