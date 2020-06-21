import axios from "axios";
import { ARTICLE_URL, ARTICLE_CREATE_URL, ARTICLE_EDIT_URL, ARTICLE_DELETE_URL } from "./constants";

export const fetchAllArticlesAPI = () => {
	return axios.get(ARTICLE_URL);
};

export const fetchArticleAPI = (id) => {
	return axios.get(ARTICLE_URL + id + "/");
};

export const createArticleAPI = (token, data) => {
	console.log("TOKEN:", token, "CREATE ARTICLE DATA:", data);
	return axios.post(ARTICLE_CREATE_URL, data, { headers: { Authorization: "Token " + token, "content-type": "multipart/form-data" } });
};
