import { deletedd, get, post } from '@/api/client';

/**
 * 收藏
 * @param file
 * @returns {*}
 */
export function addCollection(file) {
	return post('/collection/add', file);
}

/**
 * 取消收藏
 * @param id
 * @returns {*}
 */
export function unCollection(id) {
	return get('/collection/delete', { id });
}

/**
 * 获取收藏的视频
 * @param page
 * @param size
 * @returns {*}
 */
export function getSelfCollect() {
	return get('/collection/getByUserId');
}
