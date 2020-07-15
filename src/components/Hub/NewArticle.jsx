import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Footer from "../../components/Footer/Footer";
import "./NewArticle.css";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Button } from "antd";
import { CameraTwoTone, CheckCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ReactLoading from "react-loading";

import { createArticle, editArticle, clearArticleStatus, createDraft, deleteDraft } from "../../store/actions/article";
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
			id: null,
			user: null,
			articles: props.articles.articles,
			first_name: "",
			last_name: "",
			title: "",
			subtitle: "",
			content: "",
			tempCover: "https://algointeract.s3.amazonaws.com/media/article_pics/default.jpg",
			cover: null,
			created_at: "",
			loading: false,
			defaultData: null,
			isDraft: false,
			isEdit: false,
			statusModal: false,
			postStatus: false,
			editStatus: false,
			createDraftStatus: false,
			deleteDraftStatus: false,
			postDraftStatus: false,
			noUpdates: false,
			message: "",
		};

		this._handleEditorChange = this._handleEditorChange.bind(this);
		this._handleCoverChange = this._handleCoverChange.bind(this);
	}

	_handleEditorChange = (e) => {
		this.setState({ content: e });
	};

	_handleTitleChange = (e) => {
		if (e.target.value.length !== 0) {
			this.setState({
				title: e.target.value,
			});
		}
	};

	_handleSubtitleChange = (e) => {
		if (e.target.value.length !== 0) {
			this.setState({
				subtitle: e.target.value,
			});
		}
	};

	_handleCoverChange = (e) => {
		e.preventDefault();
		this.setState({
			tempCover: URL.createObjectURL(e.target.files[0]),
			cover: e.target.files[0],
		});
	};

	componentDidMount() {
		const user = localStorage.getItem("user_id");
		this.props.fetchCurrUser(user);

		if (this.props.draftData && this.props.draftData.location.state) {
			this.setState({
				defaultData: this.props.draftData.location.state,
				id: this.props.draftData.location.state.id,
				cover: this.props.draftData.location.state.cover,
				tempCover: URL.createObjectURL(this.props.draftData.location.state.cover),
				isDraft: this.props.draftData.location.state.isDraft,
			});
		}

		if (this.props.editData && this.props.editData.location.state) {
			this.setState({
				defaultData: this.props.editData.location.state,
				tempCover: this.props.editData.location.state.cover,
				id: this.props.editData.location.state.id,
				isEdit: true,
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.articleStatus && prevProps.articleStatus !== this.props.articleStatus) {
			if (this.props.articleStatus.postStatus) {
				this.setState({
					postStatus: this.props.articleStatus.postStatus,
				});
			}
			if (this.props.articleStatus.editStatus) {
				this.setState({
					editStatus: this.props.articleStatus.editStatus,
				});
			}
			if (this.props.articleStatus.createDraftStatus) {
				this.setState({
					createDraftStatus: this.props.articleStatus.createDraftStatus,
				});
			}
			if (this.props.articleStatus.deleteDraftStatus) {
				this.setState({
					deleteDraftStatus: this.props.articleStatus.deleteDraftStatus,
				});
			}
			if (this.state.postStatus && !this.props.articleStatus.postStatus) {
				this.setState({
					loading: false,
					statusModal: true,
					message: "Successfully posted article!",
				});

				setTimeout(() => {
					this.setState({
						statusModal: false,
						message: "",
					});
					this.props.history.push("/hub");
				}, 1500);
			}

			if (this.state.editStatus && !this.props.articleStatus.editStatus) {
				this.setState({
					loading: false,
					statusModal: true,
					message: "Successfully edited article!",
				});

				setTimeout(() => {
					this.setState({
						statusModal: false,
						message: "",
					});
					window.history.back();
				}, 1500);
			}

			if (this.state.createDraftStatus && !this.props.articleStatus.createDraftStatus) {
				this.setState({
					loading: false,
					statusModal: true,
					message: "Successfully saved draft!",
				});

				setTimeout(() => {
					this.setState({
						statusModal: false,
						message: "",
					});
					this.props.history.push("/hub/drafts");
				}, 1500);
			}

			if (this.state.deleteDraftStatus && !this.props.articleStatus.deleteDraftStatus && !this.state.postDraftStatus) {
				this.setState({
					loading: false,
					statusModal: true,
					message: "Successfully deleted draft!",
				});

				setTimeout(() => {
					this.setState({
						statusModal: false,
						postDraftStatus: false,
						message: "",
					});
					this.props.history.push("/hub/drafts");
				}, 1500);
			}
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
			this.setState({ loading: true });
			if (this.state.title.length === 0 && this.state.isDraft) {
				this.setState({ title: this.state.defaultData.title });
			} else if (this.state.title.length === 0 && !this.state.isDraft) {
				this.setState({ title: "" });
			}
			if (this.state.subtitle.length === 0 && this.state.isDraft) {
				this.setState({ subtitle: this.state.defaultData.subtitle });
			} else if (this.state.subtitle.length === 0 && !this.state.isDraft) {
				this.setState({ subtitle: "" });
			}
			if (this.state.content.length === 0 && this.state.isDraft) {
				this.setState({ content: this.state.defaultData.content });
			} else if (this.state.content.length === 0 && !this.state.isDraft) {
				this.setState({ content: "" });
			} else {
				this.setState({ content: this.state.content.level.content });
			}
			this.props.createArticle(
				this.state.user,
				this.state.first_name,
				this.state.last_name,
				this.state.title,
				this.state.subtitle,
				this.state.content,
				this.state.cover
			);
			this.setState({
				postDraftStatus: true,
			});
			this.props.deleteDraft(this.state.user, this.state.defaultData.id);
		};

		const onFinishFailed = (errorInfo) => {
			console.log("FAILED TO UPDATE:", errorInfo);
		};

		const onSave = () => {
			let title = this.state.title;
			let subtitle = this.state.subtitle;
			let content = this.state.content;
			let cover = this.state.cover;

			if (title.length === 0) {
				title = this.state.defaultData.title;
			}
			if (subtitle.length === 0) {
				subtitle = this.state.defaultData.subtitle;
			}
			if (content === "") {
				content = this.state.defaultData.content;
			} else {
				content = this.state.content.level.content;
			}

			if (
				this.state.isDraft &&
				title === this.state.defaultData.title &&
				subtitle === this.state.defaultData.subtitle &&
				content === this.state.defaultData.content &&
				cover === this.state.defaultData.cover
			) {
				this.setState({
					statusModal: true,
					noUpdates: true,
					message: "No updates detected!",
				});
				setTimeout(() => {
					this.setState({
						statusModal: false,
						noUpdates: false,
						message: "",
					});
				}, 1500);
			} else {
				this.setState({
					loading: true,
				});
				this.setState({
					postDraftStatus: true,
				});
				this.props.createDraft(this.state.user, title, subtitle, content, cover);
				if (this.state.isDraft) {
					this.props.deleteDraft(this.state.user, this.state.id);
				}
			}
		};

		const onEdit = () => {
			let title = this.state.title;
			let subtitle = this.state.subtitle;
			let content = this.state.content;
			let cover = this.state.cover;

			if (title.length === 0) {
				title = null;
			}
			if (subtitle.length === 0) {
				subtitle = null;
			}
			if (content === "") {
				content = null;
			} else {
				content = this.state.content.level.content;
			}

			if (!title && !subtitle && !content && !cover) {
				this.setState({
					statusModal: true,
					message: "No updates detected!",
				});
				setTimeout(() => {
					this.setState({
						statusModal: false,
						message: "",
					});
				}, 1500);
			} else {
				this.setState({ loading: true });
				this.props.editArticle(this.state.id, title, subtitle, content, cover);
			}
		};

		const onDelete = () => {
			this.setState({ loading: true });
			this.props.deleteDraft(this.state.user, this.state.defaultData.id);
		};

		return (
			<div className="newArticleBox">
				{this.state.loading ? <ReactLoading className="newArticleLoading" type="spinningBubbles" color="#c34f6b" /> : <div></div>}
				<img className="newCover" src={this.state.tempCover} />
				<img className="newCoverBackground" src={this.state.tempCover} />
				<div className="newArticleCutoff"></div>
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
					<Form.Item name="title" rules={[{ required: false, message: " " }]}>
						<textarea
							rows="2"
							maxLength="60"
							className="newArticleTitle"
							placeholder={this.state.defaultData ? this.state.defaultData.title : "Title"}
							value={this.state.defaultData ? this.state.defaultData.title : this.state.title}
							defaultValue={this.state.defaultData ? this.state.defaultData.title : this.state.title}
							onChange={this._handleTitleChange}
						/>
					</Form.Item>

					<Form.Item name="subtitle" rules={[{ required: false, message: " " }]}>
						<textarea
							rows="1"
							maxLength="50"
							className="newArticleSubtitle"
							placeholder={this.state.defaultData ? this.state.defaultData.subtitle : "A short description"}
							value={this.state.defaultData ? this.state.defaultData.subtitle : this.state.subtitle}
							defaultValue={this.state.defaultData ? this.state.defaultData.subtitle : this.state.subtitle}
							onChange={this._handleSubtitleChange}
						/>
					</Form.Item>

					<div className="newArticleContentContainer">
						<div className="editor">
							<Editor
								apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
								selector="textarea"
								onChange={this._handleEditorChange}
								value={this.state.defaultData ? this.state.defaultData.content : ""}
								init={{
									branding: false,
									// eslint-disable-next-line no-restricted-globals
									height: screen.height * 0.5,
									// eslint-disable-next-line no-restricted-globals
									menubar: false,
									image_caption: true,
									placeholder: "Tell your story...",
									plugins: "lists advlist codesample autosave save quickbars image media table hr",
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
								{this.state.isEdit ? (
									<div>
										<Button
											variant="outline-danger"
											className="newArticleSaveButton"
											onClick={() => {
												this.props.history.push("/hub");
											}}
										>
											<p className="saveText"> Cancel </p>
										</Button>
										<Button
											variant="outline-danger"
											className="newArticleSubmitButton"
											onClick={() => {
												onEdit();
											}}
										>
											<p className="submitText"> Save </p>
										</Button>
									</div>
								) : this.state.isDraft ? (
									<div>
										<Button
											variant="outline-danger"
											className="newArticleDeleteButton"
											onClick={() => {
												onDelete();
											}}
										>
											<p className="saveText"> Delete </p>
										</Button>
										<Button
											variant="outline-danger"
											className="newArticleSaveButton"
											onClick={() => {
												onSave();
											}}
										>
											<p className="saveText"> Save </p>
										</Button>
										<Button variant="outline-danger" className="newArticleSubmitButton" htmlType="submit">
											<p className="submitText"> Submit </p>
										</Button>
									</div>
								) : (
									<div>
										<Button
											variant="outline-danger"
											className="newArticleSaveButton"
											onClick={() => {
												onSave();
											}}
										>
											<p className="saveText"> Save </p>
										</Button>
										<Button variant="outline-danger" className="newArticleSubmitButton" htmlType="submit">
											<p className="submitText"> Submit </p>
										</Button>
									</div>
								)}
							</div>
						</Form.Item>
					</div>
				</Form>

				<Footer />

				<Modal
					className="statusModal"
					show={this.state.statusModal}
					onHide={() => {
						this.setState({ statusModal: false });
					}}
					size="sm"
				>
					<Modal.Body>
						<div>
							{!this.state.noUpdates ? <CheckCircleOutlined className="checkMark" /> : <div />}
							<div class="d-flex justify-content-center mb-2">
								<h1 className="noUpdatesText"> {this.state.message} </h1>
							</div>
						</div>
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
		fetchCurrUser: (user) => dispatch(fetchCurrUser(user)),
		createArticle: (user, first_name, last_name, title, subtitle, content, cover) =>
			dispatch(createArticle(user, first_name, last_name, title, subtitle, content, cover)),
		editArticle: (id, title, subtitle, content, cover) => dispatch(editArticle(id, title, subtitle, content, cover)),
		clearArticleStatus: () => dispatch(clearArticleStatus()),
		createDraft: (user, title, subtitle, content, cover) => dispatch(createDraft(user, title, subtitle, content, cover)),
		deleteDraft: (user, id) => dispatch(deleteDraft(user, id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewArticle));
