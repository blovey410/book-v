import { deleted, get, post } from '@/api/client';

const path = '/borrow';

// 借阅图书
export function addData(data) {
	return post(`${path}/borrow`, data);
}

// 归还图书
export function returnData(data) {
	return post(`${path}/return`, data);
}

export function getAllList(data) {
	return get(`${path}/page/${data.type}`, data);
}

// 查询个人的借阅记录或归还记录
export function getBorrowById(userId, type) {
	return get(`${path}/page/${type}/${userId}`, );
}

export function delData(data) {
	return get(`${path}/delete`, data);
}

export function editData(data) {
	return post(`${path}/update`, data);
}

export function getDataById(id) {
	return get(`${path}/getOne`, id);
}
