import { deleted, get, post } from '@/api/client';

const pre = '/book';

export const queryPage = (data) => {
	return get(pre + '/findPage', data);
};
export const addBook = (data) => {
	return post(pre + '/save', data);
};
export const deleteBook = (id) => {
	return deleted(pre + '/delete', id);
};
export const updateById = (data) => {
	return post(pre + '/updateById', data);
};
export const queryBook = (id) => {
	return get(pre + '/getOne', id);
};
export const getByTagId = (id) => {
	return get(pre + '/getByTagId', id);
};
export const queryBookByLogin = () => {
	return get(pre + '/listByUserId');
};
export const getHotBook = () => {
	return get(pre + '/hot');
};
export const getSearch = (data) => {
	return get(pre + '/search', data);
};
// 文件上传
export const upload = (data) => {
	return post(pre + '/upload', data);
};
export const queryList = () => {
	return get(`${pre}/list`);
};
