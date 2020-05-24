import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import "./Header.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import * as actions from "../../store/actions/auth";

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
class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			prompt: null,
			isModalOpen: false,
			isAuthenticated: props.isAuthenticated,
			login: true,
		};
		this.updateLogin = this.updateLogin;
		this.updateModal = this.updateModal;
		this.updatePrompt = this.updatePrompt;
	}

	/*
	componentDidMount() {
		//this.getName();
	}

	getName() {
		console.log("TEST");
		axios
			.post("http://127.0.0.1:8080/core/token-auth/", {
				//username: username,
				//password: password,
			})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ username: json.username });
			});
	}
	*/

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
			<nav className="navbar navbar-expand navbar-dark bg-dark">
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
								<a class="nav-link">Visualizer</a>
							</Link>
						</li>
						<li class="nav-item px-2">
							<Link
								className="linkHeader"
								to={{
									pathname: "/learn",
								}}
							>
								<a class="nav-link">Learn</a>
							</Link>
						</li>
						<li class="nav-item px-2">
							<Link
								className="linkHeader"
								to={{
									pathname: "/discuss",
								}}
							>
								<a class="nav-link">Discuss</a>
							</Link>
						</li>
					</ul>
				</div>

				<div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item px-2">
							<a className="username">{this.props.username}</a>
						</li>
						<li class="nav-item px-2">
							{this.props.isAuthenticated ? (
								<div>
									<a class="nav-link" onClick={this.props.logout}>
										{" "}
										Logout{" "}
									</a>
								</div>
							) : (
								<a
									class="nav-link"
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
