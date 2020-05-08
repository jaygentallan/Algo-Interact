import React, { Component } from "../../../node_modules/react";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";
import "./Home.css";

/* ScrollRotate:
    This package rotates the logo on the main
    page when scrolling up and down. 
*/
import { ScrollRotate } from "react-scroll-rotate";

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
  This is the default page that opens when users navigate to
  our website. There are Card components within the Learn Page, 
  and when clicked, the Data Structures route to the Visualizer 
  page and opens up the corresponding data structure tab. When 
  an algorithm Card is clicked, the user is routed to the Learn
  Page. 
*/

class Home extends Component {
  render() {
    return (
      <div class="box">
        <div class="row">
          <ScrollRotate animationDuration={0.5}>
            <img
              src={"/project_logo3.png"}
              width={300}
              height={300}
              alt="logo"
              class="pt-5"
            />
          </ScrollRotate>
        </div>

        <div class="d-flex pl-5 pr-5 bd-highlight">
          <div class="d-flex p-5 bd-highlight">
            <h5 class="display-4 text-center">
              Algo-Interact was created to visualize data structures and
              algorithms for computer science students and anyone curious to
              learn.
              <a href="/visualizer" class="try">
                Try it out!
              </a>
            </h5>
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
          <Card
            title="Graph"
            image="/images/graphpicture.png"
            link="/visualizer"
            dataStructure="Graph"
          />
          <Card
            title="Tree"
            image="/images/tree.png"
            link="/visualizer"
            dataStructure="Tree"
          />

          <Card
            title="Linked List"
            image="/images/linkedlist.png"
            link="/visualizer"
            dataStructure="LinkedList"
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
          <Card
            title="Depth First Search"
            image="/images/depthfirst.png"
            link="/learn"
          />
          <Card
            title="Breadth First Search"
            image="/images/linkedlistpicture.png"
            link="/learn"
            image="/images/braedth.png"
          />
          <Card
            title="Dijkstra Algorithm"
            image="/images/dijkstra.png"
            link="/learn"
          />

          <Card
            title="Tree Traversal"
            link="/learn"
            image="/images/treetraversal.png"
          />
        </Carousel>
        <div class="container p-5"></div>
        <div class="container p-5"></div>

        <Footer />
      </div>
    );
  }
}

export default Home;
