import React, { Component } from "react";
import { connect } from "react-redux";
import "./Header.css";
import * as actions from "../../store/actions/auth";

import axios from "axios";

// Login form
import { Form, Input, Select, Button, AutoComplete, Spin } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class RegistrationForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			prompt: null,
		};
	}

	render() {
		const onFinish = (values) => {
			this.props.onAuth(values.username, values.email, values.password, values.confirm);
			setTimeout(() => {
				if (this.props.isAuthenticated) {
					this.setState({
						prompt: <p className="logInSuccessful">Signed up successfully!</p>,
					});
				} else {
					this.setState({
						prompt: <p className="signUpUnsuccessful">Unsuccessful sign up!</p>,
					});
				}
			}, 100);
			setTimeout(() => {
				this.props.updateLogin(true);
				this.props.updateModal(false);
				this.setState({
					prompt: null,
				});
			}, 2000);

			const [form] = Form.useForm();
		};
		return (
			<div>
				<div className="logInLogo">
					<img src={"https://algointeract.s3.amazonaws.com/static/images/header_logo.png"} />
				</div>
				{this.state.prompt ? (
					this.state.prompt
				) : this.props.loading ? (
					<Spin indicator={antIcon} />
				) : (
					<Form
						form={this.form}
						name="register"
						className="signup-form"
						onFinish={onFinish}
						initialValues={{
							prefix: "86",
						}}
						scrollToFirstError
					>
						<Form.Item
							name="username"
							className="input"
							rules={[
								{
									required: true,
									message: "Please input your username!",
									whitespace: true,
								},
							]}
						>
							<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" className="formInput" />
						</Form.Item>

						<Form.Item
							name="email"
							className="input"
							rules={[
								{
									required: true,
									message: "Please input your Email!",
								},
							]}
						>
							<Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" className="formInput" />
						</Form.Item>

						<Form.Item
							name="password"
							className="input"
							rules={[
								{
									required: true,
									message: "Please input your password!",
								},
							]}
						>
							<Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" className="formInput" />
						</Form.Item>

						<Form.Item
							name="confirm"
							className="input"
							dependencies={["password"]}
							rules={[
								{
									required: true,
									message: "Please confirm your password!",
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}

										//return Promise.reject(<p class="warning">The two passwords that you entered do not match!</p>);
										return Promise.reject();
									},
								}),
							]}
						>
							<Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" className="formInput" />
						</Form.Item>
						<Form.Item>
							<div className="logIn">
								<Button variant="outline-danger" className="logInButton" htmlType="submit">
									<p className="logInText"> Sign Up </p>
								</Button>
							</div>
							<div className="signUp">
								<p className="signUpOne">Already have an account?</p>
								<div
									className="signUpTwo"
									onClick={() => {
										this.props.updateLogin(true);
									}}
								>
									Log In
								</div>
							</div>
						</Form.Item>
					</Form>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
