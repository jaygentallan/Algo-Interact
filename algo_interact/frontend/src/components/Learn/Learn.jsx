import React, { Component } from "../../../node_modules/react";
import Footer from "../Footer/Footer";
import LearnCard from "../LearnCard/LearnCard";
import "./Learn.css";

// The carousel:
// https://www.npmjs.com/package/react-multi-carousel
// npm install react-multi-carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// This responsive is for the carousel component.
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
};

class Learn extends Component {
  render() {
    return (
      <div class="box">
        <div class="d-flex p-5 bd-highlight">
          <div class="d-flex p-5 bd-highlight">
            <h5 class="display-3 text-center">Welcome to the Learn Page!</h5>
          </div>
        </div>

        <hr></hr>
        {/** All the cards in the Data Structures and Algorithms
         *    sections go to the Visualizer page when clicked.
         *    Our intent is that for each respective structure,
         *    a default one will be rendered.
         */}
        <div class="d-flex p-2 bd-highlight">
          <div class="pl-5 pb-2">
            <h2>
              {" "}
              <em>Data Structures</em>{" "}
            </h2>
          </div>
        </div>
        <Carousel
          responsive={responsive}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="card-deck d-flex pl-5 pr-5 bd-highlight"
        >
          <LearnCard
            title="Graph"
            text="Graph is the non-linear data structure which is used to represent data networks."
            image="/images/graphpicture.png"
            tab1title="Description"
            tab1text="-It consist of nodes and edges and sometimes we can say that nodes are vertices and edges are line or arc
                      -It is used to show real time problems
                      -Graph can be used in social network sites like facebook linkedin etc.
                      -Each nodes are contains information about data.
                      -Graph are of different types like directed, undirected and weight graphs."
            tab2title="Time Complexity"
            tab2text="Time complexity of graph is O(V+E) where V represent number of vertices "
            tab3image="Fun Facts"
            tab3text="Nowitzki was born in Germany and grew up playing tennis."
          />

          <LearnCard
            title="Tree "
            text="Tree is non linear data structure where first node is called Root Node
                of the tree and then after other nodes are called subtree every tree can have
                multiple subtree and they can have also no any subtree but still is called tree data structure, 
                there are some points to be remember. "
            tab1title="Description"
            tab1text="-Tree is the hieraricial data structure which an store data member in hierical manner
                      - Height of tree should be depend on subtree of the tree.
                      - It provides the best searching and inserting the data into tree.
                      - it provides the best searching and inserting the data into tree
                      - Tree are of different types like Binary search tree, AVL tree, binary tree etc."
            tab2title="Time Complexity of Tree"
            tab2text="In general time complexity of tree will be O(h). it can be different operations. it can be also best and worst time 
                      complexity."
            image="/images/treepicture.png"
          />

          <LearnCard
            title="Linked List"
            text="Linked List is a linear data structure where all data can not be stored into congiguous memory location but then are 
                  attached to all the nodes so that we can easy to maintain the list. its simply mean that the it is the list where we can store
                  data member in different memory locations. it is the technic of improving of wasting of memory in the database or we can say 
                  that to save the memory."
            tab1title="Description"
            tab1text="-it saves the wasting of memory
                      -it is easier to add, delte or change the data into database
                      it can not use contiguous memory locations.
                      -all the nodes are linked with reference link so that each node can be connected to each other and perform operations
                      -Linked List can be of two types single linked list and double linked list. "
            tab2title="Average Time Complexity of Linked List"
            tab2text="O(n)"
            tab3title="Average Time Complexity of Linked List"
            tab3text="O(1)"
            image="/images/linkedlistpicture.png"
          />
          
        </Carousel>
        <br></br>
        <br></br>
        <hr></hr>
        <div class="d-flex pl-2 bd-highlight">
          <div class="pl-5 pt-3 pb-4">
            <h2>
              {" "}
              <em>Algorithms</em>{" "}
            </h2>
          </div>
        </div>
        <Carousel
          responsive={responsive}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="card-deck d-flex pl-5 pr-5 bd-highlight"
        >
          <LearnCard
            title="Breadth First Search"
            text="it uses queue to find the goal node .it explore all the neighbour vertex not current level before moving to next level."
          />
          <LearnCard
            title="Depth First Search"
            text="It uses stack to find the goal node .it goes deeper as depper of a node until goal is found then perform recursive tracking."
            tab1title="Description"
            tab1text="Foe a graph, DFS gives minimum Spanning tree and the Shortest paths of all pairs."
            image="/images/depthfirstsearchpicture.png"
          />
          <LearnCard
            title="Dijkstra Algorithm"
            text="Description for third algorithm here."
          />

          <LearnCard
            title="Algorithm 4"
            text="Description for fourth algorithm here."
          />
        </Carousel>
        <div class="container p-5"></div>

        <Footer />
      </div>
    );
  }
}

export default Learn;
