import axios from "axios";
import env from "react-dotenv";

let url;

if (process.env.NODE_ENV === "production") {
	url = env.APIURL;
}
if (process.env.NODE_ENV === "development") {
	url = "http://localhost:8000/api";
}

export default axios.create({
	baseURL: url,
});
