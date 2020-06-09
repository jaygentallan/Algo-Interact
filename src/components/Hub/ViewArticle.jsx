import React, { Component } from "react";
import "./ViewArticle.css";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions/article";

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

		this.state = {
			data: props.data.data,
			content: "",
			created_at: "",
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
				<img className="view cover" src="https://algointeract.s3.amazonaws.com/media/article_pics/default.jpg" />
				<h1 className="d-flex justify-content-center view title"> {this.state.data.title} </h1>
				<h1 className="d-flex justify-content-center view subtitle"> {this.state.data.subtitle} </h1>
				<div class="view content" dangerouslySetInnerHTML={this.contentMarkup()} />
			</div>
		);
	}
}

export default withRouter(ViewArticle);
