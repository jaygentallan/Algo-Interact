import React, { Component } from "react";
import "./ViewArticle.css";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Button, Checkbox } from "antd";
import { withRouter } from "react-router-dom";
import { LoadingOutlined, BookOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { fetchArticle } from "../../store/actions/article";
import { fetchUser } from "../../store/actions/profile";

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
			title: "",
			subtitle: "",
			first_name: "",
			last_name: "",
			description: "",
			content: "",
			created_at: "",
			cover: "",
			profile_pic: "",
			created_at: "",
		};
	}

	contentMarkup() {
		return { __html: this.state.content };
	}

	componentDidMount() {
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
				title: this.props.currArticle.title,
				subtitle: this.props.currArticle.subtitle,
				content: this.props.currArticle.content,
				cover: this.props.currArticle.cover,
				created_at: formatted_date,
			});
		}
		if (this.props.userProfile != null && prevProps.userProfile !== this.props.userProfile) {
			this.setState({
				first_name: this.props.userProfile.first_name,
				last_name: this.props.userProfile.last_name,
				description: this.props.userProfile.description,
				profile_pic: this.props.userProfile.profile_pic,
			});
		}
	}

	render() {
		return (
			<div>
				{this.state.content === null || this.state.profile_pic === null ? (
					<ReactLoading className="viewArticleLoading" type="spinningBubbles" height={50} width={50} />
				) : (
					<div></div>
				)}
				<img className="viewCover" src={this.state.cover} />
				<img className="viewCoverBackground" src={this.state.cover} />
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
						<img className="circular--landscape author picture" src={this.state.profile_pic} />
					) : (
						<LoadingOutlined className="loadingProfilePic" />
					)}
					<h1 className="author name">
						{this.state.first_name} {this.state.last_name}
						<h1 className="author date">{this.state.created_at}</h1>
					</h1>
					<BookOutlined className="author bookmark" />
				</div>
				<hr className="article line"></hr>
				<div class="view content" dangerouslySetInnerHTML={this.contentMarkup()} />
				<hr className="article line"></hr>
				<div class="view author big">
					{this.state.profile_pic ? (
						<img className="circular--landscape author picture big" src={this.state.profile_pic} />
					) : (
						<LoadingOutlined className="loadingProfilePicBig" />
					)}
					<h1 className="author createdby">CREATED BY</h1>
					<h1 className="author name big">
						{this.state.first_name} {this.state.last_name}
					</h1>
					<h1 className="author description">{this.state.description}</h1>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchArticle: (id) => dispatch(fetchArticle(id)),
		fetchUser: (user) => dispatch(fetchUser(user)),
	};
};

export default connect(null, mapDispatchToProps)(withRouter(ViewArticle));
