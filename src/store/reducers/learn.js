import {
	FETCH_ALL_TOPICS_REQUEST,
	FETCH_ALL_TOPICS_SUCCESS,
	FETCH_ALL_TOPICS_FAILURE,
	FETCH_TOPIC_REQUEST,
	FETCH_TOPIC_SUCCESS,
	FETCH_TOPIC_FAILURE,
	CREATE_TOPIC_REQUEST,
	CREATE_TOPIC_SUCCESS,
	CREATE_TOPIC_FAILURE,
	EDIT_TOPIC_REQUEST,
	EDIT_TOPIC_SUCCESS,
	EDIT_TOPIC_FAILURE,
	DELETE_TOPIC_REQUEST,
	DELETE_TOPIC_SUCCESS,
	DELETE_TOPIC_FAILURE,
	CLEAR_TOPIC_STATUS,
	FETCH_ALL_REVIEWS_REQUEST,
	FETCH_ALL_REVIEWS_SUCCESS,
	FETCH_ALL_REVIEWS_FAILURE,
	FETCH_REVIEW_REQUEST,
	FETCH_REVIEW_SUCCESS,
	FETCH_REVIEW_FAILURE,
	CREATE_REVIEW_REQUEST,
	CREATE_REVIEW_SUCCESS,
	CREATE_REVIEW_FAILURE,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAILURE,
	AUTH_LOGOUT,
} from "../actions/actionTypes";

const initialState = {
	topics: null,
	currTopic: null,
	topicStatus: { createTopicStatus: null },
	reviews: null,
	currReview: null,
	error: null,
};

const learnReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ALL_TOPICS_REQUEST:
			return {
				...state,
				error: null,
			};
		case FETCH_ALL_TOPICS_SUCCESS:
			return {
				...state,
				...action,
				error: null,
			};
		case FETCH_ALL_TOPICS_FAILURE:
			return {
				...state,
				error: action.error,
			};
		case FETCH_TOPIC_REQUEST:
			return {
				...initialState,
				error: null,
			};
		case FETCH_TOPIC_SUCCESS:
			return {
				...action,
				error: null,
			};
		case FETCH_TOPIC_FAILURE:
			return {
				...state,
				error: action.error,
			};
		case CREATE_TOPIC_REQUEST:
			return {
				...state,
			};
		case CREATE_TOPIC_SUCCESS:
			return {
				...state,
			};
		case CREATE_TOPIC_FAILURE:
			return {
				...state,
			};
		case EDIT_TOPIC_REQUEST:
			return {
				...state,
			};
		case EDIT_TOPIC_SUCCESS:
			return {
				...state,
			};
		case EDIT_TOPIC_FAILURE:
			return {
				...state,
			};
		case DELETE_TOPIC_REQUEST:
			return {
				...state,
			};
		case DELETE_TOPIC_SUCCESS:
			return {
				...state,
			};
		case DELETE_TOPIC_FAILURE:
			return {
				...state,
			};
		case FETCH_ALL_REVIEWS_REQUEST:
			return {
				...state,
				error: null,
			};
		case FETCH_ALL_REVIEWS_SUCCESS:
			return {
				...state,
				...action,
				error: null,
			};
		case FETCH_ALL_REVIEWS_FAILURE:
			return {
				...state,
				error: action.error,
			};
		case FETCH_REVIEW_REQUEST:
			return {
				...initialState,
				error: null,
			};
		case FETCH_REVIEW_SUCCESS:
			return {
				...action,
				error: null,
			};
		case FETCH_REVIEW_FAILURE:
			return {
				...state,
				error: action.error,
			};
		case CREATE_REVIEW_REQUEST:
			return {
				...state,
			};
		case CREATE_REVIEW_SUCCESS:
			return {
				...state,
				topicStatus: { createTopicStatus: true },
			};
		case CREATE_REVIEW_FAILURE:
			return {
				...state,
			};
		case DELETE_REVIEW_REQUEST:
			return {
				...state,
			};
		case DELETE_REVIEW_SUCCESS:
			return {
				...state,
			};
		case DELETE_REVIEW_FAILURE:
			return {
				...state,
			};
		case CLEAR_TOPIC_STATUS:
			return {
				...state,
				topicStatus: { createTopicStatus: false },
			};
		case AUTH_LOGOUT:
			return {
				topics: null,
				currTopic: null,
				topicStatus: { createTopicStatus: null },
				reviews: null,
				currReview: null,
				error: null,
			};
		default:
			return state;
	}
};

export default learnReducer;
