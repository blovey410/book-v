import { get, post } from "@/api/client";

/**
 * 查询全部
 * @returns {*}
 */
export function getTagList() {
	return get("/classification/list");
}

/**
 * page
 * size
 * @param params
 * @returns {*}
 */
export function getTagPage(params) {
	return get("/classification/list", params);
}

/**
 * 获取分类信息
 * @param id
 * @returns {*}
 */
export function getTagById(id) {
	return get(`/classification/getById`, { id });
}

/**
 * 修改分类信息
 * @param tag
 * @returns {*}
 */
export function updaTetag(tag) {
	return post("/classification/update", tag);
}

/**
 * 删除分类
 * @param id
 */
export function deletedTag(id) {
	return get("/classification/delete", { id });
}

/**
 * 保存分类
 * @param ac
 * @returns {*}
 */
export function saveTag(ac) {
	return post("/classification/add", ac);
}
