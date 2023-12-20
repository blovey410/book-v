<template>
	<div>
		<div>
			<el-button @click="addDialog = true">添加文件</el-button>
		</div>
		<el-table :data="tableData.records">
			<el-table-column prop="name" label="资料名称" />
			<el-table-column prop="create_user.username" label="上传人" />
			<el-table-column prop="url" label="文件封面" width="200">
				<template #default="scope">
					<el-image
						style="width: 80px; height: 50px"
						:src="prefix + '/file/preview?url=' + scope.row.cover"
					/>
				</template>
			</el-table-column>
			<el-table-column prop="create_time" label="上传时间" />
			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="small" @click="openEdit(scope.row.id)"
						>查看评论
					</el-button>
					<el-button size="small" @click="download(scope.row.id)" type="primary"
						>下载
					</el-button>
					<el-button size="small" @click="deleted(scope.row.id)" type="danger"
						>删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			v-model="addDialog"
			title="新增"
			width="30%"
			:before-close="resetForm"
		>
			<el-form
				:model="formKnow"
				label-width="120px"
				:rules="rules"
				ref="formRef"
			>
				<el-form-item label="文档名称" prop="name">
					<el-input v-model="formKnow.name" />
				</el-form-item>
				<el-form-item label="封面上传" prop="cover">
					<el-upload
						v-model:file-list="covers"
						:action="uploadUrl"
						:headers="{ Token: token }"
						list-type="picture-card"
						:limit="1"
						:on-success="coversSuccess"
					>
						<el-icon>
							<Plus />
						</el-icon>
					</el-upload>
				</el-form-item>
				<el-form-item label="文档上传" prop="url">
					<el-upload
						v-model:file-list="files"
						:action="uploadUrl"
						:headers="{ Token: token }"
						:before-upload="beforeUpload"
						:limit="1"
						:on-success="filesSuccess"
						accept=".pdf"
					>
						<el-icon>
							<Plus />
						</el-icon>
					</el-upload>
				</el-form-item>
				<el-form-item label="文档分类" prop="classification">
					<el-select v-model="formKnow.classification">
						<el-option
							v-for="(item, index) in tagList"
							:key="index"
							:label="item.name"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="add(formRef)">添加</el-button>
					<el-button @click="resetForm">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			v-model="editDialog"
			title="查看"
			width="40%"
			:before-close="resetForm"
		>
			<div v-loading="commentListPage.loading">
				<div
					v-for="(item, index) in commentListPage.records"
					:key="index"
					class="pb-1 mb-1"
				>
					<div class="flex border-b-2 mb-2">
						<div class="flex">
							<div>
								<el-avatar
									:src="imageUrl + item.commentRoot.user.avatar"
									class="w-[50px] h-[50px]"
								/>
							</div>
						</div>
						<div class="ml-3 break-all mb-2 w-full">
							<div class="flex justify-between">
								<div>{{ item.commentRoot.user.username }}</div>
								<div class="flex">
									<div class="ml-[10px]">
										<el-button
											size="small"
											@click="deleteComment(item.commentRoot.id, item.file_id)"
											type="danger"
										>
											删除
										</el-button>
									</div>
								</div>
							</div>
							<div>
								{{ item.commentRoot.content }}
							</div>
						</div>
					</div>
					<div class="">
						<div
							v-for="(reply, replyIndex) in item.commentReplies"
							:key="replyIndex"
							class="flex border-b-2 pl-11 mt-3"
						>
							<div class="flex">
								<div>
									<el-avatar
										:src="imageUrl + reply.user.avatar"
										class="w-[50px] h-[50px]"
									/>
								</div>
							</div>
							<div class="ml-3 break-all w-full">
								<div class="flex justify-between w-full">
									<div>
										{{ reply.user.username }} 回复<span class="text-blue-400"
											>@{{ reply.replyUser.username }}：</span
										>{{ reply.content }}
									</div>
									<div class="flex">
										<div class="ml-[10px]">
											<el-button
												size="small"
												@click="deleteComment(reply.id, item.file_id)"
												type="danger"
												>删除
											</el-button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserStore } from "@/stores/userStores";
import { getTagPage } from "@/api/tag";
import { addKnow, deleteKnow, queryKnow } from "@/api/file";
import { delComment, getListAllComments } from "@/api/comment";

const store = useUserStore();
const token = store.getToken();
const addDialog = ref(false);
const tagList = ref([]);
const files = ref([]);
const covers = ref([]);
const prefix = import.meta.env.VITE_TEST_URL;
// 文件上传路径
const uploadUrl = prefix + "/file/upload";
const imageUrl = import.meta.env.VITE_TEST_URL + "/file/preview?url=";
const tableData = reactive({
	records: [],
	pages: 0,
	page: 1,
	size: 10,
	type: 5, // 查询普通用户
});
const isShow = ref(true);
const coversSuccess = (response) => {
	if (response.success) {
		formKnow.value.cover = response.data.url;
	}
};
const filesSuccess = (response) => {
	if (response.success) {
		formKnow.value.url = response.data.url;
		formKnow.value.name = response.data.name;
		formKnow.value.content_type = response.data.content_type;
	}
};

const formRef = ref();
const rules = {
	name: [{ required: true, message: "请输入文档名称", trigger: "blur" }],
	cover: [{ required: true, message: "请上传封面", trigger: "blur" }],
	url: [{ required: true, message: "请上传文档", trigger: "blur" }],
	classification: [
		{ required: true, message: "请选择文档分类", trigger: "blur" },
	],
};

const formKnow = ref({
	url: "",
	name: "",
	cover: "",
	content_type: "",
});
const deleted = async (id) => {
	const res = await deleteKnow({ id });
	if (res.success) {
		ElMessage.success("删除成功");
	} else {
		ElMessage.error(res.msg);
	}
	await loadData();
};
const add = (formRef) => {
	clearFileList();
	formRef.validate(async (valid) => {
		if (!valid) {
			return false;
		}
		const res = await addKnow(formKnow.value);
		if (res.success) {
			ElMessage.success("添加成功");
		} else {
			ElMessage.error(res.msg);
		}
		addDialog.value = false;
		resetForm();
		await loadData();
	});
};
const clearFileList = () => {
	files.value = [];
	covers.value = [];
};
const download = (id) => {
	location.href = prefix + `/file/download?id=${id}`;
};
const loadData = async () => {
	let res = await queryKnow({
		page: tableData.page,
		size: tableData.size,
		type: tableData.type,
	});
	if (res.success) {
		tableData.records = res.data;
		tableData.page = res.data.pageNum;
		tableData.pages = res.data.pages;
	} else {
		ElMessage.error(res.msg);
	}
	res = await getTagPage({
		page: tableData.page,
		size: tableData.size,
	});
	if (res.success) {
		tagList.value = res.data;
	} else {
		ElMessage.error(res.msg);
	}
};
const resetForm = () => {
	if (addDialog.value) {
		addDialog.value = false;
	}
	if (editDialog.value) {
		editDialog.value = false;
	}
	formKnow.value = {};
};
const beforeUpload = (rawFile) => {
	//类型判断
	if (rawFile.type !== "application/pdf") {
		ElMessage.error("只能上传pdf文件");
		return false;
	}
	return true;
};

// 评论
const commentListPage = reactive({
	records: [],
	loading: false,
});

const editDialog = ref(false);
const openEdit = (id) => {
	editDialog.value = true;
	loadComments(id);
};
const loadComments = async (id) => {
	commentListPage.loading = true;
	const res = await getListAllComments({ id });
	commentListPage.loading = false;
	if (res.success) {
		commentListPage.records = res.data;
	} else {
		ElMessage.error(res.msg);
	}
};
const deleteComment = async (commentId, id) => {
	ElMessageBox.confirm("确认要删除该评论?", "Warning", {
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		type: "warning",
	}).then(async () => {
		const res = await delComment({
			id: commentId,
		});
		if (res.success) {
			ElMessage.success("删除完成");
		} else {
			ElMessage.error(res.msg);
		}
		await loadComments(id);
	});
};

onMounted(() => {
	loadData();
});
</script>

<style scoped></style>
