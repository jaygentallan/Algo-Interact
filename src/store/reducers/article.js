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
	EDIT_ARTICLE_REQUEST,
	EDIT_ARTICLE_SUCCESS,
	EDIT_ARTICLE_FAILURE,
	DELETE_ARTICLE_REQUEST,
	DELETE_ARTICLE_SUCCESS,
	DELETE_ARTICLE_FAILURE,
	FETCH_DRAFTS_REQUEST,
	FETCH_DRAFTS_SUCCESS,
	FETCH_DRAFTS_FAILURE,
	CREATE_DRAFT_REQUEST,
	CREATE_DRAFT_SUCCESS,
	CREATE_DRAFT_FAILURE,
	DELETE_DRAFT_REQUEST,
	DELETE_DRAFT_SUCCESS,
	DELETE_DRAFT_FAILURE,
	CLEAR_ARTICLE_STATUS,
	AUTH_LOGOUT,
} from "../actions/actionTypes";

const initialState = {
	articles: null,
	currArticle: null,
	articleStatus: { postStatus: false, deleteStatus: false, editStatus: false, createDraftStatus: false, deleteDraftStatus: false },
	drafts: null,
	error: null,
};

const articleReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ALL_ARTICLES_REQUEST:
			return {
				...state,
				error: null,
			};
		case FETCH_ALL_ARTICLES_SUCCESS:
			return {
				...state,
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
				articleStatus: { ...action.articleStatus },
			};
		case CREATE_ARTICLE_FAILURE:
			return {
				...state,
			};
		case EDIT_ARTICLE_REQUEST:
			return {
				...state,
			};
		case EDIT_ARTICLE_SUCCESS:
			return {
				...state,
				articleStatus: { ...action.articleStatus },
			};
		case EDIT_ARTICLE_FAILURE:
			return {
				...state,
			};
		case DELETE_ARTICLE_REQUEST:
			return {
				...state,
			};
		case DELETE_ARTICLE_SUCCESS:
			return {
				...state,
				articleStatus: { ...action.articleStatus },
			};
		case DELETE_ARTICLE_FAILURE:
			return {
				...state,
			};
		case FETCH_DRAFTS_REQUEST:
			return {
				...state,
				error: null,
			};
		case FETCH_DRAFTS_SUCCESS:
			return {
				...state,
				...action,
				error: null,
			};
		case FETCH_DRAFTS_FAILURE:
			return {
				...state,
				error: action.error,
			};
		case CREATE_DRAFT_REQUEST:
			return {
				...state,
			};
		case CREATE_DRAFT_SUCCESS:
			return {
				...state,
				articleStatus: { ...action.articleStatus },
			};
		case CREATE_DRAFT_FAILURE:
			return {
				...state,
			};
		case DELETE_DRAFT_REQUEST:
			return {
				...state,
			};
		case DELETE_DRAFT_SUCCESS:
			return {
				...state,
				articleStatus: { ...action.articleStatus },
			};
		case DELETE_DRAFT_FAILURE:
			return {
				...state,
			};
		case CLEAR_ARTICLE_STATUS:
			return {
				...state,
				articleStatus: { postStatus: false, deleteStatus: false, editStatus: false, createDraftStatus: false, deleteDraftStatus: false },
			};
		case AUTH_LOGOUT:
			return {
				articles: null,
				currArticle: null,
				articleStatus: null,
				drafts: null,
				error: null,
			};
		default:
			return state;
	}
};

export default articleReducer;
