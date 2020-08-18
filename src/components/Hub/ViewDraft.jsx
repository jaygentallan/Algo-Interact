import React, { Component } from "react";
import DraftCard from "./DraftCard";
import "./ViewDraft.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SnippetsFilled, LoadingOutlined } from "@ant-design/icons";

import { fetchAllDrafts } from "../../store/actions/article";

class ViewDraft extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			img: "",
			drafts: null,
		};
	}

	componentDidMount() {
		const user = localStorage.getItem("user_id");
		this.props.fetchAllDrafts(user);
	}

	componentDidUpdate(prevProps) {
		// If user is not signed in, go back to homepage
		if (!this.props.isAuthenticated) {
			this.props.history.push("/");
		}
		if (this.props.drafts != null && prevProps.drafts !== this.props.drafts) {
			this.setState({
				drafts: this.props.drafts,
			});
		}
		if (this.props.currUserProfile != null && prevProps.currUserProfile !== this.props.currUserProfile) {
			if (prevProps.currUserProfile !== this.props.currUserProfile || prevProps.currUserProfile.user !== this.props.currUserProfile.user) {
				this.setState({
					user: this.props.currUserProfile.user,
				});
			}
		}
	}

	render() {
		return (
			<div>
				<div className="draftLabel">
					<SnippetsFilled className="draftIcon" />
					<h2 className="draftText"> Your Drafts </h2>
				</div>
				<div className="draftContainer">
					{this.state.drafts === null ? (
						<LoadingOutlined className="draftLoading" />
					) : this.state.drafts.length === 0 ? (
						<h1 className="noDraftsText"> You have no saved drafts </h1>
					) : (
						this.state.drafts.map((draft) => (
							<DraftCard
								id={draft.id}
								title={draft.title}
								subtitle={draft.subtitle}
								content={draft.content}
								cover={draft.cover}
								created_at={draft.created_at}
								isDraft={true}
							/>
						))
					)}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllDrafts: (id) => dispatch(fetchAllDrafts(id)),
	};
};

export default connect(null, mapDispatchToProps)(withRouter(ViewDraft));
