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
	FETCH_ALL_DRAFTS_REQUEST,
	FETCH_ALL_DRAFTS_SUCCESS,
	FETCH_ALL_DRAFTS_FAILURE,
	CREATE_DRAFT_REQUEST,
	CREATE_DRAFT_SUCCESS,
	CREATE_DRAFT_FAILURE,
	DELETE_DRAFT_REQUEST,
	DELETE_DRAFT_SUCCESS,
	DELETE_DRAFT_FAILURE,
	CLEAR_ARTICLE_STATUS,
} from "./actionTypes";
import {
	fetchAllArticlesAPI,
	fetchArticleAPI,
	createArticleAPI,
	editArticleAPI,
	deleteArticleAPI,
	fetchAllDraftsAPI,
	createDraftAPI,
	deleteDraftAPI,
} from "../api/article";
import { dispatch } from "d3";

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
			console.log("SUCCESSFULLY FETCHED ARTICLE");
			dispatch(fetchArticleSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO FETCH ARTICLE");
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
		articleStatus: { postStatus: true, editStatus: false, deleteStatus: false, createDraftStatus: false, deleteDraftStatus: false },
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
	const token = localStorage.getItem("token");
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

			setTimeout(() => {
				dispatch(clearArticleStatus());
			}, 2000);
		})
		.catch((error) => {
			dispatch(createArticleFailure(error));
		});
};

export const editArticleRequest = () => {
	return {
		type: EDIT_ARTICLE_REQUEST,
	};
};

export const editArticleSuccess = (newArticle) => {
	return {
		type: EDIT_ARTICLE_SUCCESS,
		articleStatus: { postStatus: false, editStatus: true, deleteStatus: false, createDraftStatus: false, deleteDraftStatus: false },
		newArticle,
	};
};

export const editArticleFailure = (error) => {
	return {
		type: EDIT_ARTICLE_FAILURE,
		error: error,
	};
};

export const editArticle = (id, title, subtitle, content, cover) => (dispatch) => {
	dispatch(editArticleRequest());
	const token = localStorage.getItem("token");
	var data = new FormData();
	if (title) data.append("title", title);
	if (subtitle) data.append("subtitle", subtitle);
	if (content) data.append("content", content);
	if (cover) data.append("cover", cover);

	editArticleAPI(token, id, data)
		.then((response) => {
			console.log("SUCCESSFULLY UPDATED ARTICLE", response);

			fetchAllArticlesAPI()
				.then((response) => {
					console.log("SUCCESSFULLY FETCHED ARTICLES");
					dispatch(fetchAllArticlesSuccess(response.data));
				})
				.catch((error) => {
					console.log("FAILURE TO FETCH ARTICLES");
					dispatch(fetchAllArticlesFailure(error));
				});

			dispatch(editArticleSuccess(response.data));

			setTimeout(() => {
				dispatch(clearArticleStatus());
			}, 2000);
		})
		.catch((error) => {
			console.log("FAILURE TO UPDATE ARTICLE");
			dispatch(editArticleFailure(error));
		});
};

export const deleteArticleRequest = () => {
	return {
		type: DELETE_ARTICLE_REQUEST,
	};
};

export const deleteArticleSuccess = () => {
	return {
		type: DELETE_ARTICLE_SUCCESS,
		articleStatus: { postStatus: false, editStatus: false, deleteStatus: true, createDraftStatus: false, deleteDraftStatus: false },
	};
};

export const deleteArticleFailure = (error) => {
	return {
		type: DELETE_ARTICLE_FAILURE,
		error,
	};
};

export const deleteArticle = (id) => (dispatch) => {
	const token = localStorage.getItem("token");
	dispatch(deleteArticleRequest());

	deleteArticleAPI(token, id)
		.then((response) => {
			console.log("SUCCESSFULLY DELETED ARTICLE");

			fetchAllArticlesAPI()
				.then((response) => {
					console.log("SUCCESSFULLY FETCHED ARTICLES");
					dispatch(fetchAllArticlesSuccess(response.data));
				})
				.catch((error) => {
					console.log("FAILURE TO FETCH ARTICLES");
					dispatch(fetchAllArticlesFailure(error));
				});

			dispatch(deleteArticleSuccess(response));

			setTimeout(() => {
				dispatch(clearArticleStatus());
			}, 2000);
		})
		.catch((error) => {
			console.log("FAILED TO DELETE ARTICLE");
			dispatch(deleteArticleFailure(error));
		});
};

export const clearArticleStatus = () => {
	return {
		type: CLEAR_ARTICLE_STATUS,
	};
};

export const fetchAllDraftsRequest = () => {
	return {
		type: FETCH_ALL_DRAFTS_REQUEST,
	};
};

export const fetchAllDraftsSuccess = (drafts) => {
	return {
		type: FETCH_ALL_DRAFTS_SUCCESS,
		drafts,
	};
};

export const fetchAllDraftsFailure = (error) => {
	return {
		type: FETCH_ALL_DRAFTS_FAILURE,
		error,
	};
};

export const fetchAllDrafts = (user) => (dispatch) => {
	dispatch(fetchAllDraftsRequest());

	fetchAllDraftsAPI(user)
		.then((response) => {
			console.log("SUCCESSFULLY FETCHED DRAFTS");
			dispatch(fetchAllDraftsSuccess(response.data));
		})
		.catch((error) => {
			console.log("FAILURE TO FETCH DRAFTS");
			dispatch(fetchAllDraftsFailure(error));
		});
};

export const createDraftRequest = () => {
	return {
		type: CREATE_DRAFT_REQUEST,
	};
};

export const createDraftSuccess = (drafts) => {
	return {
		type: CREATE_DRAFT_SUCCESS,
		drafts,
		articleStatus: { postStatus: false, editStatus: false, deleteStatus: false, createDraftStatus: true, deleteDraftStatus: false },
	};
};

export const createDraftFailure = (error) => {
	return {
		type: CREATE_DRAFT_FAILURE,
		error,
	};
};

export const createDraft = (user, title, subtitle, content, cover) => (dispatch) => {
	const token = localStorage.getItem("token");
	var data = new FormData();
	data.append("user", user);
	data.append("title", title);
	data.append("subtitle", subtitle);
	data.append("content", content);
	if (cover) data.append("cover", cover);

	dispatch(createDraftRequest());

	createDraftAPI(token, data)
		.then((response) => {
			console.log("SUCCESSFULLY CREATED DRAFT");

			fetchAllDraftsAPI(user)
				.then((response) => {
					console.log("SUCCESSFULLY FETCHED DRAFTS");
					dispatch(fetchAllDraftsSuccess(response.data));
				})
				.catch((error) => {
					console.log("FAILED TO CATCH DRAFTS");
					dispatch(fetchAllDraftsFailure(error));
				});

			dispatch(createDraftSuccess(response));

			setTimeout(() => {
				dispatch(clearArticleStatus());
			}, 2000);
		})
		.catch((error) => {
			console.log("FAILED TO CREATE DRAFT");
			dispatch(createDraftFailure(error));
		});
};

export const deleteDraftRequest = () => {
	return {
		type: DELETE_DRAFT_REQUEST,
	};
};

export const deleteDraftSuccess = () => {
	return {
		type: DELETE_DRAFT_SUCCESS,
		articleStatus: { postStatus: false, editStatus: false, deleteStatus: false, createDraftStatus: false, deleteDraftStatus: true },
	};
};

export const deleteDraftFailure = (error) => {
	return {
		type: DELETE_DRAFT_FAILURE,
		error,
	};
};

export const deleteDraft = (user, id) => (dispatch) => {
	const token = localStorage.getItem("token");
	dispatch(deleteDraftRequest());

	deleteDraftAPI(token, id)
		.then((response) => {
			console.log("SUCCESSFULLY DELETED DRAFT");

			fetchAllDraftsAPI(user)
				.then((response) => {
					console.log("SUCCESSFULLY FETCHED DRAFTS");
					dispatch(fetchAllDraftsSuccess(response.data));
				})
				.catch((error) => {
					console.log("FAILED TO CATCH DRAFTS");
					dispatch(fetchAllDraftsFailure(error));
				});

			dispatch(deleteDraftSuccess(response));

			setTimeout(() => {
				dispatch(clearArticleStatus());
			}, 2000);
		})
		.catch((error) => {
			console.log("FAILED TO DELETE DRAFT");
			dispatch(deleteDraftFailure(error));
		});
};
