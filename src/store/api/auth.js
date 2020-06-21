import axios from "axios";
import { USER_LOGIN_URL, USER_REGISTER_URL } from "./constants";

export const authLoginAPI = (data) => {
	return axios.post(USER_LOGIN_URL, data);
};

export const authSignupAPI = (data) => {
	return axios.post(USER_REGISTER_URL, data);
};
