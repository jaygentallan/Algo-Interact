import { DEBUG } from "../../debug";
export const API_URL = DEBUG === true ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;

// User URLs
export const USER_URL = API_URL + "users/";
export const USER_REGISTER_URL = USER_URL + "rest-auth/registration/";
export const USER_LOGIN_URL = USER_URL + "rest-auth/login/";
export const USER_EDIT_URL = USER_URL + "edit/";
export const USER_VIEW_URL = USER_URL + "view/";
export const USER_DELETE_URL = "/delete/";

// Article URLs
export const ARTICLE_URL = API_URL + "articles/";
export const ARTICLE_CREATE_URL = ARTICLE_URL + "create/";
export const ARTICLE_EDIT_URL = ARTICLE_URL + "edit/";
export const ARTICLE_DELETE_URL = ARTICLE_URL + "delete/";
export const DRAFT_URL = ARTICLE_URL + "drafts/";
export const DRAFT_DELETE_URL = DRAFT_URL + "delete/";

// Learn Topics URLs
export const LEARN_URL = API_URL + "learn/";
export const TOPIC_URL = LEARN_URL + "topics/";
export const TOPIC_TABS_URL = TOPIC_URL + "tabs/";
export const TOPIC_VIEW_URL = TOPIC_URL + "view/";
export const TOPIC_CREATE_URL = TOPIC_URL + "create/";
export const TOPIC_EDIT_URL = TOPIC_URL + "edit/";
export const TOPIC_DELETE_URL = TOPIC_URL + "delete/";
export const REVIEW_URL = LEARN_URL + "reviews/";
export const REVIEW_CREATE_URL = REVIEW_URL + "create/";
export const REVIEW_DELETE_URL = REVIEW_URL + "delete/";
