import axios from "axios";
import router from "../router";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/userStores";

export function get(url, params) {
	return axios.request({ method: "get", params, url });
}

export function post(url, data) {
	return axios.request({ method: "post", data, url });
}

export function put(url, data) {
	return axios.request({
		method: "put",
		data,
		url,
		headers: { "content-type": "application/x-www-form-urlencoded" },
	});
}

export function delete(url, params) {
	return axios.request({
		method: "delete",
		params,
		url,
	});
}

// 添加请求拦截器
axios.interceptors.request.use(
	function (config) {
		// 在发送请求之前做些什么
		const userStore = useUserStore();
		const token = userStore.getToken();
		if (token) {
			config.headers["token"] = token;
		}
		return config;
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	},
);

// 添加响应拦截器
axios.interceptors.response.use(
	function (response) {
		// console.log(response.data);
		if (response.data.code === 400) {
			const userStore = useUserStore();
			userStore.clear();
			router.push("/login");
			Promise.reject("未登录");
		}
		// if (typeof response.data === "string") {
		// 	response.data = JSON.parse(response.data);
		// }
		if (response.data.code !== 200) {
			ElMessage.error({ message: response.data.msg ?? "接口异常" });
			Promise.reject(response.data.msg);
		}
		return response.data;
	},
	function (error) {
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		return Promise.reject(error);
	},
);
