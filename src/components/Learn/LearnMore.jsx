import React, { Component } from "react";
import LearnCard from "./LearnCard";
import "./LearnMore.css";
import { Button } from "antd";
import { NumberOutlined, TeamOutlined, LoadingOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";

import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchAllTopics, fetchTopic } from "../../store/actions/learn";
/*
  The Learn page is where the user can navigate to 
  in order to learn more about each data structure 
  in the Visualizer page and their respective algorithms.
*/
class LearnMore extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			title: "",
			title_id: "",
			content: "",
			type: "",
			topics: [],
			isAuthenticated: false,
			currTopic: null,
			contributors: [],
			isEdit: false,
			reviewTitle: null,
			reviewContent: null,
		};

		this._handleEditorChange = this._handleEditorChange.bind(this);
	}

	componentDidMount() {
		if ((this.props.title_id && !this.state.currTopic) || (this.props.currTopic && this.props.currTopic.title_id !== this.props.title_id)) {
			this._typeSetter(this.props.title_id);
		} else {
			if (this.props.currTopic) {
				this.setState({
					title: this.props.currTopic.title,
					title_id: this.props.currTopic.title_id,
					contributors: this.props.currTopic.contributors,
					type: this.props.currTopic.type,
				});
				this.props.fetchTopic(this.props.currTopic.title_id);
				this.props.fetchAllTopics(this.props.currTopic.type);
			}
		}

		if (this.props.isAuthenticated) {
			this.setState({
				isAuthenticated: this.props.isAuthenticated,
			});
		}

		if (this.props.currTopic && this.props.title_id === this.props.currTopic.title_id) {
			this.setState({
				currTopic: this.props.currTopic,
				title: this.props.currTopic.title,
				title_id: this.props.currTopic.title_id,
				contributors: this.props.currTopic.contributors,
				content: this.props.currTopic.content,
			});
			this.props.fetchTopic(this.props.title_id);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.title_id !== this.props.title_id && this.props.title_id) {
			this._typeSetter(this.props.title_id);
			this.props.fetchTopic(this.props.title_id);
		}
		if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
			this.setState({
				isAuthenticated: this.props.isAuthenticated,
			});
		}
		if (prevProps.currTopic !== this.props.currTopic && this.props.currTopic) {
			this.setState({
				currTopic: this.props.currTopic,
				title: this.props.currTopic.title,
				content: this.props.currTopic.content,
				isEdit: false,
			});
		}
		if (this.props.learnError && this.state.content) {
			this.setState({
				currTopic: null,
				content: "",
				isEdit: false,
			});
		}
	}

	_contentMarkup() {
		return { __html: this.state.content };
	}

	_handleEditorChange = (e) => {
		this.setState({ reviewContent: e });
	};

	_handleTitleChange = (e) => {
		if (e.target.value.length !== 0) {
			this.setState({
				reviewTitle: e.target.value,
			});
		}
	};

	_typeSetter(propsName) {
		var title, title_id, type;

		switch (propsName) {
			case "arrays-and-strings-introduction":
				title = "Arrays and Strings Introduction";
				title_id = propsName;
				type = "DATA_STRUCTURE";
				break;
			case "stacks-and-queues-introduction":
				title = "Stacks and Queues Introduction";
				title_id = propsName;
				type = "DATA_STRUCTURE";
				break;
			case "hash-tables-introduction":
				title = "Hash Tables Introduction";
				title_id = propsName;
				type = "DATA_STRUCTURE";
				break;
			case "linked-lists-introduction":
				title = "Linked Lists Introduction";
				title_id = propsName;
				type = "DATA_STRUCTURE";
				break;
			case "trees-introduction":
				title = "Trees Introduction";
				title_id = propsName;
				type = "DATA_STRUCTURE";
				break;
			case "graphs-introduction":
				title = "Graphs Introduction";
				title_id = propsName;
				type = "DATA_STRUCTURE";
				break;
			case "graph-algorithms-introduction":
				title = "Graph Algorithms Introduction";
				title_id = propsName;
				type = "ALGORITHM";
				break;
			case "tree-traversals-introduction":
				title = "Tree Traversals Introduction";
				title_id = propsName;
				type = "ALGORITHM";
				break;
		}
		this.setState({
			title: title,
			title_id: title_id,
			type: type,
			isEdit: false,
		});
		this.props.fetchTopic(title_id);
		this.props.fetchAllTopics(type);
	}

	_onSubmitRequest() {
		this.setState({
			reviewContent: this.state.reviewContent.level.content,
		});
	}

	topicTabs() {
		if (this.state.topics == null || this.state.topics.length === 0) {
			return <div></div>;
		} else {
			return (
				<div>
					{this.state.topics.map((topic) => (
						<div className="topicTab">{topic.title_id}</div>
					))}
				</div>
			);
		}
	}

	editor() {
		return (
			<div className="learnEditor">
				<Editor
					apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
					selector="textarea"
					onChange={this._handleEditorChange}
					onEditorChange={this._handleEditorChange}
					value={this.state.currTopic ? this.state.currTopic.content : ""}
					init={{
						branding: false,
						// eslint-disable-next-line no-restricted-globals
						height: screen.height * 0.5,
						// eslint-disable-next-line no-restricted-globals
						menubar: false,
						image_caption: true,
						placeholder: "Share what you know...",
						plugins: "lists advlist codesample autosave save quickbars image media table hr",
						quickbars_selection_toolbar: "bold italic link | h1 h2 p | codesample blockquote",
						quickbars_insert_toolbar: "",
						toolbar:
							" codesample blockquote | image media table hr | bold italic underline | \
									alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
						content_style:
							"@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap'); figcaption {font-family: 'Source Sans Pro', sans-serif; font-size: 16px} body { font-family: 'Source Sans Pro', sans-serif; font-size: 16px; color: #292929; text-align: justify; }",
					}}
				/>

				<div className="learnEditorButtonHolder">
					<Button
						variant="outline-danger"
						className="learnEditCancelButton"
						onClick={() => {
							this.setState({ isEdit: !this.state.isEdit });
						}}
					>
						<p className="learnEditCancelText"> Cancel </p>
					</Button>
					<Button
						variant="outline-danger"
						className="learnEditSaveButton"
						onClick={() => {
							this._onSubmitRequest();
						}}
					>
						<p className="learnEditSaveText"> Save </p>
					</Button>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="learnMorePageBox">
				<div className="learnMoreContainer">
					{this.state.type === "DATA_STRUCTURE" ? (
						<div className="learnMoreCardContainer">
							<LearnCard title="Arrays and Strings" subtitle="Learn About" name="arrays-and-strings" small={true} />
							<LearnCard title="Stacks and Queues" subtitle="Learn About" name="stacks-and-queues" small={true} />
							<LearnCard title="Hash Tables" subtitle="Learn About" name="hash-tables" small={true} />
							<LearnCard title="Linked Lists" subtitle="Learn About" name="linked-lists" small={true} />
							<LearnCard title="Trees" subtitle="Learn About" name="trees" small={true} />
							<LearnCard title="Graphs" subtitle="Learn About" name="graphs" small={true} />
						</div>
					) : (
						<div className="learnMoreCardContainer">
							<LearnCard title="Graph Algorithms" subtitle="Learn About" name="graph-algorithms" small={true} />
							<LearnCard title="Tree Traversals" subtitle="Learn About" name="tree-traversals" small={true} />
						</div>
					)}

					<div className="learnMidContainer">
						<div className="leftTabContainer">
							<div className="topicLabelContainer">
								<NumberOutlined className="topicIcon" />
								<div className="topicLabel">Topics</div>
							</div>

							<hr className="learnMoreTabLine"></hr>

							<div className="topicTabContainer">
								{this.topicTabs()}
								{this.state.isAuthenticated ? (
									<div className="addTopicButton">
										Add Topic
										<PlusOutlined className="addTopicIcon" />{" "}
									</div>
								) : (
									<div />
								)}
							</div>
						</div>
						<div className="learnContentContainer">
							<div className="learnLabel">
								{this.state.isEdit ? (
									<textarea
										rows="3"
										maxLength="60"
										className="learnEditTitle"
										placeholder={this.state.title ? this.state.currTopic.title : "Title"}
										value={this.state.reviewTitle ? this.state.reviewtitle : this.state.title}
										defaultValue={this.state.title ? this.state.currTopic.title : this.state.title}
										onChange={this._handleTitleChange}
									/>
								) : (
									<h2 className="learnText">{this.state.title}</h2>
								)}
								{this.state.isAuthenticated ? (
									<FormOutlined
										className="learnMoreEditButton"
										onClick={() => {
											this.setState({ isEdit: !this.state.isEdit });
										}}
									/>
								) : (
									<div />
								)}
							</div>
							<hr className="learnMoreLine"></hr>
							<div className="learnContentText">
								{this.state.isEdit ? (
									this.editor()
								) : this.state.content !== "" ? (
									<div dangerouslySetInnerHTML={this._contentMarkup()} />
								) : (
									<div className="noContentText">There is no content available!</div>
								)}
							</div>
						</div>
						<div className="rightTabContainer">
							<div className="topicLabelContainer">
								<TeamOutlined className="topicIcon" />
								<div className="topicLabel">Contributors</div>
							</div>
							<hr className="learnMoreTabLine"></hr>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllTopics: (type) => dispatch(fetchAllTopics(type)),
		fetchTopic: (title_id) => dispatch(fetchTopic(title_id)),
	};
};

export default connect(null, mapDispatchToProps)(withRouter(LearnMore));
