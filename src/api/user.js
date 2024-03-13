import { deleted, get, post, put } from '@/api/client';

/**
 * 退出登录
 * @returns {*}
 */
export function logout() {
	return get('/user/logout');
}

/**
 * 登录
 * @param user
 * @returns {*}
 */
export function login(user) {
	return post('/user/login', user);
}

export function getUserPage(data) {
	return get('/user/page', data);
}

/**
 * 查询用户列表
 */
export const getUserList = () => {
	return get('/user/list', );
};

/**
 * 修改用户信息
 * @param {*} data
 * @returns
 */
export const updateUser = (data) => {
	return post('/user/updateById', data);
};

export const addUser = (data) => {
	return post('/user/save', data);
};

export const deletedUser = (data) => {
	return deleted('/user/delete', data);
};

export const getUserById = (id) => {
	return get(`/user/getOne?id=${id}`);
};
