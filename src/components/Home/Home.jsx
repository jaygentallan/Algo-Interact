import React, { Component } from "../../../node_modules/react";
import Footer from "../Footer/Footer";
import Card from "./HomeCard";
import "./Home.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

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
					<img
						src={"https://algointeract.s3.amazonaws.com/static/images/project_logo3.png"}
						width={300}
						height={300}
						alt="logo"
						class="pt-5"
					/>
				</div>

				<div class="d-flex pl-5 pr-5 pb-5 bd-highlight">
					<div class="d-flex bd-highlight">
						<h5 className="home display-4 text-center">
							Algo-Interact was created to visualize data structures and algorithms for computer science students and anyone curious to
							learn.
							<br></br>
							<Link
								className="linkHome"
								to={{
									pathname: "/visualizer/",
								}}
							>
								<a class="try">Try it out!</a>
							</Link>
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
					<div class="pl-5">
						<h2 className="label">Data Structures</h2>
					</div>
				</div>
				<Carousel
					responsive={responsive}
					containerClass="carousel-container"
					removeArrowOnDeviceType={["tablet", "mobile"]}
					deviceType={this.props.deviceType}
					dotListClass="custom-dot-list-style"
					itemClass="card-deck d-flex pb-3 pl-5 pr-5 bd-highlight"
				>
					<Card
						title="Graph"
						subtitle="Visualizer"
						image="https://algointeract.s3.amazonaws.com/static/images/graphpicture.png"
						link="/visualizer/"
						dataStructure="Graph"
					/>
					<Card
						title="Tree"
						subtitle="Visualizer"
						image="https://algointeract.s3.amazonaws.com/static/images/tree.png"
						link="/visualizer/"
						dataStructure="Tree"
					/>

					<Card
						title="Linked List"
						subtitle="Visualizer"
						image="https://algointeract.s3.amazonaws.com/static/images/linkedlist.png"
						link="/visualizer/"
						dataStructure="LinkedList"
					/>
				</Carousel>
				<hr></hr>
				<div class="d-flex pl-2 bd-highlight">
					<div class="pl-5 pt-3 pb-2">
						<h2 className="label">Algorithms</h2>
					</div>
				</div>
				<Carousel
					responsive={responsive}
					containerClass="carousel-container"
					removeArrowOnDeviceType={["tablet", "mobile"]}
					deviceType={this.props.deviceType}
					dotListClass="custom-dot-list-style"
					itemClass="card-deck d-flex pb-5 pl-5 pr-5 bd-highlight"
				>
					<Card
						title="Graph Search"
						subtitle="Algorithms"
						image="https://algointeract.s3.amazonaws.com/static/images/graphsearch.png"
						link="/learn"
					/>
					<Card
						title="Tree Traversal"
						subtitle="Algorithms"
						link="/learn"
						image="https://algointeract.s3.amazonaws.com/static/images/treetraversal.png"
					/>
				</Carousel>
				<div class="container p-5"></div>
				<div class="container p-5"></div>
			</div>
		);
	}
}

export default Home;
