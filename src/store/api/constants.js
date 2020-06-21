import { DEBUG } from "../../debug";
export const API_URL = DEBUG === true ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;

// User URLs
export const USER_URL = API_URL + "users/";
export const USER_REGISTER_URL = USER_URL + "rest-auth/registration/";
export const USER_LOGIN_URL = USER_URL + "rest-auth/login/";
export const USER_EDIT_URL = USER_URL + "edit/";
export const USER_DELETE_URL = "/delete/";

// Article URLs
export const ARTICLE_URL = API_URL + "articles/";
export const ARTICLE_CREATE_URL = ARTICLE_URL + "create/";
export const ARTICLE_EDIT_URL = "/edit/";
export const ARTICLE_DELETE_URL = "/delete/";
