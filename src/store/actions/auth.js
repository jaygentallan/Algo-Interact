import * as actionTypes from "./actionTypes";
import axios from "axios";
import { local } from "d3";

var DEBUG = false;

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, id, username, first_name, last_name) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		id: id,
		username: username,
		first_name: first_name,
		last_name: last_name,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	localStorage.removeItem("user");
	localStorage.removeItem("id");
	localStorage.removeItem("username");
	localStorage.removeItem("first_name");
	localStorage.removeItem("last_name");
	localStorage.removeItem("expirationDate");
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authLogin = (username, password) => {
	return (dispatch) => {
		dispatch(authStart());

		if (DEBUG) {
			axios
				.post("http://127.0.0.1:8000/users/rest-auth/login/", {
					username: username,
					password: password,
				})
				.then((res) => {
					console.log("RES:", res);
					const token = res.data.key;
					const id = res.data.user.id;
					const username = res.data.user.username;
					const first_name = res.data.user.first_name;
					const last_name = res.data.user.last_name;
					const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
					localStorage.setItem("token", token);
					localStorage.setItem("id", id);
					localStorage.setItem("username", username);
					localStorage.setItem("first_name", first_name);
					localStorage.setItem("last_name", last_name);
					localStorage.setItem("expirationDate", expirationDate);
					dispatch(authSuccess(token, id, username, first_name, last_name));
					dispatch(checkAuthTimeout(3600));
				})
				.catch((err) => {
					dispatch(authFail(err));
				});
		} else {
			axios
				.post("https://algointeract.com/users/rest-auth/login/", {
					username: username,
					password: password,
				})
				.then((res) => {
					console.log("RES:", res);
					const token = res.data.key;
					const id = res.data.user.id;
					const username = res.data.user.username;
					const first_name = res.data.user.first_name;
					const last_name = res.data.user.last_name;
					const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
					localStorage.setItem("token", token);
					localStorage.setItem("id", id);
					localStorage.setItem("username", username);
					localStorage.setItem("first_name", first_name);
					localStorage.setItem("last_name", last_name);
					localStorage.setItem("expirationDate", expirationDate);
					dispatch(authSuccess(token, id, username, first_name, last_name));
					dispatch(checkAuthTimeout(3600));
				})
				.catch((err) => {
					dispatch(authFail(err));
				});
		}
	};
};

export const authSignup = (username, first_name, last_name, email, password1, password2) => {
	var token;
	var id;
	return (dispatch) => {
		dispatch(authStart());

		if (DEBUG) {
			// Axios Post Request to users/rest-auth/registration/
			axios
				.post("http://127.0.0.1:8000/users/rest-auth/registration/", {
					username: username,
					first_name: first_name,
					last_name: last_name,
					email: email,
					password1: password1,
					password2: password2,
				})
				.then((res) => {
					token = res.data.key;
					id = res.data.user.id;
					const username = res.data.user.username;
					const first_name = res.data.user.first_name;
					const last_name = res.data.user.last_name;
					const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
					localStorage.setItem("token", token);
					localStorage.setItem("id", id);
					localStorage.setItem("username", username);
					localStorage.setItem("first_name", first_name);
					localStorage.setItem("last_name", last_name);
					localStorage.setItem("expirationDate", expirationDate);
					dispatch(authSuccess(token, id, username, first_name, last_name));
					dispatch(checkAuthTimeout(3600));
				})
				.catch((err) => {
					dispatch(authFail(err));
				});

			// Axis Post Request to users/profiles/
			setTimeout(() => {
				axios
					.post(
						"http://127.0.0.1:8000/users/profiles/",
						{
							user: id,
							username: username,
						},
						{
							headers: {
								Authorization: "Token " + token,
							},
						}
					)
					.catch((err) => {
						console.log("ERROR:", err);
					});
			}, 100);
		} else {
			// Axios Post Request to users/rest-auth/registration/
			axios
				.post("https://algointeract.com/users/rest-auth/registration/", {
					username: username,
					first_name: first_name,
					last_name: last_name,
					email: email,
					password1: password1,
					password2: password2,
				})
				.then((res) => {
					token = res.data.key;
					id = res.data.user.id;
					const username = res.data.user.username;
					const first_name = res.data.user.first_name;
					const last_name = res.data.user.last_name;
					const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
					localStorage.setItem("token", token);
					localStorage.setItem("id", id);
					localStorage.setItem("username", username);
					localStorage.setItem("first_name", first_name);
					localStorage.setItem("last_name", last_name);
					localStorage.setItem("expirationDate", expirationDate);
					dispatch(authSuccess(token, id, username, first_name, last_name));
					dispatch(checkAuthTimeout(3600));
				})
				.catch((err) => {
					dispatch(authFail(err));
				});

			// Axis Post Request to users/profiles/
			setTimeout(() => {
				axios
					.post(
						"https://algointeract.com/users/profiles/",
						{
							user: id,
							username: username,
						},
						{
							headers: {
								Authorization: "Token " + token,
							},
						}
					)
					.catch((err) => {
						console.log("ERROR:", err);
					});
			}, 100);
		}
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		const id = localStorage.getItem("id");
		const username = localStorage.getItem("username");
		const first_name = localStorage.getItem("first_name");
		const last_name = localStorage.getItem("last_name");
		if (token === undefined) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(token, id, username, first_name, last_name));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};
