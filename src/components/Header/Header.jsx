import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import "./Header.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { CaretDownOutlined, ContainerFilled, HeartFilled, SettingFilled, PoweroffOutlined } from "@ant-design/icons";
import { DEBUG } from "../../debug";

import axios from "axios";

import { logout } from "../../store/actions/auth";
import { fetchCurrUser, currUserLogout } from "../../store/actions/profile";

// Login form
import NormalLoginForm from "./Login";
import RegistrationForm from "./Signup";

/*
  The static Header serves as the way for users to navigate
  to the Home, Visualizer, or Learn pages. The Header also has 
  the Algo-Interact logo that when clicked, is another way of 
  navigating back to the Home page.
*/

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: props.username,
			profile_pic: props.profile_pic,
			prompt: null,
			isModalOpen: false,
			isLogOutModalOpen: false,
			isAuthenticated: false,
			login: true,
			loading: true,
		};

		this.updateLogin = this.updateLogin;
		this.updateModal = this.updateModal;
		this.updatePrompt = this.updatePrompt;
	}

	componentDidMount() {
		this.setState({
			isAuthenticated: this.props.isAuthenticated,
		});
		if (this.props.currUserProfile) {
			this.setState({
				username: this.props.currUserProfile.username,
				profile_pic: this.props.currUserProfile.profile_pic,
			});
		} else {
			const user = localStorage.getItem("user_id");
			this.props.fetchCurrUser(user);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
			this.setState({
				isAuthenticated: this.props.isAuthenticated,
			});
		}
		if (prevProps.isAuthenticated !== this.props.isAuthenticated && !this.props.isAuthenticated) {
			this.setState({
				isLogOutModalOpen: true,
			});
			setTimeout(() => {
				this.setState({
					isLogOutModalOpen: false,
				});
			}, 2000);
		}
		if (prevProps.loading !== this.props.loading && !this.props.loading) {
			this.setState({
				loading: false,
			});
			setTimeout(() => {
				this.setState({
					loading: true,
				});
			}, 2000);
		}
		if (this.props.currUserProfile != null && prevProps.currUserProfile !== this.props.currUserProfile) {
			if (
				prevProps.currUserProfile !== this.props.currUserProfile ||
				prevProps.currUserProfile.username !== this.props.currUserProfile.username
			) {
				this.setState({
					username: this.props.currUserProfile.username,
					profile_pic: this.props.currUserProfile.profile_pic,
				});
			}
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
											{this.state.profile_pic !== null ? (
												<img className="circular--landscape headerProfile" src={this.state.profile_pic} />
											) : (
												<div></div>
											)}
											<CaretDownOutlined className="caret" />
										</div>
									</a>
									<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<Link
											to={{
												pathname: "/editprofile",
											}}
										>
											<a className="headerProfile dropdown-item display-4">
												{this.state.profile_pic !== null ? (
													<img className="circular--landscape headerProfile big" src={this.state.profile_pic} />
												) : (
													<div></div>
												)}
												<a className="username text">{this.state.username}</a>
											</a>
										</Link>
										<a className="options dropdown-item display-4" href="">
											<ContainerFilled className="options icon" />
											My Posts
										</a>
										<a className="options dropdown-item display-4" href="">
											<HeartFilled className="options icon" />
											Favorites
										</a>
										<a className="options dropdown-item display-4" href="">
											<SettingFilled className="options icon" />
											Settings
										</a>
										<a
											class="options dropdown-item display-4 last"
											onClick={() => {
												this.setState({ image: "", getImage: false });
												this.props.currUserLogout();
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
					className="logInModal"
					show={this.state.isModalOpen}
					onHide={() => {
						this.setState({
							login: true,
							isModalOpen: false,
						});
					}}
					size="sm"
				>
					<Modal.Body>
						{this.state.login ? (
							<NormalLoginForm
								updateLogin={this.updateLogin}
								updateModal={this.updateModal}
								updatePrompt={this.updatePrompt}
								isAuthenticated={this.state.isAuthenticated}
								loading={this.state.loading}
							/>
						) : (
							<RegistrationForm
								updateLogin={this.updateLogin}
								updateModal={this.updateModal}
								updatePrompt={this.updatePrompt}
								isAuthenticated={this.state.isAuthenticated}
								loading={this.state.loading}
							/>
						)}
					</Modal.Body>
				</Modal>

				<Modal
					className="logOutModal"
					show={this.state.isLogOutModalOpen}
					onHide={() => {
						this.setState({ isLogOutModalOpen: false });
					}}
					size="sm"
				>
					<Modal.Body>
						<div class="d-flex justify-content-center mb-3">
							<h1 className="logOutText">You have been logged out</h1>
						</div>
					</Modal.Body>
				</Modal>
			</nav>
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
		currUserLogout: () => dispatch(currUserLogout()),
		logout: () => dispatch(logout()),
		fetchCurrUser: (user) => dispatch(fetchCurrUser(user)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
