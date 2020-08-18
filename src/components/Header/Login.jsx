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
			isAuthenticated: false,
			loading: false,
		};
	}

	componentDidMount() {
		this.setState({
			isAuthenticated: this.props.isAuthenticated,
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
			this.setState({
				prompt: <p className="logInSuccessful">Logged in successfully!</p>,
				loading: false,
			});
			setTimeout(() => {
				this.props._updateLogin(true);
				this.props._updateModal(false);
				this.setState({
					prompt: null,
				});
			}, 1000);
		} else if (prevProps.loading !== this.props.loading && !this.props.loading) {
			console.log("LOADING");
			this.setState({
				prompt: <p className="logInUnsuccessful">The username or password is incorrect!</p>,
				loading: true,
			});
			setTimeout(() => {
				this.setState({
					loading: false,
					prompt: null,
				});
				this.props._updateLogin(true);
			}, 1000);
		}
	}

	render() {
		const onFinish = (values) => {
			this.props.onAuth(values.username, values.password);
			this.setState({ loading: true });
		};

		return (
			<div>
				<div className="logInLogo">
					<img src={"https://algointeract.s3.amazonaws.com/static/images/header_logo.png"} />
				</div>
				{this.state.prompt ? (
					this.state.prompt
				) : this.state.loading ? (
					<LoadingOutlined className="loginLoading" />
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
								<Input
									className="loginInput"
									prefix={<LockOutlined className="site-form-item-icon" />}
									type="password"
									placeholder="Password"
								/>
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
											this.props._updateLogin(false);
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

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
	};
};

export default connect(null, mapDispatchToProps)(NormalLoginForm);
