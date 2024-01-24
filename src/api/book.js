import { get, post } from "@/api/client";

const pre = "/book";

export const queryList = (data) => {
	return get(pre + "/list", data);
};
export const addBook = (data) => {
	return post(pre + "/add", data);
};
export const deleteBook = (id) => {
	return get(pre + "/delete", id);
};

export const queryBook = (id) => {
	return get(pre + "/getById", { id });
};

export const getByTagId = (id) => {
	return get(pre + "/getByTagId", { id });
};

export const queryBookByLogin=()=>{
	return get(pre+"/listByUserId")
}
