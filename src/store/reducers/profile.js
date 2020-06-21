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
	AUTH_LOGOUT,
} from "../actions/actionTypes";

const profileInitialState = {
	currUserProfile: null,
	userProfile: null,
	error: null,
};

const initialState = {
	...profileInitialState,
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CURR_USER_REQUEST:
			return {
				...initialState,
				error: null,
			};
		case FETCH_CURR_USER_SUCCESS:
			return {
				currUserProfile: action.currUserProfile,
				error: null,
			};
		case FETCH_CURR_USER_FAILURE:
			return {
				...state,
				error: action.error,
			};
		case FETCH_USER_REQUEST:
			return {
				...initialState,
				error: null,
			};
		case FETCH_USER_SUCCESS:
			return {
				userProfile: action.userProfile,
				error: null,
			};
		case FETCH_USER_FAILURE:
			return {
				...state,
				error: action.error,
			};
		case CREATE_PROFILE_REQUEST:
			return {
				...state,
			};
		case CREATE_PROFILE_SUCCESS:
			return {
				currUserProfile: action.currUserProfile,
				error: null,
			};
		case CREATE_PROFILE_FAILURE:
			return {
				...state,
			};
		case UPDATE_PROFILE_REQUEST:
			return {
				...state,
			};
		case UPDATE_PROFILE_SUCCESS:
			return {
				currUserProfile: { ...action.newUserProfile },
				error: null,
			};
		case UPDATE_PROFILE_FAILURE:
			return {
				...state,
			};
		case AUTH_LOGOUT:
			return {
				currUserProfile: { user: null, username: null, first_name: null, last_name: null, profile_pic: null },
				error: null,
			};
		default:
			return state;
	}
};

export default profileReducer;
