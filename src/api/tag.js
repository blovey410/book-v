import { deleted,get, post } from "@/api/client";

/**
 * 查询全部
 * @returns {*}
 */
export function getTagList() {
	return get("/tag/list");
}

/**
 * page
 * size
 * @param params
 * @returns {*}
 */
export function getTagPage(params) {
	return get("/tag/list", params);
}

/**
 * 获取分类信息
 * @param id
 * @returns {*}
 */
export function getTagById(id) {
	return get(`/tag/getOne`, { id });
}

/**
 * 修改分类信息
 * @param tag
 * @returns {*}
 */
export function updaTetag(tag) {
	return post("/tag/updateById", tag);
}

/**
 * 删除分类
 * @param id
 */
export function deletedTag(id) {
	return deleted("/tag/delete", { id });
}

/**
 * 保存分类
 * @param ac
 * @returns {*}
 */
export function saveTag(ac) {
	return post("/tag/save", ac);
}
