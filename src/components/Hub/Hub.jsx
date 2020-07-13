import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import ArticleCard from "./ArticleCard";
import "./Hub.css";
import { Button } from "antd";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { LoadingOutlined, FireFilled, StarFilled, ClockCircleFilled, RiseOutlined, ReadFilled } from "@ant-design/icons";

import { connect } from "react-redux";
import * as actions from "../../store/actions/article";

// Login form
import NormalLoginForm from "../Header/Login";
import RegistrationForm from "../Header/Signup";

class Hub extends Component {
	constructor(props) {
		super(props);

		this.state = {
			articles: props.articles.articles,
			profile: [],
			isModalOpen: false,
			login: true,
			prompt: "",
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
		if (prevProps.articles.articles !== this.props.articles.articles && this.props.articles.articles) {
			this.setState({
				articles: this.props.articles.articles,
			});
		}
		if (prevProps.currUserProfile !== this.props.currUserProfile) {
			this.props.fetchAllArticles();
		}
	}

	trendingCatalog() {
		if (this.state.articles == null || this.state.articles["articles"] === null || this.state.articles.length === 0) {
			return <LoadingOutlined className="loading" />;
		} else {
			return (
				<div className="articleContainer">
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
				</div>
			);
		}
	}

	render() {
		return (
			<div className="hubBox">
				<h2 className="articleLabel">
					<ReadFilled className="label icon" />
					Articles
				</h2>

				{/* This is the trending catalog carousel */}
				<div className="firstContainer">
					{this.trendingCatalog()}
					<div className="articleSideContainer">
						<div class="articleButtonHolder">
							{this.props.isAuthenticated ? (
								<Link to="/hub/drafts">
									<Button variant="outline-danger" className="draftsButton">
										<p className="newArticleText"> Drafts </p>
									</Button>
								</Link>
							) : (
								<Button
									variant="outline-danger"
									className="draftsButton"
									onClick={() => {
										this.setState({
											prompt: "You need to log in to view your saved drafts!",
											isModalOpen: true,
										});
									}}
								>
									<p className="newArticleText"> Drafts </p>
								</Button>
							)}

							{this.props.isAuthenticated ? (
								<Link to="/hub/newarticle">
									<Button variant="outline-danger" className="newArticleButton">
										<p className="newArticleText"> New </p>
									</Button>
								</Link>
							) : (
								<Button
									variant="outline-danger"
									className="newArticleButton"
									onClick={() => {
										this.setState({
											prompt: "You need to log in to create an article!",
											isModalOpen: true,
										});
									}}
								>
									<p className="newArticleText"> New </p>
								</Button>
							)}
						</div>

						<div className="articleSearchHolder">
							<input
								type="text"
								className="searchInput"
								name="removeNodeName"
								placeholder="Search articles or topics"
								value={this.state.removeNodeName}
								onChange={this._removeNodeHandleChange}
								onKeyPress={this._handleRemoveKeyEnter}
							/>
						</div>
					</div>
				</div>

				<div class="pb-5"></div>

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
								articlePrompt={this.state.prompt}
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
