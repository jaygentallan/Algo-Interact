import axios from "axios";
import { ARTICLE_URL, ARTICLE_CREATE_URL, ARTICLE_EDIT_URL, ARTICLE_DELETE_URL, DRAFT_URL, DRAFT_DELETE_URL } from "./constants";

axios.defaults.withCredentials = true;

export const fetchAllArticlesAPI = () => {
	return axios.get(ARTICLE_URL);
};

export const fetchArticleAPI = (id) => {
	return axios.get(ARTICLE_URL + id + "/");
};

export const createArticleAPI = (token, data) => {
	return axios.post(ARTICLE_CREATE_URL, data, { headers: { Authorization: "Token " + token, "content-type": "multipart/form-data" } });
};

export const editArticleAPI = (token, id, data) => {
	return axios.patch(ARTICLE_EDIT_URL + id + "/", data, { headers: { Authorization: "Token " + token, "content-type": "multipart/form-data" } });
};

export const deleteArticleAPI = (token, id) => {
	return axios.delete(ARTICLE_DELETE_URL + id + "/", { headers: { Authorization: "Token " + token } });
};

export const fetchAllDraftsAPI = (user) => {
	return axios.get(DRAFT_URL + user + "/");
};

export const createDraftAPI = (token, data) => {
	return axios.post(DRAFT_URL, data, { headers: { Authorization: "Token " + token, "content-type": "multipart/form-data" } });
};

export const deleteDraftAPI = (token, id) => {
	return axios.delete(DRAFT_DELETE_URL + id + "/", { headers: { Authorization: "Token " + token } });
};
