import {
	FETCH_ARTICLE_REQUEST,
	FETCH_ARTICLE_SUCCESS,
	FETCH_ARTICLE_FAILURE,
	CREATE_ARTICLE_REQUEST,
	CREATE_ARTICLE_SUCCESS,
	CREATE_ARTICLE_FAILURE,
	CREATE_ARTICLE_SAVE,
	CREATE_ARTICLE_TOGGLE,
	DELETE_ARTICLE_REQUEST,
	DELETE_ARTICLE_SUCCESS,
	DELETE_ARTICLE_FAILURE,
} from "./actionTypes";
import { updateObject } from "../utility";

const articleInitialState = {
	token: "",
	user_id: null,
	first_name: null,
	last_name: null,
	title: null,
	subtitle: null,
	content: null,
	created: null,
	error: null,
	loading: false,
};

const newArticleInitialState = {
	newArticleSuccess: false,
	newArticleLoading: false,
	newArticleError: null,
};

const initialState = {
	...articleInitialState,
	...newArticleInitialState,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ARTICLE_REQUEST:
			return {
				...initialState,
				loading: true,
				error: null,
			};
		case FETCH_ARTICLE_SUCCESS:
			return {
				...initialState,
				loading: true,
				error: null,
			};
		case FETCH_ARTICLE_FAILURE:
			return {};
		case CREATE_ARTICLE_REQUEST:
			return {
				...state,
				newArticleLoading: true,
				newArticleError: null,
				newArticleSuccess: false,
			};
		case CREATE_ARTICLE_SUCCESS:
			return {
				...state,
				newArticleLoading: false,
				newArticleSuccess: true,
				newArticleError: null,
			};
		case CREATE_ARTICLE_FAILURE:
			return {
				...state,
				newArticleLoading: false,
				newArticleError: action.error,
				newArticleSuccess: false,
			};
		default:
			return state;
	}
};

export default reducer;
