import { deleted, get, post } from '@/api/client';

const path = '/borrow';

export function addData(data) {
	return post(`${path}/save`, data);
}

export function getAllList(type, data) {
	return get(`${path}/page/${type}`, data);
}

export function getBorrowById(id, type, data) {
	return get(`${path}/get/${id}/${type}`, da);
}

export function delData(data) {
	return get(`${path}/delete`, data);
}

export function editData(data) {
	return post(`${path}/update`, data);
}
