<template>
	<div>
		<div>
			<el-button @click="addDialog = true">添加评论</el-button>
		</div>
		<el-table :data="tableData.records">
			<el-table-column prop="id" label="评论编号" />
			<el-table-column prop="content" label="评论内容" />
			<el-table-column prop="username" label="评论人" />
			<el-table-column prop="createTime" label="评论时间" />
			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="small" @click="openEdit(scope.row.id)"
						>修改
					</el-button>
					<el-button size="small" @click="deleted(scope.row.id)" type="danger"
						>删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="example-pagination-block">
			<el-pagination
				layout="sizes, total, ->, prev, pager, next"
				:page-size="tableData.size"
				:current-page="tableData.current"
				:page-count="tableData.pages"
				:total="tableData.total"
				:page-sizes="[10, 20, 50, 100]"
				@prev-click="preClick"
				@next-click="nextclick"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
		<el-dialog
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			v-model="editDialog"
			title="修改"
			width="30%"
			:before-close="resetForm"
		>
			<el-form
				:model="formData"
				label-width="120px"
				:rules="rules"
				ref="formRef"
			>
				<el-form-item label="评论内容" prop="content">
					<el-input v-model="formData.content" />
				</el-form-item>
				<el-form-item label="评论人" prop="userId">
					<el-select v-model="formData.userId">
						<el-option
							v-for="(item, index) in userList"
							:key="index"
							:label="item.username"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="edit(formRef)">更新</el-button>
					<el-button @click="resetForm">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			v-model="addDialog"
			title="新增"
			width="30%"
			:before-close="resetForm"
		>
			<el-form
				:model="formData"
				label-width="120px"
				:rules="rules"
				ref="formRef"
			>
				<el-form-item label="分类内容" prop="content">
					<el-input v-model="formData.content" />
				</el-form-item>
				<el-form-item label="评论人" prop="userId">
					<el-select v-model="formData.userId">
						<el-option
							v-for="(item, index) in userList"
							:key="index"
							:label="item.username"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="add(formRef)">新增</el-button>
					<el-button @click="resetForm">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import {
	addComment,
	getListAllComments,
	delComment,
	updateComment,
	getCommentById,
} from '@/api/comment';
import { getUserList } from '@/api/user';
const addDialog = ref(false);
const editDialog = ref(false);
const tableData = reactive({
	records: [],
	pages: 0,
	current: 1,
	size: 10,
	total: 0,
});
const rules = {
	content: [{ required: true, message: '请输入评论内容', trigger: 'blur' }],
	userId: [{ required: true, message: '请选择评论人', trigger: 'blur' }],
};
// 评论人
const userList = ref([]);

const formData = reactive({
	content: '',
	userId: '',
});

const formRef = ref();

const loadData = async () => {
	let res = await getListAllComments({
		current: tableData.current,
		size: tableData.size,
	});
	if (res.success) {
		tableData.records = res.data.records;
		tableData.current = res.data.current;
		tableData.pages = res.data.pages;
		tableData.total = res.data.total;
	} else {
		ElMessage.error('查询失败');
	}
};

const getCommentUserList = async () => {
	const res = await getUserList();
	if (res.success) {
		userList.value = res.data;
	} else {
		ElMessage.error(res.msg);
	}
};

// 添加评论记录
const add = async (formRef) => {
	formRef.validate(async (valid) => {
		if (!valid) {
			return false;
		}
		const res = await addComment(formData);
		if (res.success) {
			ElMessage.success('添加成功');
		} else {
			ElMessage.error(res.msg);
		}
		addDialog.value = false;
		resetForm();
		await loadData();
	});
};

const deleted = async (id) => {
	const res = await delComment({id});
	if (res.success) {
		ElMessage.success('删除成功');
		await loadData();
	} else {
		ElMessage.error(res.msg);
	}
};

const edit = async (formRef) => {
	formRef.validate(async (valid) => {
		if (valid) {
			const res = await updateComment(formData);
			if (res.success) {
				ElMessage.success('修改成功');
			} else {
				ElMessage.error(res.msg);
			}
			editDialog.value = false;
			resetForm();
			await loadData();
		} else {
			return false;
		}
	});
};

const openEdit = async (id) => {
	editDialog.value = true;
	const res = await getCommentById({ id });
	if (!res.success) {
		ElMessage.error(res.msg);
		return;
	}
	formData.id = res.data.id;
	formData.content = res.data.content;
	formData.userId = res.data.userId;
};
// 分页相关
const preClick = async () => {
	tableData.current--;
	await loadData();
};
const nextclick = async () => {
	tableData.current++;
	await loadData();
};
const handleSizeChange = async (size) => {
	tableData.size = size;
	await loadData();
};
const handleCurrentChange = async (current) => {
	tableData.current = current;
	await loadData();
};
const resetForm = () => {
	if (addDialog.value) {
		addDialog.value = false;
	}
	if (editDialog.value) {
		editDialog.value = false;
	}
	formData.id = '';
	formData.content = '';
	formData.userId = '';
};

onMounted(() => {
	loadData();
	getCommentUserList();
});
</script>

<style scoped></style>
