import React, { Component } from "../../../node_modules/react";
import Footer from "../Footer/Footer";
import Card from "./HomeCard";
import "./Home.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";

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
		let background = "https://algointeract.s3.amazonaws.com/static/images/background.png";

		return (
			<div class="box">
				{<img src={background} className="background" /> ? (
					<div>
						<img src={background} className="background" />
						<img
							src={"https://algointeract.s3.amazonaws.com/static/images/project_logo3.png"}
							width={200}
							height={200}
							className="algointeractLogo"
						/>

						<div className="firstBox">
							<div className="titleText1">A Hub for Students </div>
							<div className="titleText2">
								Algo-Interact is a Computer Science Hub for students who are eager to learn and contribute.
							</div>
						</div>

						<div className="secondBox">
							<div className="visualizerBox">
								<div className="visualizerText1"> Visualizer </div>
								<div className="visualizerText2">
									A visualizer that helps give you a better understanding of data structures and algorithms. Features over 3 data
									structures and several algorithms, with more to come in the future.
								</div>
								<Link className="home link" to="/visualizer">
									<div className="visualizerLink">
										View Visualizer <RightOutlined className="linkArrow" />
									</div>
								</Link>
							</div>

							<div className="learnBox">
								<div className="learnText1"> Learn </div>
								<div className="learnText2">
									Algo-Interact aims to help students understand Computer Science in general, and thus features several tutorials
									that give more information about CS topics, with more to come in the future.
								</div>
								<Link className="home link" to="/learn">
									<div className="visualizerLink">
										Learn Now <RightOutlined className="linkArrow" />
									</div>
								</Link>
							</div>
						</div>

						<div className="thirdBox">
							<div className="hubText1"> The Hub </div>
							<div className="hubText2">
								The central hub for all community-based features of Algo-Interact. Students are able to learn and contribute to the
								community through articles, forums, and projects.
							</div>

							<div className="hubTitleBox">
								<div className="hubTitle">Articles</div>
								<div className="hubTitle">Forums</div>
								<div className="hubTitle">Projects</div>
							</div>

							<div className="articleBox">
								<div className="articleText1"> Write Articles </div>
								<div className="articleText2">
									Create your own article or read other people's articles, Algo-Interact encourages students to share valuable
									knowledge with the community.
								</div>
								<Link className="home link" to="/hub">
									<div className="visualizerLink">
										View Articles <RightOutlined className="linkArrow" />
									</div>
								</Link>
							</div>

							<div className="forumBox">
								<div className="forumText1"> Ask Forum Questions </div>
								<div className="forumText2">
									Got a question to ask? Want to answer questions to help out others? The forum allows students to easily ask and
									answer questions in the community.
								</div>
								<Link className="home link" to="/hub">
									<div className="visualizerLink">
										View Forums <RightOutlined className="linkArrow" />
									</div>
								</Link>
							</div>

							<div className="projectBox">
								<div className="projectText1"> Join Open-Source Projects </div>
								<div className="projectText2">
									Want to add a project to your resume or GitHub? Join community-made open-source projects or start your own and
									invite people from the community!
								</div>
								<Link className="home link" to="/hub">
									<div className="visualizerLink">
										View Projects <RightOutlined className="linkArrow" />
									</div>
								</Link>
							</div>

							<div className="joinNow"> Welcome to Algo-Interact </div>
						</div>
					</div>
				) : (
					<div />
				)}
			</div>
		);
	}
}

export default Home;
