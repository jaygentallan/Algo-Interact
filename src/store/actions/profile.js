import {
	FETCH_CURR_USER_REQUEST,
	FETCH_CURR_USER_SUCCESS,
	FETCH_CURR_USER_FAILURE,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE,
	CREATE_PROFILE_REQUEST,
	CREATE_PROFILE_SUCCESS,
	CREATE_PROFILE_FAILURE,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAILURE,
	CURR_USER_LOGOUT,
} from "./actionTypes";
import { fetchCurrUserAPI, fetchUserAPI, createProfileAPI, updateProfileAPI } from "../api/profile";

export const fetchCurrUserRequest = () => {
	return {
		type: FETCH_CURR_USER_REQUEST,
	};
};

export const fetchCurrUserSuccess = (currUserProfile) => {
	return {
		type: FETCH_CURR_USER_SUCCESS,
		currUserProfile,
	};
};

export const fetchCurrUserFailure = (error) => {
	return {
		type: FETCH_CURR_USER_FAILURE,
		error: error,
	};
};

export const fetchCurrUser = (user) => (dispatch) => {
	dispatch(fetchCurrUserRequest());

	fetchCurrUserAPI(user)
		.then((response) => {
			console.log("SUCCESSFULLY FETCHED CURRENT USER");
			dispatch(fetchCurrUserSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO FETCH CURRENT USER");
			dispatch(fetchCurrUserFailure(error));
		});
};

export const fetchUserRequest = () => {
	return {
		type: FETCH_USER_REQUEST,
	};
};

export const fetchUserSuccess = (userProfile) => {
	return {
		type: FETCH_USER_SUCCESS,
		userProfile,
	};
};

export const fetchUserFailure = (error) => {
	return {
		type: FETCH_USER_FAILURE,
		error: error,
	};
};

export const fetchUser = (user) => (dispatch) => {
	dispatch(fetchUserRequest());

	fetchUserAPI(user)
		.then((response) => {
			console.log("SUCCESSFULLY FETCHED USER WITH ID", user);
			dispatch(fetchUserSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO FETCH USER WITH ID", user);
			dispatch(fetchUserFailure(error));
		});
};

export const createProfileRequest = () => {
	return {
		type: CREATE_PROFILE_REQUEST,
	};
};

export const createProfileSuccess = (currUserProfile) => {
	return {
		type: CREATE_PROFILE_SUCCESS,
		currUserProfile,
	};
};

export const createProfileFailure = (error) => {
	return {
		type: CREATE_PROFILE_FAILURE,
		error: error,
	};
};

export const createProfile = (user, username, first_name, last_name) => (dispatch) => {
	dispatch(createProfileRequest());
	const token = localStorage.getItem("token");
	const data = { user: user, username: username, first_name: first_name, last_name: last_name };

	createProfileAPI(token, data)
		.then((response) => {
			console.log("SUCCESSFULLY CREATED PROFILE");
			dispatch(fetchCurrUserSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO CREATE PROFILE");
			dispatch(fetchCurrUserFailure(error));
		});
};

export const updateProfileRequest = () => {
	return {
		type: CREATE_PROFILE_REQUEST,
	};
};

export const updateProfileSuccess = (newUserProfile) => {
	return {
		type: CREATE_PROFILE_SUCCESS,
		newUserProfile,
	};
};

export const updateProfileFailure = (error) => {
	return {
		type: CREATE_PROFILE_FAILURE,
		error: error,
	};
};

export const updateProfile = (user, description, profile_pic) => (dispatch) => {
	dispatch(updateProfileRequest());
	const token = localStorage.getItem("token");
	var data = new FormData();
	if (description) data.append("description", description);
	if (profile_pic) data.append("profile_pic", profile_pic);

	updateProfileAPI(token, user, data)
		.then((response) => {
			console.log("SUCCESSFULLY UPDATED PROFILE");
			fetchCurrUserAPI(user)
				.then((res) => {
					console.log("SUCCESSFULLY FETCHED CURRENT USER");
					dispatch(fetchCurrUserSuccess(res.data));
				})
				.catch((err) => {
					console.log("FAILURE TO FETCH CURRENT USER");
					dispatch(fetchCurrUserFailure(err));
				});

			dispatch(updateProfileSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO UPDATE PROFILE");
			dispatch(updateProfileFailure(error));
		});
};

export const currUserLogout = () => {
	return {
		type: CURR_USER_LOGOUT,
	};
};
