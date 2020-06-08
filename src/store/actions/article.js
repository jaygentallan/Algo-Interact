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

export const createArticle = (user_id, first_name, last_name, title, subtitle, content) => {
	const data = { user_id: user_id, first_name: first_name, last_name: last_name, title: title, subtitle: subtitle, content: content };
	const token = localStorage.getItem("token");
	console.log("CREATING ARTICLE WITH:", token, user_id, title.toString(), subtitle.toString(), content.toString());
	return (dispatch) => {
		if (DEBUG) {
			axios
				.post("http://127.0.0.1:8000/api/articles/", data, { headers: { Authorization: "Token " + token } })
				.then((res) => {
					console.log("RES:", res);
					dispatch(createArticleSuccess(res));
				})
				.catch((err) => {
					console.log("ERROR:", err);
					dispatch(createArticleFailure(err));
				});
		} else {
			axios
				.post("https://algointeract.com/api/articles/", data, { headers: { Authorization: "Token " + token } })
				.then((res) => {
					console.log("RES:", res);
					dispatch(createArticleSuccess(res));
				})
				.catch((err) => {
					console.log("ERROR:", err);
					dispatch(createArticleFailure(err));
				});
		}
	};
};
