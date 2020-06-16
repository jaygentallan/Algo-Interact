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
import axios from "axios";
import { axisBottom } from "d3";

var DEBUG = false;
axios.defaults.withCredentials = true;

export const fetchArticleRequest = () => {
	return {
		type: FETCH_ARTICLE_REQUEST,
	};
};

export const fetchArticleSuccess = (article) => {
	return {
		type: FETCH_ARTICLE_SUCCESS,
		article,
	};
};

export const fetchArticleFailure = (error) => {
	return {
		type: FETCH_ARTICLE_FAILURE,
		error,
	};
};

export const createArticleRequest = (newArticle) => {
	return {
		type: CREATE_ARTICLE_REQUEST,
		newArticle,
	};
};

export const createArticleSuccess = (newArticle) => {
	return {
		type: CREATE_ARTICLE_SUCCESS,
		newArticle,
	};
};

export const createArticleFailure = (error) => {
	return {
		type: CREATE_ARTICLE_FAILURE,
		error,
	};
};

export const createThreadSave = (newArticle) => {
	return {
		type: CREATE_ARTICLE_SAVE,
		name: newArticle.title,
		content: newArticle.content,
	};
};

export const createArticle = (user_id, first_name, last_name, title, subtitle, content, cover) => {
	const token = localStorage.getItem("token");
	var data = new FormData();
	data.append("user_id", user_id);
	data.append("first_name", first_name);
	data.append("last_name", last_name);
	data.append("title", title);
	data.append("subtitle", subtitle);
	data.append("content", content);
	if (cover) data.append("cover", cover);

	return (dispatch) => {
		if (DEBUG) {
			axios
				.post("http://127.0.0.1:8000/api/articles/", data, {
					headers: { Authorization: "Token " + token, "content-type": "multipart/form-data" },
				})
				.then((res) => {
					console.log("SUCCESSFULLY CREATED ARTICLE:", res);
					dispatch(createArticleSuccess(res));
				})
				.catch((err) => {
					console.log("FAILED CREATING ARTICLE:", err);
					dispatch(createArticleFailure(err));
				});
		} else {
			axios
				.post("https://algo-interact.herokuapp.com/api/articles/", data, {
					headers: { Authorization: "Token " + token, "content-type": "multipart/form-data" },
				})
				.then((res) => {
					console.log("SUCCESSFUL CREATION OF ARTICLE:", res);
					dispatch(createArticleSuccess(res));
				})
				.catch((err) => {
					console.log("FAILED CREATING ARTICLE:", err);
					dispatch(createArticleFailure(err));
				});
		}
	};
};
