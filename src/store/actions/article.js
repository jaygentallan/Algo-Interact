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
} from "./actionTypes";
import { fetchAllArticlesAPI, fetchArticleAPI, createArticleAPI } from "../api/article";
import axios from "axios";

axios.defaults.withCredentials = true;

export const fetchAllArticlesRequest = () => {
	return {
		type: FETCH_ALL_ARTICLES_REQUEST,
	};
};

export const fetchAllArticlesSuccess = (articles) => {
	return {
		type: FETCH_ALL_ARTICLES_SUCCESS,
		articles,
	};
};

export const fetchAllArticlesFailure = (error) => {
	return {
		type: FETCH_ALL_ARTICLES_FAILURE,
		error,
	};
};

export const fetchAllArticles = () => (dispatch) => {
	dispatch(fetchAllArticlesRequest());

	fetchAllArticlesAPI()
		.then((response) => {
			console.log("SUCCESSFULLY FETCHED ARTICLES");
			dispatch(fetchAllArticlesSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO FETCH ARTICLES");
			dispatch(fetchAllArticlesFailure(error));
		});
};

export const fetchArticleRequest = () => {
	return {
		type: FETCH_ARTICLE_REQUEST,
	};
};

export const fetchArticleSuccess = (currArticle) => {
	return {
		type: FETCH_ARTICLE_SUCCESS,
		currArticle,
	};
};

export const fetchArticleFailure = (error) => {
	return {
		type: FETCH_ARTICLE_FAILURE,
		error,
	};
};

export const fetchArticle = (id) => (dispatch) => {
	dispatch(fetchArticleRequest());

	fetchArticleAPI(id)
		.then((response) => {
			console.log("SUCCESSFULLY FETCHED ARTICLE WITH ID", id);
			dispatch(fetchArticleSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO FETCH ARTICLES");
			dispatch(fetchArticleFailure(error));
		});
};

export const createArticleRequest = () => {
	return {
		type: CREATE_ARTICLE_REQUEST,
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

export const createArticle = (user, first_name, last_name, title, subtitle, content, cover) => (dispatch) => {
	console.log(user, first_name, last_name, title, subtitle, content, cover);
	const token = localStorage.getItem("token");
	console.log("ARTICLE COVER:", typeof cover);
	var data = new FormData();
	data.append("user", user);
	data.append("first_name", first_name);
	data.append("last_name", last_name);
	data.append("title", title);
	data.append("subtitle", subtitle);
	data.append("content", content);
	if (cover) data.append("cover", cover);

	dispatch(createArticleRequest());

	createArticleAPI(token, data)
		.then((response) => {
			console.log("SUCCESSFULLY CREATED ARTICLE");
			fetchAllArticlesAPI()
				.then((response) => {
					console.log("SUCCESSFULLY FETCHED ARTICLES");
					dispatch(fetchAllArticlesSuccess(response.data));
				})
				.catch((error) => {
					console.log("FAILURE TO FETCH ARTICLES");
					dispatch(fetchAllArticlesFailure(error));
				});
			dispatch(createArticleSuccess(response));
		})
		.catch((error) => {
			dispatch(createArticleFailure(error));
		});
};
