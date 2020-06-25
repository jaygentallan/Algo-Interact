import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from "./actionTypes";
import { authLoginAPI, authSignupAPI } from "../api/auth";
import { fetchCurrUserAPI, createProfileAPI } from "../api/profile";
import { createDraftAPI } from "../api/article";
import {
	fetchCurrUserRequest,
	fetchCurrUserSuccess,
	fetchCurrUserFailure,
	createProfileRequest,
	createProfileSuccess,
	createProfileFailure,
	currUserLogout,
} from "./profile";
import { dispatch, interpolate } from "d3";

export const authStart = () => {
	return {
		type: AUTH_START,
	};
};

export const authSuccess = (token) => {
	return {
		type: AUTH_SUCCESS,
		token: token,
	};
};

export const authFail = (error) => {
	return {
		type: AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("user_id");
	localStorage.removeItem("expirationDate");

	// Remove current user profile data
	currUserLogout();

	return {
		type: AUTH_LOGOUT,
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
	const data = { username: username, password: password };

	return (dispatch) => {
		dispatch(authStart());

		authLoginAPI(data)
			.then((response) => {
				console.log("SUCCESSFULLY LOGGED IN");
				const token = response.data.key;
				const user = response.data.user.id;
				const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

				localStorage.setItem("token", token);
				localStorage.setItem("user_id", user);
				localStorage.setItem("expirationDate", expirationDate);
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout(3600));

				// Fetch current user profile data after successfully logging in
				dispatch(fetchCurrUserRequest());
				fetchCurrUserAPI(user)
					.then((response) => {
						dispatch(fetchCurrUserSuccess(response.data));
					})
					.catch((error) => {
						dispatch(fetchCurrUserFailure(error));
					});
			})
			.catch((error) => {
				console.log("FAILED TO LOG IN");
				dispatch(authFail(error));
			});
	};
};

export const authSignup = (username, first_name, last_name, email, password1, password2) => {
	const data = { username: username, first_name: first_name, last_name: last_name, email: email, password1: password1, password2: password2 };

	return (dispatch) => {
		dispatch(authStart());

		authSignupAPI(data)
			.then((response) => {
				const token = response.data.key;
				const user = response.data.user.id;
				const username = response.data.user.username;
				const first_name = response.data.user.first_name;
				const last_name = response.data.user.last_name;
				const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

				localStorage.setItem("token", token);
				localStorage.setItem("user_id", user);
				localStorage.setItem("expirationDate", expirationDate);
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout(3600));

				// Create current user profile after successfully signing up
				const profileData = { user: user, username: username, first_name: first_name, last_name: last_name };

				dispatch(createProfileRequest());
				createProfileAPI(token, profileData)
					.then((response) => {
						console.log("SUCCESSFULLY INITIALIZED USER PROFILE");
						dispatch(fetchCurrUserSuccess(response.data));
					})
					.catch((error) => {
						console.log("FAILED TO INITIALIZE USER PROFILE");
						dispatch(fetchCurrUserFailure(error));
					});

				// Create current user drafts after successfully signing up
				const draftData = { user: parseInt(user), drafts: [] };
				createDraftAPI(token, draftData)
					.then(() => {
						console.log("SUCCESSFULLY INITIALIZED USER DRAFT");
					})
					.catch(() => {
						console.log("FAILED TO INITIALIZE USER DRAFT");
					});
			})
			.catch((error) => {
				dispatch(authFail(error));
			});
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		const user = localStorage.getItem("user_id");

		if (token === undefined) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));

				// Fetch user profile data as page refreshes
				dispatch(fetchCurrUserRequest());
				fetchCurrUserAPI(user)
					.then((response) => {
						dispatch(fetchCurrUserSuccess(response.data));
					})
					.catch((error) => {
						dispatch(fetchCurrUserFailure(error));
					});
			}
		}
	};
};
