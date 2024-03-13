import { deleted, get, post, put } from '@/api/client';

/**
 * 查询分页列表
 * @param {*} data
 * @returns
 */
export const getAnnouncementPage = (data) => {
	return get(`/announcement/page`, data);
};

/**
 * 修改信息
 * @param {*} data
 * @returns
 */
export const updateAnnouncement = (data) => {
	return post('/announcement/updateById', data);
};

/**
 * 添加信息
 * @param {*} data
 * @returns
 */
export const addAnnouncement = (data) => {
	return post('/announcement/save', data);
};
/**
 * 删除
 * @param {*} data
 * @returns
 */
export const deletedAnnouncement = (data) => {
	return deleted('/announcement/delete', data);
};

/**
 * 根据id查询
 * @param  id
 * @returns
 */
export const getAnnouncementById = (id) => {
	return get(`/announcement/getOne`, { id });
};

/**
 * 查询全部列表
 * @param  id
 * @returns
 */
export const getAnnouncementList = () => {
	return get(`/announcement/list`);
};
