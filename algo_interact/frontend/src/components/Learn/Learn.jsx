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

/*
  The Learn page is where the user can navigate to 
  in order to learn more about each data structure 
  in the Visualizer page and their respective algorithms.
*/

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
            tab1text={
              <ul>
                <li>
                  It consist of nodes and edges and sometimes we can say that
                  nodes are vertices and edges are line or arc
                </li>
                <li>It is used to show real time problems</li>
                <li>
                  Graph can be used in social network sites like facebook
                  linkedin etc.
                </li>
                <li>Each nodes are contains information about data.</li>
                <li>Each nodes are contains information about data.</li>
              </ul>
            }
            tab1image="/images/graph.png"
            tab2title="Time Complexity"
            tab2text="Time complexity of graph is O(V+E) where V represent number of vertices "
          />

          <LearnCard
            title="Tree "
            text="Tree is non linear data structure where first node is called Root Node
                of the tree and then after other nodes are called subtree every tree can have
                multiple subtree and they can have also no any subtree but still is called tree data structure, 
                there are some points to be remember. "
            tab1title="Description"
            tab1text={
              <ul>
                 
                <li>
                  Tree is the hieraricial data structure which an store data
                  member in hierical manner
                </li>
                <li>Height of tree should be depend on subtree of the tree.</li>
                <li>
                  In the Tree data structure there is node, edge, leaf nodes and
                  child node.
                </li>
                <li>
                  Provides the best searching and inserting the data into tree
                </li>
                <li>
                  Tree are of different types like Binary Search (tree, AVL
                  tree, binary tree etc.)
                </li>
              </ul>
            }
            tab2title="Time Complexity of Tree"
            tab2text="In general time complexity of tree will be O(h). it can be different operations. it can be also best and worst time 
                      complexity."
            image="/images/tree.png"
            tab1image="/images/treepicture.png"
          />

          <LearnCard
            title="Linked List"
            text="Linked List is a linear data structure where all data can not be stored into congiguous memory location but then are 
                  attached to all the nodes so that we can easy to maintain the list. its simply mean that the it is the list where we can store
                  data member in different memory locations. it is the technic of improving of wasting of memory in the database or we can say 
                  that to save the memory."
            tab1title="Description"
            tab1text={
              <ul>
                 <li>It saves the wasting of memory</li>
                <li>
                  It is easier to add, delete or change the data into database.
                </li>
                <li>It can not use contiguous memory locations.</li>
                <li>
                  All the nodes are linked with references link so that each
                  node can be connected to each other and perforrm operations.
                </li>
                <li>
                  Linkee List can be of two types Single Linked list and Double
                  linked list
                </li>
              </ul>
            }
            tab2title="Time Complexity"
            tab2text="O(n)"
            image="/images/linkedlist.png"
            tab1image="/images/linkedlist.png"
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
            text="The Breadth first search is another fundamental search algorithm used to explore nodes and edges of a graph. It runs with a time complexity of o(v+e) and is often used as a building block in other algorithms."
            tab1title="Description"
            tab1text={
              <ul>
                 
                <li>
                  The BFS algorithm is particularly useful for one thing:
                  finding the shortest path on unsweighted graphs.
                </li>
                <li>Height of tree should be depend on subtree of the tree.</li>
                <li>
                  Its an algorithm, used for traversing or searching tree or
                  graph data structure
                </li>
              </ul>
            }
            image="/images/braedth.png"
            tab1image="/images/bstl.png"
            tab2title="Time Complexity"
            tab2text="O(V + E)"
          />
          <LearnCard
            title="Depth First Search"
            text="The Depth First Search (DFS) is the most fundamental search algorithm used to explore nodes and edges of a graph."
            tab1title="Description"
            tab1text={
              <ul>
                 
                <li>
                  by itself the DFS isn't all the useful, but when augmented to
                  perform other tasks such as connectively, or find
                  bridges/articulation points then DFS really shines
                </li>
                <li>
                  It runs with a time complexity of O(V+E) and is often used as
                  a building block in other algorithms.
                </li>
                <li>
                  It uses stack to find the goal Node. it goes deeper as deeper
                  node until goal is found then perform recursive tracking.
                </li>
              </ul>
            }
            tab1image="/images/dfs.png"
            image="/images/depthfirst.png"
            tab2title="Time Complexity"
            tab2text="O ( V + E ) O(V + E) O(V+E)."
          />
          <LearnCard
            title="Dijkstra Algorithm"
            text="Dijkstra's algorithm is an algorithm we can use to find shortest distances or minimum costs depending on what is represented in a graph."
            image="/images/dijkstra.png"
            tab1title="Description"
            tab1image="/images/djkstra.png"
            tab1text="Dijkstra’s algorithm, published in 1959 and named after its creator Dutch computer scientist Edsger Dijkstra, can be applied on a weighted graph. The graph can either be directed or undirected. One stipulation to using the algorithm is that the graph needs to have a nonnegative weight on every edge."
            tab2title="Time Complexity"
            tab2text="O(V^2)"
          />

          <LearnCard
            title="Tree Traversal"
            text="Tree Traversal is the process which were visit all the nodes of a tree like Inorder, Postorder and Preorder Traversal"
            image="/images/treetraversal.png"
            tab1title="Preorder"
            tab1text="In this algorithm we visit root first, then traverse the left subtree, then traverse the right subtree."
            tab1image="/images/preorderpic.png"
            tab2title="Inorder"
            tab2text="In This algorithm we Traverse the left subtree is visited first, and then root and after the right subtree, always remember that every node represent subtree itself."
            tab2image="/images/inorder.png"
            tab3title="Postorder"
            tab3text="In this algorithm we Traverse the left subtree, than traverse the right subtree than visit root."
            tab3image="/images/postorder.png"
          />
        </Carousel>
        <div class="container p-5"></div>
        <div class="container p-5"></div>

        <Footer />
      </div>
    );
  }
}

export default Learn;
