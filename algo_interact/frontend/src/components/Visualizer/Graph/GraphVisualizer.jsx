import React from "../../../../node_modules/react";
import Graph from "../../React-D3-Graph/Graph/graph/Graph";
import TreeView from "../../../../node_modules/react-treeview";
import { Dropdown, Form, Button } from "react-bootstrap";
import "./GraphVisualizer.css";
<<<<<<< HEAD
import { wait } from "@testing-library/react";
//import LeftWindow from "../../LeftVdWindow/LeftWindow";
=======
import { Dropdown, Form, Button} from "react-bootstrap";

>>>>>>> de93d5510981fade4311d29f2657ea6a17f726f1

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
        { id: "Harry", color: '', strokeColor: '' }, 
        { id: "Sally", color: '', strokeColor: '' }, 
        { id: "Alice", color: '', strokeColor: ''}],
      links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" }
      ]
    };

    const neighbors = {
      Harry: ["Sally", "Alice"],
      Sally: ["Harry"],
      Alice: []
    };

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
      algorithm: "Depth-First Search"
    };

    // Class states
    this.state = {
      config,
      generatedConfig: {},
      data,
      algoData,
      nodeIdToBeRemoved: null,
      addNodeName: "",
      removeNodeName: "",
      addLink: "",
      addNodePlaceholder: "Enter node to add",
      removeNodePlaceholder: "Enter node to remove",
      addLinkPlaceholder: "Enter as: source, target",
      removeLinkPlaceholder: "Enter as: source, target",
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

      if (source in this.state.neighbors) {
        this.state.neighbors[source].push(target);
      } else {
        this.state.algoData.neighbors[source] = [];
        this.state.algoData.neighbors[source].push(target);
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

      if (source in this.state.neighbors) {
        this.state.algoData.neighbors[source] = this.state.neighbors[
          source
        ].filter(l => l !== target);
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
      startAlgorithm: this.state.algoData.startAlgorithm
    };

    this.setState({ algoData });
  };

  _addEndNodeHandleChange = event => {
    const algoData = {
      startNode: this.state.algoData.startNode,
      endNode: event.target.value,
      neighbors: this.state.algoData.neighbors,
      algorithm: this.state.algoData.algorithm,
      startAlgorithm: this.state.algoData.startAlgorithm
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

<<<<<<< HEAD
  //Functions for state handling
  nSizeHandler = nSize => {
    const config = this.state.config;

    config.node.size = nSize;

    this.setState({
      config: config
    });
  };

  nColorHandler = nColor => {
    const config = this.state.config;

    config.node.color = nColor;

    this.setState({
      config: config
    });
  };

  lColorHandler = lColor => {
    const config = this.state.config;

    config.link.color = lColor;

    this.setState({
      config: config
    });
  };

  //Event Handler
  inputHandler = event => {
    //prevent the forn submission from refreshing the page
    event.preventDefault();
  };
=======
    //Functions for state handling 
    nodeSizeHandler = (size) => {
      const config = this.state.config
  
      config.node.size = size
  
      this.setState({
        config : config
      })
    }
  
    nodeColorHandler = (color) => {
      const config = this.state.config
  
      config.node.color = color
  
      this.setState({
        config : config
      })
    }
  
    linkColorHandler = (linkColor) => {
      const config = this.state.config
  
      config.link.color = linkColor
  
      this.setState({
        config : config
      })
    }
>>>>>>> de93d5510981fade4311d29f2657ea6a17f726f1

  //Node Highlight Rotation Test -- Use Algorithm functions in replace 
  rotateHandler = () => {
    //provide index "i" to invoke a delay
    this.state.data.nodes.forEach( (node, i) =>  {
      setTimeout( () => this.highlightHandler(node.id, i), 1500 * (i + 1))
    })
  }

  //reset node color back to original 
  resetState = (origColor, i) => {

    const myP = new Promise(function(resolve, reject){ // promise for time delay 
      setTimeout(()=>resolve("Successful Switch!"), 1100);
    });
    
    this.sucessHandler = msg => { // If things go well
        console.log(msg); //check console for msg from resolve 

      //set state back to the original 
        this.setState({
          ...this.state.data.nodes[i] = origColor })
    }
    //calls when promise is resolved 
    myP.then(this.sucessHandler);
  }

  //Highlight Node -> Parameter: Node id 
  highlightHandler = (id) => {
    //Get index of the node 
    const nodeIndex = this.state.data.nodes.findIndex( node => {
      //return node index that matches the passed id
      return node.id === id
    })

    const origNode = {
      ...this.state.data.nodes[nodeIndex]
    }
    
    const newNode = {
      ...this.state.data.nodes[nodeIndex]
    }

    //Set colors for new node 
    newNode.color = 'gold'
    newNode.strokeColor = 'orange'   //node outer color

    //create a copy of the entire nodes state
    const nodes = [...this.state.data.nodes]
    //store newNode updates at the proper index of the copy 
    nodes[nodeIndex] = newNode

    //update original state with the new state
    this.setState({
        ...this.state.data.nodes = nodes
    })
    //call to reset back to original state
    this.resetState(origNode, nodeIndex)
  }
  

  // Main function of the React component. Returns what is displayed to the user. This includes
  // the left window, right window, and the main graph visualizer component.
  render() {
    return (
      // Main display which contains the leftWindow, rightWindow, and the Graph Visualizer
      
      <div class="box">
        <div class="leftWindow">
<<<<<<< HEAD
          <form onSubmit={this.inputHandler}>
            <div className="mt-3">
              <Form.Check type="checkbox" id="direct" label="Directed" />
            </div>

            <div className="">
              <Form.Check type="checkbox" id="weight" label="Weighted" />
            </div>

            <h5 class="font-weight-light pt-3 h6"> Node Size </h5>
            <div class="input-group mb-3">
              <input
                class="L nSize"
                id="nSize"
                type="text"
                name="nodeSize"
                placeholder="Enter node size"
                onChange={e =>
                  this.nSizeHandler(document.getElementById("nSize").value)
                }
                //onKeyPress={}
=======

          <Dropdown id='graphConfig' className='LeftWindow pt-3 ml-2'>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                Graph Configurations
              </Dropdown.Toggle>

          <Dropdown.Menu>

            <h5 class="font-weight-light  pt-3 h6"> Node Size </h5>
            <div id='node' class="input-group mb-3">
              <input
                class="L size"
                id="size"
                type="text"
                name="nodeSize"
                placeholder="Enter node size"
                onKeyPress={e => { 
                  if (e.key === "Enter") this.nodeSizeHandler(document.getElementById("size").value) }}
>>>>>>> de93d5510981fade4311d29f2657ea6a17f726f1
              />
            </div>

            <h5 class="font-weight-light h6"> Node Color </h5>
<<<<<<< HEAD
            <div class="input-group mb-3">
              <input
                class="L nColor"
                id="nColor"
                type="text"
                name="nodeColor"
                placeholder="Enter node color"
                onChange={e =>
                  this.nColorHandler(document.getElementById("nColor").value)
                }
                //onKeyPress={this._handleLinkKeyEnter}
=======
            <div id='node' class="input-group mb-3">
              <input
                class="L color"
                id="color"
                type="text"
                name="nodeColor"
                placeholder="Enter node color"
                onKeyPress={e => { 
                  if (e.key === "Enter") this.nodeColorHandler(document.getElementById("color").value) }}
>>>>>>> de93d5510981fade4311d29f2657ea6a17f726f1
              />
            </div>

            <h5 class="font-weight-light h6"> Link Color </h5>
<<<<<<< HEAD
            <div class="input-group mb-3">
              <input
                class="L lColor"
                id="lColor"
                type="text"
                name="linkColor"
                placeholder="Enter link color"
                onChange={e =>
                  this.lColorHandler(document.getElementById("lColor").value)
                }
                //onKeyPress={this._handleLinkKeyEnter}
              />
            </div>

            <Dropdown class="dropdown" drop="right">
=======
            <div id='node' class="input-group mb-3">
              <input
                class="L linkColor"
                id="linkColor"
                type="text"
                name="linkColor"
                placeholder="Enter link color"
                onKeyPress={e => { 
                  if (e.key === "Enter") this.linkColorHandler(document.getElementById("linkColor").value) }}
              />
            </div>
        
            </Dropdown.Menu>
        </Dropdown>
  

          <Dropdown id='algo'className='pt-3 ml-2'>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              Algorithm Settings
            </Dropdown.Toggle>

          <Dropdown.Menu>

            <Dropdown className="dropdown" drop="right">
>>>>>>> de93d5510981fade4311d29f2657ea6a17f726f1
              <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                Algorithm
              </Dropdown.Toggle>

<<<<<<< HEAD
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1" active>
                  Depth-First Search
                </Dropdown.Item>
                <Dropdown.Item evenyKey="2">Breadth-First Search</Dropdown.Item>
                <Dropdown.Item eventKey="3">Dijkstra's</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

=======
              <Dropdown.Menu id='algoSelection'>
                <Dropdown.Item eventKey="1" active>
                  Depth-First Search
                </Dropdown.Item>
                <Dropdown.Item evenyKey="2">
                  Breadth-First Search
                  </Dropdown.Item>
                <Dropdown.Item eventKey="3">
                  Dijkstra's
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <div className="mt-2 mb-2">
              <Form.Check className='mr-3'type="checkbox" id="direct" label="Directed" />
              <Form.Check type="checkbox" id="weight" label="Weighted" />
            </div>

>>>>>>> de93d5510981fade4311d29f2657ea6a17f726f1
            <h5 class="font-weight-light h6 pt-3"> Start Node </h5>
            <div class="input-group mb-3">
              <input
                class="L"
                id="sNode"
                type="text"
                name="startNode"
                placeholder="Enter starting node"
<<<<<<< HEAD
                onChange={this._addStartNodeHandleChange}
=======
                onChange=''
>>>>>>> de93d5510981fade4311d29f2657ea6a17f726f1
                //onKeyPress={this._handleLinkKeyEnter}
              />
            </div>

            <h5 class="font-weight-light h6"> Target Node </h5>
            <div class="input-group mb-3">
              <input
                class="L"
                id="tNode"
                type="text"
<<<<<<< HEAD
                name="targetNode"
                placeholder="Enter ending node"
                onChange={this._addEndNodeHandleChange}
                //onKeyPress={this._handleLinkKeyEnter}
              />
            </div>

            <Button
              class="submit mt-3"
              type="submit"
              variant="outline-success"
              onClick={this.startAlgorithm}
            >
              Start
            </Button>
          </form>
=======
                name="tarhetNode"
                placeholder="Enter ending node"
                onChange=''
                //onKeyPress={this._handleLinkKeyEnter}
              />
            </div>
            
            <Button class="submit mt-2" type="submit"  //activate Algorithm
              variant="outline-success"
              onClick={() => this.rotateHandler()} //Should call selected algorithm
            >
              Start
            </Button>
          </Dropdown.Menu>
         </Dropdown>
>>>>>>> de93d5510981fade4311d29f2657ea6a17f726f1
        </div>


        <div class="rightWindow">
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

          <h5 class="font-weight-light pt-3"> Node list: </h5>
          <div className="json-data-container">
            <TreeView class="nodes" key="nodes" nodeLabel="Nodes">
              {this.state.data.nodes.map((node, i) => {
                const type = node.type;
                const name = node.id;
                if (name in this.state.algoData.neighbors) {
                  return (
                    <TreeView key={type + "|" + i} nodeLabel={name}>
                      <TreeView key={type + "|" + i} nodeLabel="neighbors: ">
                        {this.state.algoData.neighbors[name].map(
                          (neighbor, i) => {
                            return <div className="info"> {neighbor}</div>;
                          }
                        )}
                      </TreeView>
                    </TreeView>
                  );
                }
              })}
            </TreeView>
          </div>
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
