<template>
	<div>
		<div>
			<el-button @click="addDialog = true">归还图书</el-button>
		</div>
		<el-table :data="tableData.records">
			<el-table-column prop="name" label="图书名称" />
			<el-table-column prop="num" label="归还数量" />
			<el-table-column prop="user" label="归还人" />
			<el-table-column prop="createTime" label="归还时间" />
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
					<el-select v-model="formData.bookId">
						<el-option
							v-for="(item, index) in bookList"
							:key="index"
							:label="item.name"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="归还数量" prop="num">
					<el-input v-model="formData.num" />
				</el-form-item>
				<el-form-item label="归还人" prop="user">
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
			title="查看"
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
				<el-form-item label="归还数量" prop="num">
					<el-input v-model="formData.num" :disabled="true" />
				</el-form-item>
				<el-form-item label="归还人" prop="user">
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
					<el-button @click="resetForm">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { queryList } from '@/api/book';
import {
	returnData,
	getDataById,
	getAllList,
	editData,
	delData,
} from '@/api/borrow';
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

const formData = ref({});
const formRef = ref({});
const userList = ref([]);
const bookList = ref([]);
const rules = {
	bookId: [{ required: true, message: '请选择归还的图书', trigger: 'blur' }],
	userId: [{ required: true, message: '请选择归还人', trigger: 'blur' }],
};

// 数据加载
const loadData = async () => {
	const res = await getAllList({
		current: tableData.current,
		size: tableData.size,
		type: 2, // 归还状态
	});
	if (!res.success) {
		ElMessage.error('查询失败');
	}
	tableData.records = res.data.records;
	tableData.current = res.data.current;
	tableData.pages = res.data.pages;
	tableData.total = res.data.total;
};

// 添加归还记录
const add = (formRef) => {
	formRef.validate((valid) => {
		if (valid) {
			returnData(formData.value).then((res) => {
				if (res.code === 200) {
					ElMessage.success('添加成功');
					addDialog.value = false;
					loadData();
				} else {
					ElMessage.error('添加失败');
				}
			});
		} else {
			return false;
		}
	});
};

// 删除归还记录
const deleted = (id) => {
	ElMessageBox.confirm('确认要删除该记录?', 'Warning', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		const res = await delData({ id });
		if (!res.success) {
			ElMessage.error(res.msg);
			return;
		}
		ElMessage.success('删除成功');
		loadData();
	});
};

// 修改归还记录
const openEdit = async (id) => {
	let res = await getDataById({ id });
	if (res.code === 200) {
		formData.value = res.data;
		editDialog.value = true;
	} else {
		ElMessage.error('获取失败');
	}
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

const getBooks = async () => {
	const res = await queryList();
	if (res.success) {
		bookList.value = res.data;
	} else {
		ElMessage.error(res.msg);
		return;
	}
};

onMounted(() => {
	loadData();
	getUsers();
	getBooks();
});
</script>

<style scoped></style>
