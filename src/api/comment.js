import { deleted,get, post } from "@/api/client";

/**
 * 添加评论
 * @param data
 * @returns {*}
 */
export function addComment(data) {
	return post("/comment/save", data);
}

export function getListAllComments(data) {
	return get("/comment/list", data);
}

export function delComment(data) {
	return get("/comment/delete", data);
}
