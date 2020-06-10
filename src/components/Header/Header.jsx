import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import "./Header.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import * as actions from "../../store/actions/auth";
import { CaretDownOutlined, ContainerFilled, HeartFilled, SettingFilled, PoweroffOutlined } from "@ant-design/icons";

import axios from "axios";

// Login form
import NormalLoginForm from "./Login";
import RegistrationForm from "./Signup";

/*
  The static Header serves as the way for users to navigate
  to the Home, Visualizer, or Learn pages. The Header also has 
  the Algo-Interact logo that when clicked, is another way of 
  navigating back to the Home page.
*/

var DEBUG = false;

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image: "",
			prompt: null,
			isModalOpen: false,
			isAuthenticated: props.isAuthenticated,
			login: true,
			getImage: false,
		};

		this.updateLogin = this.updateLogin;
		this.updateModal = this.updateModal;
		this.updatePrompt = this.updatePrompt;
	}

	componentDidMount() {
		this.getImage();
	}

	getImage() {
		if (DEBUG) {
			axios.get("http://127.0.0.1:8000/users/profiles/").then((res) => {
				for (let i in res.data) {
					let user = res.data[i];
					if (user.username === this.props.username) {
						console.log("IMAGE:", user.image);
						this.setState({ image: user.image });
						return;
					}
				}
			});
		} else {
			axios.get("https://algo-interact.herokuapp.com/users/profiles/").then((res) => {
				for (let i in res.data) {
					let user = res.data[i];
					if (user.username === this.props.username) {
						console.log("IMAGE:", user.image);
						this.setState({ image: user.image });
						return;
					}
				}
			});
		}
	}

	updateLogin = (bool) => {
		this.setState({ login: bool });
	};

	updateModal = (bool) => {
		this.setState({ isModalOpen: bool });
	};

	updatePrompt = (string) => {
		this.setState({ prompt: string });
	};

	render() {
		if (this.props.isAuthenticated && !this.state.getImage) {
			this.getImage();
			this.setState({ getImage: true });
		}
		return (
			<nav className="navbar navbar-expand navbar-toggleable navbar-dark bg-dark">
				<div class="navbar-header">
					<a className="navbar-brand" href="/">
						<img src={"https://algointeract.s3.amazonaws.com/static/images/header_logo.png"} className="logo" />
					</a>
				</div>

				<div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item px-2">
							<Link
								className="linkHeader"
								to={{
									pathname: "/visualizer",
								}}
							>
								<a className="nav-link header">Visualizer</a>
							</Link>
						</li>
						<li class="nav-item px-2">
							<Link
								className="linkHeader"
								to={{
									pathname: "/learn",
								}}
							>
								<a class="nav-link header">Learn</a>
							</Link>
						</li>
						<li class="nav-item px-2">
							<Link
								className="linkHeader"
								to={{
									pathname: "/hub",
								}}
							>
								<a class="nav-link header">Hub</a>
							</Link>
						</li>
					</ul>
				</div>

				<div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item px-2">
							{this.props.isAuthenticated ? (
								<div class="dropdown user">
									<a
										className="username"
										role="button"
										id="dropdownMenuLink"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										<div>
											<img
												className="circular--landscape header profile"
												src={
													this.state.image
														? this.state.image
														: "https://algointeract.s3.amazonaws.com/media/profile_pics/default.png"
												}
											/>
											<CaretDownOutlined className="caret" />
										</div>
									</a>
									<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<a className="profile dropdown-item display-4">
											<img
												className="circular--landscape header profile big"
												src={
													this.state.image
														? this.state.image
														: "https://algointeract.s3.amazonaws.com/media/profile_pics/default.png"
												}
											/>
											<a className="username text">{this.props.username}</a>
										</a>
										<a className="options dropdown-item display-4" href="#">
											<ContainerFilled className="options icon" />
											My Posts
										</a>
										<a className="options dropdown-item display-4" href="#">
											<HeartFilled className="options icon" />
											Favorites
										</a>
										<a className="options dropdown-item display-4" href="#">
											<SettingFilled className="options icon" />
											Settings
										</a>
										<a
											class="options dropdown-item display-4 last"
											onClick={() => {
												this.setState({ image: "", getImage: false });
												this.props.logout();
											}}
										>
											<PoweroffOutlined className="options icon" />
											Logout
										</a>
									</div>
								</div>
							) : (
								<a
									class="nav-link header"
									onClick={() => {
										this.setState({ isModalOpen: true });
									}}
								>
									Login
								</a>
							)}
						</li>
					</ul>
				</div>
				<Modal
					class="center"
					show={this.state.isModalOpen}
					onHide={() => {
						this.setState({ isModalOpen: false });
					}}
					size="sm"
				>
					<Modal.Body>
						{this.state.login ? (
							<NormalLoginForm
								updateLogin={this.updateLogin}
								updateModal={this.updateModal}
								updatePrompt={this.updatePrompt}
								isAuthenticated={this.props.isAuthenticated}
							/>
						) : (
							<RegistrationForm
								updateLogin={this.updateLogin}
								updateModal={this.updateModal}
								updatePrompt={this.updatePrompt}
								isAuthenticated={this.props.isAuthenticated}
							/>
						)}
					</Modal.Body>
				</Modal>
			</nav>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(actions.logout()),
	};
};

export default connect(null, mapDispatchToProps)(Header);
