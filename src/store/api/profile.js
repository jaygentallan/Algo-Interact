import axios from "axios";
import { USER_URL, USER_EDIT_URL, USER_VIEW_URL } from "./constants";

axios.defaults.withCredentials = true;

export const fetchCurrUserAPI = (user) => {
	return axios.get(USER_URL + user + "/");
};

export const fetchUserAPI = (user) => {
	return axios.get(USER_URL + user + "/");
};

export const createProfileAPI = (token, data) => {
	return axios.post(USER_URL, data, { headers: { Authorization: "Token " + token } });
};

export const editProfileAPI = (token, user, data) => {
	return axios.patch(USER_EDIT_URL + user + "/", data, { headers: { Authorization: "Token " + token, "content-type": "multipart/form-data" } });
};

export const viewProfileAPI = (username) => {
	return axios.get(USER_VIEW_URL + username + "/");
};
