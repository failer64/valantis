import axios from "axios";
import md5 from "md5";
import moment from "moment";

const date = moment().format("YYYY MM DD").split(" ").join("");
const password = "Valantis";
const token = password + "_" + date;

export const instance = axios.create({
	baseURL: 'https://api.valantis.store:41000/',
	headers: {
		"Content-Type": "application/json",
		"X-Auth": md5(token),
	}
});