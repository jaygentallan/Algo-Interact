import React, { Component } from "react";
import "./ViewArticle.css";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions/article";
import { BookOutlined } from "@ant-design/icons";

import axios from "axios";

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

		const created_at = props.data.data.created_at.split("T")[0];
		const year = created_at.split("-")[0];
		const month = created_at.split("-")[1];
		const day = created_at.split("-")[2].replace(/^0+/, "");
		const date = new Date(year, month, day);
		const formatted_date = date.toLocaleString("en-us", { month: "long" }) + " " + day + " " + year;

		this.state = {
			data: props.data.data,
			content: "",
			cover: props.data.data.cover,
			created_at: formatted_date,
		};
	}

	/*
	componentDidMount() {
		this.getArticles();
	}

	getArticles() {
		if (DEBUG) {
			axios
				.get("http://127.0.0.1:8000/api/articles/")
				.then((res) => {
					this.setState({ discuss: res.data });
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			axios
				.get("https://algointeract.com/api/articles/")
				.then((res) => {
					this.setState({ discuss: res.data });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}
	*/

	contentMarkup() {
		return { __html: this.state.data.content };
	}

	render() {
		return (
			<div>
				<img className="viewCover" src={this.state.cover} />
				<img className="viewCoverBackground" src={this.state.cover} />
				<div className="cutoff"></div>
				{this.state.data.title.length > 32 ? (
					<div className="longPadding">
						<h1 className="d-flex view title long">{this.state.data.title}</h1>
					</div>
				) : (
					<h1 className="d-flex view title short"> {this.state.data.title} </h1>
				)}
				<h1 className="d-flex view subtitle"> {this.state.data.subtitle} </h1>
				<div class="view author">
					<img
						className="circular--landscape author picture"
						src={this.state.image ? this.state.image : "https://algointeract.s3.amazonaws.com/media/profile_pics/default.png"}
					/>
					<h1 className="author name">
						{this.state.data.first_name} {this.state.data.last_name}
						<h1 className="author date">{this.state.created_at}</h1>
					</h1>
					<BookOutlined className="author bookmark" />
				</div>
				<hr className="article line"></hr>
				<div class="view content" dangerouslySetInnerHTML={this.contentMarkup()} />
				<hr className="article line"></hr>
				<div class="view author big">
					<img
						className="circular--landscape author picture big"
						src={this.state.image ? this.state.image : "https://algointeract.s3.amazonaws.com/media/profile_pics/default.png"}
					/>
					<h1 className="author createdby">CREATED BY</h1>
					<h1 className="author name big">
						{this.state.data.first_name} {this.state.data.last_name}
					</h1>
					<h1 className="author description">Student at California State University, East Bay</h1>
				</div>
			</div>
		);
	}
}

export default withRouter(ViewArticle);
