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
	CLEAR_REVIEW_STATUS,
} from "./actionTypes";
import {
	fetchAllTopicsAPI,
	fetchTopicAPI,
	createTopicAPI,
	editTopicAPI,
	deleteTopicAPI,
	fetchAllReviewsAPI,
	fetchReviewAPI,
	createReviewAPI,
	deleteReviewAPI,
} from "../api/learn";

export const fetchAllTopicsRequest = () => {
	return {
		type: FETCH_ALL_TOPICS_REQUEST,
	};
};

export const fetchAllTopicsSuccess = (topics) => {
	return {
		type: FETCH_ALL_TOPICS_SUCCESS,
		topics,
	};
};

export const fetchAllTopicsFailure = (error) => {
	return {
		type: FETCH_ALL_TOPICS_FAILURE,
		error,
	};
};

export const fetchAllTopics = (type) => (dispatch) => {
	dispatch(fetchAllTopicsRequest());

	fetchAllTopicsAPI(type)
		.then((response) => {
			console.log("SUCCESSFULLY FETCHED TOPICS");
			dispatch(fetchAllTopicsSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO FETCH TOPICS");
			dispatch(fetchAllTopicsFailure(error));
		});
};

export const fetchTopicRequest = () => {
	return {
		type: FETCH_TOPIC_REQUEST,
	};
};

export const fetchTopicSuccess = (currTopic) => {
	return {
		type: FETCH_TOPIC_SUCCESS,
		currTopic,
	};
};

export const fetchTopicFailure = (error) => {
	return {
		type: FETCH_TOPIC_FAILURE,
		error,
	};
};

export const fetchTopic = (title_id) => (dispatch) => {
	dispatch(fetchTopicRequest());

	fetchTopicAPI(title_id)
		.then((response) => {
			console.log("SUCCESSFULLY FETCHED TOPIC");
			dispatch(fetchTopicSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO FETCH TOPIC");
			dispatch(fetchTopicFailure(error));
		});
};

export const createTopicRequest = () => {
	return {
		type: CREATE_TOPIC_REQUEST,
	};
};

export const createTopicSuccess = (newTopic) => {
	return {
		type: CREATE_TOPIC_SUCCESS,
		newTopic,
	};
};

export const createTopicFailure = (error) => {
	return {
		type: CREATE_TOPIC_FAILURE,
		error,
	};
};

export const createTopic = (user, first_name, last_name, title, subtitle, content, cover) => (dispatch) => {
	const token = localStorage.getItem("token");
	var data = new FormData();
	data.append("user", user);
	data.append("first_name", first_name);
	data.append("last_name", last_name);
	data.append("title", title);
	data.append("subtitle", subtitle);
	data.append("content", content);
	if (cover) data.append("cover", cover);

	dispatch(createTopicRequest());

	createTopicAPI(token, data)
		.then((response) => {
			console.log("SUCCESSFULLY CREATED TOPIC");

			fetchAllTopicsAPI()
				.then((response) => {
					console.log("SUCCESSFULLY FETCHED TOPICS");
					dispatch(fetchAllTopicsSuccess(response.data));
				})
				.catch((error) => {
					console.log("FAILURE TO FETCH TOPICS");
					dispatch(fetchAllTopicsFailure(error));
				});
			dispatch(createTopicSuccess(response));
		})
		.catch((error) => {
			dispatch(createTopicFailure(error));
		});
};

export const editTopicRequest = () => {
	return {
		type: EDIT_TOPIC_REQUEST,
	};
};

export const editTopicSuccess = (newTopic) => {
	return {
		type: EDIT_TOPIC_SUCCESS,
		newTopic,
	};
};

export const editTopicFailure = (error) => {
	return {
		type: EDIT_TOPIC_FAILURE,
		error: error,
	};
};

export const editTopic = (id, title, content, contributors) => (dispatch) => {
	dispatch(editTopicRequest());
	const token = localStorage.getItem("token");
	var data = new FormData();
	if (title) data.append("title", title);
	if (content) data.append("content", content);
	if (contributors) data.append("contributors", contributors);

	editTopicAPI(token, id, data)
		.then((response) => {
			console.log("SUCCESSFULLY UPDATED TOPIC", response);

			fetchAllTopicsAPI()
				.then((response) => {
					console.log("SUCCESSFULLY FETCHED TOPICS");
					dispatch(fetchAllTopicsSuccess(response.data));
				})
				.catch((error) => {
					console.log("FAILURE TO FETCH TOPICS");
					dispatch(fetchAllTopicsFailure(error));
				});

			dispatch(editTopicSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO UPDATE TOPIC");
			dispatch(editTopicFailure(error));
		});
};

export const deleteTopicRequest = () => {
	return {
		type: DELETE_TOPIC_REQUEST,
	};
};

export const deleteTopicSuccess = () => {
	return {
		type: DELETE_TOPIC_SUCCESS,
	};
};

export const deleteTopicFailure = (error) => {
	return {
		type: DELETE_TOPIC_FAILURE,
		error,
	};
};

export const deleteTopic = (id) => (dispatch) => {
	const token = localStorage.getItem("token");
	dispatch(deleteTopicRequest());

	deleteTopicAPI(token, id)
		.then((response) => {
			console.log("SUCCESSFULLY DELETED TOPIC");

			fetchAllTopicsAPI()
				.then((response) => {
					console.log("SUCCESSFULLY FETCHED TOPICS");
					dispatch(fetchAllTopicsSuccess(response.data));
				})
				.catch((error) => {
					console.log("FAILURE TO FETCH TOPICS");
					dispatch(fetchAllTopicsFailure(error));
				});

			dispatch(deleteTopicSuccess(response));
		})
		.catch((error) => {
			console.log("FAILED TO DELETE TOPIC");
			dispatch(deleteTopicFailure(error));
		});
};

export const fetchAllReviewsRequest = () => {
	return {
		type: FETCH_ALL_REVIEWS_REQUEST,
	};
};

export const fetchAllReviewsSuccess = (reviews) => {
	return {
		type: FETCH_ALL_REVIEWS_SUCCESS,
		reviews,
	};
};

export const fetchAllReviewsFailure = (error) => {
	return {
		type: FETCH_ALL_REVIEWS_FAILURE,
		error,
	};
};

export const fetchAllReviews = () => (dispatch) => {
	dispatch(fetchAllReviewsRequest());

	fetchAllReviewsAPI()
		.then((response) => {
			console.log("SUCCESSFULLY FETCHED REVIEWS");
			dispatch(fetchAllReviewsSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO FETCH REVIEWS");
			dispatch(fetchAllReviewsFailure(error));
		});
};

export const fetchReviewRequest = () => {
	return {
		type: FETCH_REVIEW_REQUEST,
	};
};

export const fetchReviewSuccess = (drafts) => {
	return {
		type: FETCH_REVIEW_SUCCESS,
		drafts,
	};
};

export const fetchReviewFailure = (error) => {
	return {
		type: FETCH_REVIEW_FAILURE,
		error,
	};
};

export const fetchReview = (id) => (dispatch) => {
	dispatch(fetchReviewRequest());

	fetchReviewAPI(id)
		.then((response) => {
			console.log("SUCCESSFULLY FETCHED REVIEW");
			dispatch(fetchReviewSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO FETCH REVIEW");
			dispatch(fetchReviewFailure(error));
		});
};

export const createReviewRequest = () => {
	return {
		type: CREATE_REVIEW_REQUEST,
	};
};

export const createReviewSuccess = (reviews) => {
	return {
		type: CREATE_REVIEW_SUCCESS,
		reviews,
		topicStatus: { createTopicStatus: true },
	};
};

export const createReviewFailure = (error) => {
	return {
		type: CREATE_REVIEW_FAILURE,
		error,
	};
};

export const createReview = (type, title, content, contributors) => (dispatch) => {
	const token = localStorage.getItem("token");
	var data = new FormData();
	data.append("type", type);
	data.append("title", title);
	data.append("content", content);
	data.append("contributors", contributors);

	dispatch(createReviewRequest());

	createReviewAPI(token, data)
		.then((response) => {
			console.log("SUCCESSFULLY CREATED REVIEW");
			dispatch(createReviewSuccess(response));

			setTimeout(() => {
				dispatch(clearReviewStatus());
			}, 2000);
		})
		.catch((error) => {
			console.log("FAILED TO CREATE REVIEW");
			dispatch(createReviewFailure(error));
		});
};

export const deleteReviewRequest = () => {
	return {
		type: DELETE_REVIEW_REQUEST,
	};
};

export const deleteReviewSuccess = () => {
	return {
		type: DELETE_REVIEW_SUCCESS,
	};
};

export const deleteReviewFailure = (error) => {
	return {
		type: DELETE_REVIEW_FAILURE,
		error,
	};
};

export const deleteReview = (id) => (dispatch) => {
	const token = localStorage.getItem("token");
	dispatch(deleteReviewRequest());

	deleteReviewAPI(token, id)
		.then((response) => {
			console.log("SUCCESSFULLY DELETED REVIEW");

			fetchAllReviewsAPI()
				.then((response) => {
					console.log("SUCCESSFULLY FETCHED REVIEWS");
					dispatch(fetchAllReviewsSuccess(response.data));
				})
				.catch((error) => {
					console.log("FAILED TO CATCH REVIEWS");
					dispatch(fetchAllReviewsFailure(error));
				});

			dispatch(deleteReviewSuccess(response));
		})
		.catch((error) => {
			console.log("FAILED TO DELETE REVIEW");
			dispatch(deleteReviewFailure(error));
		});
};

export const clearTopicStatus = () => {
	return {
		type: CLEAR_TOPIC_STATUS,
	};
};

export const clearReviewStatus = () => {
	return {
		type: CLEAR_REVIEW_STATUS,
	};
};
