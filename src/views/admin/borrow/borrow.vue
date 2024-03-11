<template>
	<div>
		<div>
			<el-button @click="addDialog = true">借阅图书</el-button>
		</div>
		<el-table :data="tableData.records">
			<el-table-column prop="name" label="图书名称" />
			<el-table-column prop="num" label="借阅数量" />
			<el-table-column prop="user" label="借阅人" />
			<el-table-column prop="createTime" label="借阅时间" />
			<el-table-column prop="status" label="归还状态">
				<template #default="scope">
					<el-tag :type="scope.row.status === '未归还' ? 'danger' : 'success'">
						{{ scope.row.status }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="small" @click="openEdit(scope.row.id)"
						>查看
					</el-button>
					<el-button
						size="small"
						@click="deleted(scope.row)"
						type="danger"
						:disabled="scope.row.status === '已归还'"
						>归还
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
				<el-form-item label="图书名称" prop="name">
					<el-select v-model="formData.bookId"
						>i
						<el-option
							v-for="(item, index) in bookList"
							:key="index"
							:label="item.name"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="借阅数量" prop="num">
					<el-input v-model="formData.num" />
				</el-form-item>
				<el-form-item label="借阅人" prop="user">
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
					<el-button type="primary" @click="add(formRef)">添加</el-button>
					<el-button @click="resetForm">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
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
				<el-form-item label="图书名称" prop="name">
					<el-select v-model="formData.bookId" :disabled="true">
						<el-option
							v-for="(item, index) in bookList"
							:key="index"
							:label="item.name"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="借阅数量" prop="num">
					<el-input v-model="formData.num" :disabled="true" />
				</el-form-item>
				<el-form-item label="借阅人" prop="user">
					<el-select v-model="formData.userId" :disabled="true">
						<el-option
							v-for="(item, index) in userList"
							:key="index"
							:label="item.username"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="edit(formRef)">修改</el-button>
					<el-button @click="resetForm">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { addData, getAllList, returnData, getDataById } from '@/api/borrow';
import { getUserList } from '@/api/user';
import { queryList } from '@/api/book';
import { useRouter } from 'vue-router';
const userList = ref([]);
const bookList = ref([]);
const formRef = ref();
// 控制修改弹窗的显示隐藏
const editDialog = ref(false);
// 控制添加弹窗的显示隐藏
const addDialog = ref(false);
const formData = ref({});
const rules = {
	bookId: [{ required: true, message: '请选择借阅的图书', trigger: 'blur' }],
	num: [{ required: true, message: '请输入借阅数量', trigger: 'blur' }],
	userId: [{ required: true, message: '请选择借阅人', trigger: 'blur' }],
};
const tableData = reactive({
	records: [],
	pages: 0,
	current: 1,
	size: 10,
	total: 0,
});

const loadData = async () => {
	let res = await getAllList({
		current: tableData.current,
		size: tableData.size,
		type: 1, // 借阅状态
	});
	if (res.success) {
		tableData.records = res.data.records;
		tableData.current = res.data.current;
		tableData.pages = res.data.pages;
		tableData.total = res.data.total;
	} else {
		ElMessage.error(res.msg);
		return;
	}
};

// 添加借阅记录
const add = (formRef) => {
	formRef.validate(async (valid) => {
		if (!valid) {
			return false;
		}
		const res = await addData(formData.value);
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

// 删除借阅记录
const deleted = async (data) => {
	const res = await returnData({
		userId: data.userId,
		bookId: data.bookId,
	});
	if (res.success) {
		ElMessage.success('归还成功');
		useRouter().push('/admin/return');
	} else {
		ElMessage.error(res.msg);
	}
};

const openEdit = async (id) => {
	const res = await getDataById({ id });
	if (!res.success) {
		ElMessage.error(res.msg);
		return;
	}
	editDialog.value = true;
	formData.value = res.data;
};

const getUsers = async () => {
	const res = await getUserList();
	if (res.success) {
		userList.value = res.data;
	} else {
		ElMessage.error(res.msg);
		return;
	}
};
const getBooks = async () => {
	const res = await queryList();
	if (res.success) {
		bookList.value = res.data;
	} else {
		ElMessage.error(res.msg);
		return;
	}
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
	formData.value = {};
};

onMounted(() => {
	loadData();
	getUsers();
	getBooks();
});
</script>

<style scoped></style>
