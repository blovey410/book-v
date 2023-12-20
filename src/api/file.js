import { get, post } from "@/api/client";

const pre = "/file";

export const queryKnow = (data) => {
	return get(pre + "/list", data);
};
export const addKnow = (data) => {
	return post(pre + "/add", data);
};
export const deleteKnow = (id) => {
	return get(pre + "/delete", id);
};

export const queryFile = (id) => {
	return get(pre + "/getById", { id });
};


export const queryFileByLogin=()=>{
	return get(pre+"/listByUserId")
}
