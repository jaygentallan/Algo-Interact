import React, { Component } from "react";
import "./ViewProfile.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LoadingOutlined, EditFilled, CheckOutlined, CameraFilled } from "@ant-design/icons";

import { viewProfile } from "../../store/actions/profile";

class ViewProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			username: "",
			first_name: "",
			last_name: "",
			description: "",
			profile_pic: "",
		};
	}

	componentDidMount() {
		this.props.viewProfile(this.props.username);
	}

	// Refreshes the state once the redux store has finished loading.
	componentDidUpdate(prevProps) {
		if (this.props.userProfile != null && prevProps.userProfile !== this.props.userProfile) {
			if (
				prevProps.userProfile !== this.props.userProfile ||
				prevProps.userProfile.username !== this.props.userProfile.username ||
				prevProps.userProfile.profile_pic !== this.props.userProfile.profile_pic
			) {
				this.setState({
					user: this.props.userProfile.user,
					username: this.props.userProfile.username,
					first_name: this.props.userProfile.first_name,
					last_name: this.props.userProfile.last_name,
					description: this.props.userProfile.description,
					newDescription: this.props.userProfile.description,
					profile_pic: this.props.userProfile.profile_pic,
				});
			}
		}
	}

	render() {
		return (
			<div class="viewProfile">
				<div class="viewUserProfile">
					{this.state.profile_pic ? (
						<div className="viewPhotoBox">
							<img className="circular--landscape viewProfilePicture" src={this.state.profile_pic} />
						</div>
					) : (
						<LoadingOutlined className="loadingProfilePicBig" />
					)}
					<div className="viewUserInfo">
						<h1 className="viewProfileName">
							{this.state.first_name} {this.state.last_name}
						</h1>
						<h1 className="viewProfileUsername"> {this.state.username}</h1>
						<h1 className="viewProfileDescription">{this.state.description}</h1>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		viewProfile: (username) => dispatch(viewProfile(username)),
	};
};

export default connect(null, mapDispatchToProps)(withRouter(ViewProfile));
