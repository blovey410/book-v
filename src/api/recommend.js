import { deleted, get, post, put } from '@/api/client';

/**
 * 查询分页列表
 * @param {*} data
 * @returns
 */
export const getRecommendPage = (data) => {
	return get(`/recommend/page`, data);
};

/**
 * 修改信息
 * @param {*} data
 * @returns
 */
export const updateRecommend = (data) => {
	return post('/recommend/updateById', data);
};

/**
 * 添加信息
 * @param {*} data
 * @returns
 */
export const addRecommend = (data) => {
	return post('/recommend/save', data);
};
/**
 * 删除
 * @param {*} data
 * @returns
 */
export const deletedRecommend = (data) => {
	return deleted('/recommend/delete', data);
};

/**
 * 根据id查询
 * @param  id
 * @returns
 */
export const getRecommendById = (id) => {
	return get(`/recommend/getOne`, { id });
};

/**
 * 查询全部列表
 * @param  id
 * @returns
 */
export const getRecommendList = () => {
	return get(`/recommend/list`);
};
