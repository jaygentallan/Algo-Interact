import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import "./Header.css";
import * as actions from "../../store/actions/auth";

// Login form
import { Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Spin, Icon } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class NormalLoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			prompt: null,
			loading: false,
		};
	}

	render() {
		if (this.props.error) {
			if (this.props.error.message === "Request failed with status code 400") {
				this.props.updatePrompt(<p>No account exists!</p>);
			}
		}
		const onFinish = (values) => {
			this.props.onAuth(values.username, values.password);
			this.setState({ loading: true });
			setTimeout(() => {
				if (this.props.isAuthenticated) {
					this.setState({
						prompt: <p className="logInSuccessful">Logged in successfully!</p>,
						loading: false,
					});
				} else {
					this.setState({
						prompt: <p className="logInUnsuccessful">The username or password is incorrect!</p>,
						loading: false,
					});
				}
			}, 1000);
			setTimeout(() => {
				this.props.updateLogin(true);
				this.props.updateModal(false);
				this.setState({
					prompt: null,
				});
			}, 2000);
		};

		return (
			<div>
				<div className="logInLogo">
					<img src={"https://algointeract.s3.amazonaws.com/static/images/header_logo.png"} />
				</div>
				{this.state.prompt ? (
					this.state.prompt
				) : this.props.loading || this.state.loading ? (
					<Spin indicator={antIcon} className="loading" />
				) : (
					<div>
						{this.props.articlePrompt ? (
							<p className="articlePrompt display-4 text-center" style={{ color: "grey" }}>
								{this.props.articlePrompt}
							</p>
						) : null}
						<Form
							name="normal_login"
							className="login-form"
							initialValues={{
								remember: true,
							}}
							onFinish={onFinish}
						>
							<Form.Item
								name="username"
								className="input"
								rules={[
									{
										required: true,
										message: "Please input your Username!",
									},
								]}
							>
								<Input className="loginInput" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
							</Form.Item>
							<Form.Item
								name="password"
								className="input"
								rules={[
									{
										required: true,
										message: "Please input your Password!",
									},
								]}
							>
								<Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
							</Form.Item>
							<Form.Item>
								<div className="logIn">
									<Button variant="outline-danger" className="logInButton" htmlType="submit">
										<p className="logInText"> Login </p>
									</Button>
								</div>
								<div className="signUp">
									<p className="signUpOne">Don't have an account?</p>
									<div
										className="signUpTwo"
										onClick={() => {
											this.props.updateLogin(false);
										}}
									>
										Sign Up
									</div>
								</div>
							</Form.Item>
						</Form>
					</div>
				)}
			</div>
		);
	}
}

//const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
