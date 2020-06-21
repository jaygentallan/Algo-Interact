import {
	FETCH_ALL_ARTICLES_REQUEST,
	FETCH_ALL_ARTICLES_SUCCESS,
	FETCH_ALL_ARTICLES_FAILURE,
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
} from "../actions/actionTypes";

const articleInitialState = {
	articles: null,
	currArticle: null,
	error: null,
};

const initialState = {
	...articleInitialState,
};

const articleReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ALL_ARTICLES_REQUEST:
			return {
				...initialState,
				error: null,
			};
		case FETCH_ALL_ARTICLES_SUCCESS:
			return {
				...action,
				error: null,
			};
		case FETCH_ALL_ARTICLES_FAILURE:
			return {
				...state,
				error: action.error,
			};
		case FETCH_ARTICLE_REQUEST:
			return {
				...initialState,
				error: null,
			};
		case FETCH_ARTICLE_SUCCESS:
			return {
				...action,
				error: null,
			};
		case FETCH_ARTICLE_FAILURE:
			return {
				...state,
				error: action.error,
			};
		case CREATE_ARTICLE_REQUEST:
			return {
				...state,
			};
		case CREATE_ARTICLE_SUCCESS:
			return {
				...state,
			};
		case CREATE_ARTICLE_FAILURE:
			return {
				...state,
			};
		default:
			return state;
	}
};

export default articleReducer;
