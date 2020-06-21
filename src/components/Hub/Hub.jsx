import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import Modal from "react-bootstrap/Modal";
import ArticleCard from "./ArticleCard";
import "./Hub.css";
import { Button } from "antd";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { LoadingOutlined, FireFilled, StarFilled, ClockCircleFilled, RiseOutlined } from "@ant-design/icons";
import { DEBUG } from "../../debug";

import { connect } from "react-redux";
import * as actions from "../../store/actions/article";

// Login form
import NormalLoginForm from "../Header/Login";
import RegistrationForm from "../Header/Signup";

/*
  This is the default page that opens when users navigate to
  our website. There are Card components within the Learn Page, 
  and when clicked, the Data Structures route to the Visualizer 
  page and opens up the corresponding data structure tab. When 
  an algorithm Card is clicked, the user is routed to the Learn
  Page. 
*/

// This responsive is for the carousel component.
const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
		slidesToSlide: 2,
	},
};

class Hub extends Component {
	constructor(props) {
		super(props);

		this.state = {
			articles: props.articles.articles,
			profile: [],
			isModalOpen: false,
			login: true,
			prompt: null,
		};

		this.updateLogin = this.updateLogin;
		this.updateModal = this.updateModal;
		this.updatePrompt = this.updatePrompt;
	}

	updateLogin = (bool) => {
		this.setState({ login: bool });
	};

	updateModal = (bool) => {
		this.setState({ isModalOpen: bool });
	};

	updatePrompt = (string) => {
		this.setState({ prompt: string });
	};

	componentDidMount() {
		this.props.fetchAllArticles();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.articles.articles !== this.props.articles.articles) {
			this.setState({
				articles: this.props.articles.articles,
			});
		}
	}

	trendingCatalog() {
		if (this.state.articles == null || this.state.articles["articles"] === null || this.state.articles.length === 0) {
			return <LoadingOutlined className="loading" />;
		} else {
			return (
				<Carousel
					responsive={responsive}
					containerClass="carousel-container"
					removeArrowOnDeviceType={["tablet", "mobile"]}
					deviceType={this.props.deviceType}
					dotListClass="custom-dot-list-style"
					itemClass="card-deck d-flex pt-1 pl-3 pb-4 bd-highlight"
				>
					{this.state.articles.map((article) => (
						<ArticleCard
							id={article.id}
							user={article.user}
							title={article.title}
							author={[article.first_name, article.last_name]}
							subtitle={article.subtitle}
							cover={article.cover}
						/>
					))}
				</Carousel>
			);
		}
	}

	render() {
		return (
			<div>
				<div class="d-flex pt-3 bd-highlight">
					<div class="d-flex pt-5 bd-highlight">
						<div class="d-flex pt-5 bd-highlight">
							<div className="coverHub">
								<img src={"https://algointeract.s3.amazonaws.com/static/images/cover_art.png"} />
							</div>
							<h5 className="display-3 text-center hub"> Welcome to the Hub! Read other people's articles or share your own </h5>
						</div>
					</div>
				</div>
				<div class="pb-5 bd-highlight">
					<h5 className="description display-3"> Share your story now! </h5>
				</div>

				<div class="buttonHolder">
					<input
						type="text"
						class="searchInput"
						name="removeNodeName"
						placeholder="Search articles or topics"
						value={this.state.removeNodeName}
						onChange={this._removeNodeHandleChange}
						onKeyPress={this._handleRemoveKeyEnter}
					/>
					{this.props.isAuthenticated ? (
						<Link to="/hub/newarticle">
							<Button variant="outline-danger" className="newArticleButton">
								<p className="newArticleText"> New + </p>
							</Button>
						</Link>
					) : (
						<Button
							variant="outline-danger"
							className="newArticleButton"
							onClick={() => {
								this.setState({ isModalOpen: true });
							}}
						>
							<p className="newArticleText"> New + </p>
						</Button>
					)}
				</div>

				<Modal
					class="center"
					show={this.state.isModalOpen}
					onHide={() => {
						this.setState({ isModalOpen: false });
					}}
					size="sm"
				>
					<Modal.Body>
						{this.state.login ? (
							<NormalLoginForm
								articlePrompt={"You need to log in to create an article!"}
								updateLogin={this.updateLogin}
								updateModal={this.updateModal}
								updatePrompt={this.updatePrompt}
								isAuthenticated={this.props.isAuthenticated}
							/>
						) : (
							<RegistrationForm
								updateLogin={this.updateLogin}
								updateModal={this.updateModal}
								updatePrompt={this.updatePrompt}
								isAuthenticated={this.props.isAuthenticated}
							/>
						)}
					</Modal.Body>
				</Modal>

				<hr className="discuss"></hr>

				<div class="d-flex pl-2 bd-highlight">
					<div class="pl-5 pb-2">
						<h2 className="category label">
							<RiseOutlined className="label icon" />
							Trending
						</h2>
						<Button variant="outline-danger" className="moreButton">
							<p className="moreButtonText"> More </p>
						</Button>
					</div>
				</div>

				{/* This is the trending catalog carousel */}
				{this.trendingCatalog()}

				<hr className="discuss"></hr>

				<div class="d-flex pl-2 bd-highlight">
					<div class="pl-5 pb-2">
						<h2 className="category label">
							<StarFilled className="label icon" />
							Most Popular
						</h2>
						<Button variant="outline-danger" className="moreButton">
							<p className="moreButtonText"> More </p>
						</Button>
					</div>
				</div>

				{/* This is the trending catalog carousel */}
				{this.trendingCatalog()}

				<hr className="discuss"></hr>

				<div class="d-flex pl-2 bd-highlight">
					<div class="pl-5 pb-2">
						<h2 className="category label">
							<ClockCircleFilled className="label icon" />
							Most Recent
						</h2>
						<Button variant="outline-danger" className="moreButton">
							<p className="moreButtonText"> More </p>
						</Button>
					</div>
				</div>

				{/* This is the trending catalog carousel */}
				{this.trendingCatalog()}

				<div class="pb-5"></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		articles: state.articles,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllArticles: () => dispatch(actions.fetchAllArticles()),
		fetchArticle: (id) => dispatch(actions.fetchArticle(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Hub));
