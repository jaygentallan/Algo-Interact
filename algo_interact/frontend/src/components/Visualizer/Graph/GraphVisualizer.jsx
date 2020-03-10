import React from "react";
import { Graph } from "../../Node";
import "./GraphVisualizer.css";
import LeftWindow from '../../LeftWindow/LeftWindow'

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
      automaticRearrangeAfterDropNode: true,
      height: 610,
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
    if (this.state.addNodeName === "") {
      this.setState({
        addNodePlaceholder: "Please enter a value!"
      });
      return;
    }
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

      console.log(source, target);

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
    nSizeHandler = (nSize) => {
      const config = this.state.config
  
      config.node.size = nSize
  
      this.setState({
        config : config
      })
    }
  
    nColorHandler = (nColor) => {
      const config = this.state.config
  
      config.node.color = nColor
  
      this.setState({
        config : config
      })
    }
  
    lColorHandler = (lColor) => {
      const config = this.state.config
  
      config.link.color = lColor
  
      this.setState({
        config : config
      })
    }

  // Main function of the React component. Returns what is displayed to the user. This includes
  // the left window, right window, and the main graph visualizer component.
  render() {

    return (
      // Main display which contains the leftWindow, rightWindow, and the Graph Visualizer
      
      <div class="box">
       
        <LeftWindow  
        //Retrieves state change from LeftWindow Component 
        nSize={this.nSizeHandler} 
        nColor={this.nColorHandler} 
        lColor={this.lColorHandler}
        /> 

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
              onChange={this._addNodeHandleChange}
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
              onChange={this._removeNodeHandleChange}
              onKeyPress={this._handleRemoveKeyEnter}
            />
          </div>

          <h5 class="font-weight-light"> Add a link </h5>
          <input
            class="linkInput"
            type="text"
            name="addLink"
            placeholder={this.state.addLinkPlaceholder}
            value={this.state.addLink}
            onChange={this._addLinkHandleChange}
            onKeyPress={this._handleLinkKeyEnter}
          />

          <h5 class="font-weight-light"> Remove a link </h5>
          <input
            class="linkInput"
            type="text"
            name="removeLink"
            placeholder={this.state.removeLinkPlaceholder}
            value={this.state.removeLink}
            onChange={this._removeLinkHandleChange}
            onKeyPress={this._handleRemoveLinkKeyEnter}
          />
        </div>

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
