import React, { Component } from "react";
import "./NewArticle.css";
import * as actions from "../../store/actions/article";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Button } from "antd";
import { CameraTwoTone } from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import axios from "axios";
import { set } from "d3";

/*
  This is the default page that opens when users navigate to
  our website. There are Card components within the Learn Page, 
  and when clicked, the Data Structures route to the Visualizer 
  page and opens up the corresponding data structure tab. When 
  an algorithm Card is clicked, the user is routed to the Learn
  Page. 
*/

class NewArticle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: "",
			tempCover: "https://algointeract.s3.amazonaws.com/media/article_pics/default.jpg",
			cover: null,
			created_at: "",
		};
		this.handleEditorChange = this.handleEditorChange.bind(this);
		this.handleCoverChange = this.handleCoverChange.bind(this);
	}

	handleEditorChange = (e) => {
		this.setState({ content: e });
		console.log("CONTENT:", this.state.content);
	};

	handleCoverChange = (e) => {
		console.log("CHANGING COVER WITH:", URL.createObjectURL(e.target.files[0]));
		e.preventDefault();
		this.setState({
			tempCover: URL.createObjectURL(e.target.files[0]),
			cover: e.target.files[0],
		});
	};

	/*
	componentDidMount() {
		this.getArticles();
	}
	*/

	render() {
		// Calls the article function in article.js
		const onFinish = (values) => {
			console.log("COVER:", this.state.cover);
			this.props.article(
				this.props.id,
				this.props.first_name,
				this.props.last_name,
				values.title,
				values.subtitle,
				this.state.content.level.content,
				this.state.cover
			);
			this.props.history.push("/hub");
		};

		const onFinishFailed = (errorInfo) => {
			console.log("Failed:", errorInfo);
		};

		return (
			<div>
				<img className="cover" src={this.state.tempCover} />
				<img className="coverBackground" src={this.state.tempCover} />
				<div className="cutoff"></div>
				<div className="uploadButton">
					<input
						type="file"
						id="file_input"
						ref={(ref) => (this.upload = ref)}
						style={{ display: "none" }}
						onChange={this.handleCoverChange}
					/>
					<CameraTwoTone twoToneColor="#c34f6b" onClick={(e) => this.upload.click()} />
				</div>
				<Form name="basic" className="titleInput" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
					<Form.Item name="title" rules={[{ required: true, message: " " }]}>
						<textarea rows="2" maxlength="60" className="newArticleTitle" placeholder="Title" />
					</Form.Item>

					<Form.Item name="subtitle" rules={[{ required: true, message: " " }]}>
						<textarea rows="1" maxlength="50" className="newArticleSubtitle" placeholder="A short description" />
					</Form.Item>

					<div class="content d-flex justify-content-center">
						<Editor
							apiKey="sy1fz4qa3bu3uabos2nog1m1n564nfe89dm30f9lc055jy23"
							selector="textarea"
							onChange={this.handleEditorChange}
							init={{
								// eslint-disable-next-line no-restricted-globals
								height: screen.height * 0.5,
								// eslint-disable-next-line no-restricted-globals
								width: screen.width * 0.57,
								menubar: false,
								image_caption: true,
								placeholder: "Tell your story...",
								plugins: "lists advlist codesample quickbars image media table hr",
								quickbars_selection_toolbar: "bold italic link | h1 h2 p | codesample blockquote",
								quickbars_insert_toolbar: "",
								toolbar:
									" codesample blockquote | image media table hr | bold italic underline | \
									alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
								content_style:
									"@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap'); figcaption {font-family: 'Libre Baskerville', serif; font-size: 15px} body { font-family: 'Libre Baskerville', serif; font-size: 18px; color: #292929; text-align: justify; }",
							}}
							onEditorChange={this.handleEditorChange}
						/>
					</div>
					<Form.Item>
						<div class="d-flex justify-content-end submit">
							<Button variant="outline-danger" className="saveButton">
								<p className="saveText"> Save Draft </p>
							</Button>
							<Button variant="outline-danger" className="submitButton" htmlType="submit">
								<p className="submitText"> Submit </p>
							</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		article: (user_id, first_name, last_name, title, subtitle, content, cover) =>
			dispatch(actions.createArticle(user_id, first_name, last_name, title, subtitle, content, cover)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewArticle));
