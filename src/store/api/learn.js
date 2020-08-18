import axios from "axios";
import {
	TOPIC_URL,
	TOPIC_TABS_URL,
	TOPIC_VIEW_URL,
	TOPIC_CREATE_URL,
	TOPIC_EDIT_URL,
	TOPIC_DELETE_URL,
	REVIEW_URL,
	REVIEW_CREATE_URL,
	REVIEW_DELETE_URL,
} from "./constants";

axios.defaults.withCredentials = true;

export const fetchAllTopicsAPI = (type) => {
	return axios.get(TOPIC_TABS_URL + type + "/");
};

export const fetchTopicAPI = (title_id) => {
	return axios.get(TOPIC_VIEW_URL + title_id + "/");
};

export const createTopicAPI = (token, data) => {
	return axios.post(TOPIC_CREATE_URL, data, { headers: { Authorization: "Token " + token, "content-type": "multipart/form-data" } });
};

export const editTopicAPI = (token, id, data) => {
	return axios.patch(TOPIC_EDIT_URL + id + "/", data, { headers: { Authorization: "Token " + token, "content-type": "multipart/form-data" } });
};

export const deleteTopicAPI = (token, id) => {
	return axios.delete(TOPIC_DELETE_URL + id + "/", { headers: { Authorization: "Token " + token } });
};

export const fetchAllReviewsAPI = (user) => {
	return axios.get(REVIEW_URL);
};

export const fetchReviewAPI = (id) => {
	return axios.get(REVIEW_URL + id + "/");
};

export const createReviewAPI = (token, data) => {
	return axios.post(REVIEW_CREATE_URL, data, { headers: { Authorization: "Token " + token, "content-type": "multipart/form-data" } });
};

export const deleteReviewAPI = (token, id) => {
	return axios.delete(REVIEW_DELETE_URL + id + "/", { headers: { Authorization: "Token " + token } });
};
