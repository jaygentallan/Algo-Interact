import React, { Component } from "react";
import "./ViewArticle.css";
import Modal from "react-bootstrap/Modal";
import { withRouter, Link } from "react-router-dom";
import { Button } from "antd";
import { LoadingOutlined, BookOutlined, FormOutlined, DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { fetchArticle, deleteArticle } from "../../store/actions/article";
import { fetchUser, fetchCurrUser } from "../../store/actions/profile";

import ReactLoading from "react-loading";

/*
  This is the default page that opens when users navigate to
  our website. There are Card components within the Learn Page, 
  and when clicked, the Data Structures route to the Visualizer 
  page and opens up the corresponding data structure tab. When 
  an algorithm Card is clicked, the user is routed to the Learn
  Page. 
*/

class ViewArticle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			currUser: null,
			user: null,
			title: "",
			subtitle: "",
			username: "",
			first_name: "",
			last_name: "",
			description: "",
			content: "",
			created_at: "",
			cover: "",
			profile_pic: "",
			loading: false,
			statusModal: false,
			message: "",
			deleteStatus: false,
			deleted: false,
		};

		this.updateModal = this.updateModal;
	}

	contentMarkup() {
		return { __html: this.state.content };
	}

	deleteArticle() {
		this.props.deleteArticle(this.state.id);
	}

	componentDidMount() {
		const user = localStorage.getItem("user_id");
		this.props.fetchCurrUser(user);
		this.props.fetchArticle(this.props.id);
		this.props.fetchUser(this.props.user);
	}

	componentDidUpdate(prevProps) {
		if (this.props.currArticle != null && prevProps.currArticle !== this.props.currArticle) {
			const created_at = this.props.currArticle.created_at.split("T")[0];
			const year = created_at.split("-")[0];
			const month = created_at.split("-")[1];
			const day = created_at.split("-")[2].replace(/^0+/, "");
			const date = new Date(year, month, day);
			const formatted_date = date.toLocaleString("en-us", { month: "long" }) + " " + day + " " + year;

			this.setState({
				id: this.props.currArticle.id,
				title: this.props.currArticle.title,
				subtitle: this.props.currArticle.subtitle,
				content: this.props.currArticle.content,
				cover: this.props.currArticle.cover,
				created_at: formatted_date,
			});
		}
		if (this.props.userProfile != null && prevProps.userProfile !== this.props.userProfile) {
			this.setState({
				user: this.props.userProfile.user,
				username: this.props.userProfile.username,
				first_name: this.props.userProfile.first_name,
				last_name: this.props.userProfile.last_name,
				description: this.props.userProfile.description,
				profile_pic: this.props.userProfile.profile_pic,
			});
		}
		if (this.props.currUserProfile != null && prevProps.currUserProfile !== this.props.currUserProfile) {
			if (prevProps.currUserProfile !== this.props.currUserProfile || prevProps.currUserProfile.user !== this.props.currUserProfile.user) {
				this.setState({
					currUser: this.props.currUserProfile.user,
				});
			}
		}
		if (this.props.articleStatus && prevProps.articleStatus !== this.props.articleStatus) {
			if (this.props.articleStatus.deleteStatus) {
				this.setState({
					loading: true,
					deleteStatus: this.props.articleStatus.deleteStatus,
				});
			}
			if (this.state.deleteStatus && !this.props.articleStatus.deleteStatus) {
				this.setState({
					loading: false,
					statusModal: true,
					deleted: true,
					message: "Successfully deleted article!",
				});

				setTimeout(() => {
					this.setState({
						statusModal: false,
						deleted: false,
						message: "",
					});
					this.props.history.push("/hub");
				}, 1500);
			}
		}
	}

	render() {
		return (
			<div>
				{this.state.content === null || this.state.profile_pic === null ? (
					<ReactLoading className="viewArticleLoading" type="spinningBubbles" color="#c34f6b" height={50} width={50} />
				) : (
					<div></div>
				)}
				{this.state.cover ? <img className="viewCover" src={this.state.cover} /> : <div />}
				{this.state.cover ? <img className="viewCoverBackground" src={this.state.cover} /> : <div />}
				<div className="cutoff"></div>
				{this.state.title.length > 32 ? (
					<div className="longPadding">
						<h1 className="d-flex view title long">{this.state.title}</h1>
					</div>
				) : (
					<h1 className="d-flex view title short"> {this.state.title} </h1>
				)}
				<h1 className="d-flex view subtitle"> {this.state.subtitle} </h1>
				<div class="view author">
					{this.state.profile_pic ? (
						<Link
							to={{
								pathname: "/viewprofile/" + this.state.username,
								state: { username: this.state.username },
							}}
						>
							<img className="circular--landscape author picture" src={this.state.profile_pic} />
						</Link>
					) : (
						<div />
					)}

					<Link
						to={{
							pathname: "/viewprofile/" + this.state.username,
							state: { username: this.state.username },
						}}
					>
						<h1 className="author name">
							{this.state.first_name} {this.state.last_name}
							<h1 className="author date">{this.state.created_at}</h1>
						</h1>
					</Link>

					{this.state.user ? (
						this.state.user === this.state.currUser ? (
							<div className="editButton">
								<Link
									to={{
										pathname: "/hub/editarticle",
										state: {
											id: this.state.id,
											title: this.state.title,
											subtitle: this.state.subtitle,
											content: this.state.content,
											cover: this.state.cover,
											isEdit: true,
										},
									}}
								>
									<FormOutlined className="author edit" />
								</Link>
								<DeleteOutlined
									className="author delete"
									onClick={() => {
										this.setState({ statusModal: true });
									}}
								/>
							</div>
						) : (
							<BookOutlined className="author bookmark" />
						)
					) : (
						<div />
					)}
				</div>
				<hr className="article line"></hr>
				<div class="view content" dangerouslySetInnerHTML={this.contentMarkup()} />
				<hr className="article line"></hr>
				<div class="view author big">
					{this.state.profile_pic ? (
						<div className="imageLink">
							<Link
								to={{
									pathname: "/viewprofile/" + this.state.username,
									state: { username: this.state.username },
								}}
							>
								<img className="circular--landscape author picture big" src={this.state.profile_pic} />
							</Link>
						</div>
					) : (
						<div />
					)}
					<h1 className="author createdby">CREATED BY</h1>
					<Link
						to={{
							pathname: "/viewprofile/" + this.state.username,
							state: { username: this.state.username },
						}}
					>
						<h1 className="author name big">
							{this.state.first_name} {this.state.last_name}
						</h1>
					</Link>
					<h1 className="author description">{this.state.description}</h1>
				</div>

				<Modal
					className="statusModal"
					show={this.state.statusModal}
					onHide={() => {
						this.setState({ statusModal: false });
					}}
					size="sm"
				>
					<Modal.Body>
						{this.state.loading ? (
							<LoadingOutlined className="deleteLoading" />
						) : this.state.deleted ? (
							<div>
								<CheckCircleOutlined className="deleteIcon" />
								<h1 className="deleteDoneText"> {this.state.message} </h1>
							</div>
						) : (
							<div>
								<h1 className="confirmationText"> Are you sure you want to delete article "{this.state.title}"?</h1>
								<div class="d-flex justify-content-center mb-4">
									<Button
										variant="outline-danger"
										className="cancelButton"
										onClick={() => {
											this.setState({ statusModal: false });
										}}
									>
										<p className="cancelText"> Cancel </p>
									</Button>
									<Button
										variant="outline-danger"
										className="deleteButton"
										onClick={() => {
											this.deleteArticle();
										}}
									>
										<p className="deleteText"> Delete </p>
									</Button>
								</div>
							</div>
						)}
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchArticle: (id) => dispatch(fetchArticle(id)),
		deleteArticle: (id) => dispatch(deleteArticle(id)),
		fetchUser: (user) => dispatch(fetchUser(user)),
		fetchCurrUser: (user) => dispatch(fetchCurrUser(user)),
	};
};

export default connect(null, mapDispatchToProps)(withRouter(ViewArticle));
