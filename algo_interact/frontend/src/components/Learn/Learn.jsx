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
            title="Test Card – Nowitzki Stats"
            text="Dirk Nowitzki is a retired NBA player.
                He spent his 21 years in the league playing for the
                Dallas Mavericks, and he has made over 30,000 points."
            image="/test-dirk.png"
            tab1title="Stats"
            tab1text="Cool stats...example stats..."
            tab2title="Awards"
            tab2text="2011 NBA Championship, 2007 and 2011 NBA MVP, 14-time All-Star"
            tab3title="Fun Facts"
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
          />

          <LearnCard
            title="Linked List"
            text="Linked List is a linear data structure where all data can not be stored into congiguous memory location but then "
          />
          <LearnCard
            title="Graph"
            text="Description for a graph here."
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
            text="Description for first algorithm here."
          />
          <LearnCard
            title="Depth First Search"
            text="Description for second algorithm here."
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
