import React, { Component } from "react";
import "./NewArticle.css";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Button } from "antd";
import { CameraTwoTone } from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ReactLoading from "react-loading";

import { createArticle } from "../../store/actions/article";
import { fetchCurrUser } from "../../store/actions/profile";

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
			user: null,
			first_name: "",
			last_name: "",
			articles: props.articles.articles,
			content: "",
			tempCover: "https://algointeract.s3.amazonaws.com/media/article_pics/default.jpg",
			cover: null,
			created_at: "",
			loading: false,
		};

		this._handleEditorChange = this._handleEditorChange.bind(this);
		this._handleCoverChange = this._handleCoverChange.bind(this);
	}

	_handleEditorChange = (e) => {
		this.setState({ content: e });
		console.log("CONTENT:", this.state.content);
	};

	_handleCoverChange = (e) => {
		console.log("CHANGING COVER WITH:", URL.createObjectURL(e.target.files[0]));
		e.preventDefault();
		this.setState({
			tempCover: URL.createObjectURL(e.target.files[0]),
			cover: e.target.files[0],
		});
	};

	componentDidMount() {
		const user = localStorage.getItem("user_id");
		this.props.fetchCurrUser(user);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.articles.articles !== this.props.articles.articles) {
			this.setState({ loading: false });
			this.props.history.push("/hub");
		}
		if (this.props.currUserProfile != null && prevProps.currUserProfile !== this.props.currUserProfile) {
			if (
				prevProps.currUserProfile !== this.props.currUserProfile ||
				prevProps.currUserProfile.username !== this.props.currUserProfile.username
			) {
				this.setState({
					user: this.props.currUserProfile.user,
					first_name: this.props.currUserProfile.first_name,
					last_name: this.props.currUserProfile.last_name,
					profile_pic: this.props.currUserProfile.profile_pic,
				});
			}
		}
	}

	render() {
		// Calls the article function in article.js
		const onFinish = (values) => {
			console.log("ARTICLE USER:", this.state.user.id);
			this.setState({ loading: true });
			this.props.createArticle(
				this.state.user,
				this.state.first_name,
				this.state.last_name,
				values.title,
				values.subtitle,
				this.state.content.level.content,
				this.state.cover
			);
		};

		const onFinishFailed = (errorInfo) => {
			console.log("Failed:", errorInfo);
		};

		return (
			<div>
				{this.state.loading ? <ReactLoading className="newArticleLoading" type="spinningBubbles" height={50} width={50} /> : <div></div>}
				<img className="newCover" src={this.state.tempCover} />
				<img className="newCoverBackground" src={this.state.tempCover} />
				<div className="cutoff"></div>
				<div className="uploadButton">
					<input
						type="file"
						id="file_input"
						ref={(ref) => (this.upload = ref)}
						style={{ display: "none" }}
						onChange={this._handleCoverChange}
					/>
					<CameraTwoTone twoToneColor="#c34f6b" onClick={(e) => this.upload.click()} />
				</div>
				<Form name="article" className="titleInput" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
					<Form.Item name="title" rules={[{ required: true, message: " " }]}>
						<textarea rows="2" maxLength="60" className="newArticleTitle" placeholder="Title" />
					</Form.Item>

					<Form.Item name="subtitle" rules={[{ required: true, message: " " }]}>
						<textarea rows="1" maxLength="50" className="newArticleSubtitle" placeholder="A short description" />
					</Form.Item>

					<div class="content d-flex justify-content-center">
						<Editor
							apiKey="sy1fz4qa3bu3uabos2nog1m1n564nfe89dm30f9lc055jy23"
							selector="textarea"
							onChange={this._handleEditorChange}
							init={{
								// eslint-disable-next-line no-restricted-globals
								height: screen.height * 0.5,
								// eslint-disable-next-line no-restricted-globals
								width: screen.width * 0.46,
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
							onEditorChange={this._handleEditorChange}
						/>
					</div>
					<Form.Item>
						<div class="d-flex justify-content-end submit">
							<Button variant="outline-danger" className="saveButton">
								<p className="saveText"> Save </p>
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
		articles: state.articles,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createArticle: (user, first_name, last_name, title, subtitle, content, cover) =>
			dispatch(createArticle(user, first_name, last_name, title, subtitle, content, cover)),
		fetchCurrUser: (user) => dispatch(fetchCurrUser(user)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewArticle));
