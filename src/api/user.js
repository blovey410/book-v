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

/**
 * 查询用户列表
 * @param {*} data
 * @returns
 */
export const getUserList = (data) => {
	return get('/user/list', data);
};

/**
 * 修改用户信息
 * @param {*} data
 * @returns
 */
export const updateUser = (data) => {
	return post('/user/update', data);
};

export const register = (data) => {
	return post('/user/register', data);
};
/**
 * 添加用户信息
 * @param {*} data
 * @returns
 */
export const addUser = (data) => {
	return post('/user/add', data);
};
/**
 * 添加用户信息
 * @param {*} data
 * @returns
 */
export const deletedUser = (data) => {
	return get('/user/delete', data);
};

/**
 * 添加用户信息
 * @param  id
 * @returns
 */
export const getUserById = (id) => {
	return get(`/user/getById?id=${id}`);
};
