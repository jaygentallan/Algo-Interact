import React, { Component } from "react";
import "./EditProfile.css";
import { Form, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LoadingOutlined, EditFilled, CheckOutlined, CameraFilled } from "@ant-design/icons";

import { fetchCurrUser, updateProfile } from "../../store/actions/profile";

class EditProfile extends Component {
	constructor(props) {
		console.log("EDIT PROFILE PROPS:", props);
		super(props);

		this.state = {
			user: null,
			username: "",
			first_name: "",
			last_name: "",
			description: "",
			newDescription: "",
			profile_pic: "",
			new_profile_pic: null,
			editDescription: false,
		};

		this._handlePictureChange = this._handlePictureChange.bind(this);
	}

	_handleDescriptionChange = (e) => {
		if (e.target.value.length !== 0) {
			this.setState({ newDescription: e.target.value });
		}
	};

	_handlePictureChange = (e) => {
		console.log("CHANGING PROFILE WITH:", e.target.files[0]);
		e.preventDefault();
		this.setState({
			profile_pic: URL.createObjectURL(e.target.files[0]),
			new_profile_pic: e.target.files[0],
		});
		// Calls updateProfile in redux store to update values.
		this.props.updateProfile(this.state.user, null, e.target.files[0]);
	};

	componentDidMount() {
		if (this.props.currUserProfile) {
			this.setState({
				user: this.props.currUserProfile.user,
				username: this.props.currUserProfile.username,
				first_name: this.props.currUserProfile.first_name,
				last_name: this.props.currUserProfile.last_name,
				description: this.props.currUserProfile.description,
				newDescription: this.props.currUserProfile.description,
				profile_pic: this.props.currUserProfile.profile_pic,
			});
		} else {
			const user = localStorage.getItem("user_id");
			this.props.fetchCurrUser(user);
		}
	}

	// Refreshes the state once the redux store has finished loading.
	componentDidUpdate(prevProps) {
		if (!this.props.isAuthenticated) {
			this.props.history.push("/");
		}
		if (
			this.props.currUserProfile != null &&
			(prevProps.currUserProfile !== this.props.currUserProfile || this.state.description !== this.props.currUserProfile.description)
		) {
			if (
				prevProps.currUserProfile !== this.props.currUserProfile ||
				prevProps.currUserProfile.description !== this.props.currUserProfile.description ||
				prevProps.currUserProfile.profile_pic !== this.props.currUserProfile.profile_pic
			) {
				this.setState({
					user: this.props.currUserProfile.user,
					username: this.props.currUserProfile.username,
					first_name: this.props.currUserProfile.first_name,
					last_name: this.props.currUserProfile.last_name,
					description: this.props.currUserProfile.description,
					newDescription: this.props.currUserProfile.description,
					profile_pic: this.props.currUserProfile.profile_pic,
				});
			}
		}
	}

	render() {
		const onSaveDescription = () => {
			this.setState({ editDescription: false });
			if (this.state.description !== this.state.newDescription) {
				this.props.updateProfile(this.state.user, this.state.newDescription, null);
			}
		};

		return (
			<div class="profile">
				<div class="userProfile">
					{this.state.profile_pic ? (
						<div className="photoBox">
							<img className="circular--landscape profilePicture" src={this.state.profile_pic} />
							<div className="circular--landscape cameraButton" onClick={(e) => this.upload.click()}>
								<input
									type="file"
									id="file_input"
									ref={(ref) => (this.upload = ref)}
									style={{ display: "none" }}
									onChange={this._handlePictureChange}
								/>
								<CameraFilled className="cameraIcon" />
							</div>
						</div>
					) : (
						<LoadingOutlined className="loadingProfilePicBig" />
					)}
					<div className="userInfo">
						<h1 className="profileName">
							{this.state.first_name} {this.state.last_name}
						</h1>
						<h1 className="profileUserName"> {this.state.username}</h1>
						{!this.state.editDescription ? (
							<div>
								<h1 className="profileDescription">{this.state.description}</h1>
								<EditFilled
									className="editDescriptionButton"
									onClick={() => {
										this.setState({ editDescription: true });
									}}
								/>
							</div>
						) : (
							<Form name="description" className="descriptionInput" initialValues={{ remember: true }} onFinish={onSaveDescription}>
								<Form.Item name="description" rules={[{ required: false, message: " " }]}>
									<textarea
										rows="3"
										maxLength="130"
										className="descriptionText"
										value={this.state.description}
										defaultValue={this.state.description}
										onChange={this._handleDescriptionChange}
									/>
								</Form.Item>
								<Form.Item>
									<Button htmlType="submit" className="editButton">
										<CheckOutlined className="editDescriptionButton" />
									</Button>
								</Form.Item>
							</Form>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCurrUser: (user) => dispatch(fetchCurrUser(user)),
		updateProfile: (user, description, profile_pic) => dispatch(updateProfile(user, description, profile_pic)),
	};
};

export default connect(null, mapDispatchToProps)(withRouter(EditProfile));
