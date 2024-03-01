<template>
	<div>
		<div>
			<el-button @click="addDialog = true">添加图书</el-button>
		</div>
		<el-table :data="tableData.records">
			<el-table-column prop="name" label="图书名称" />
			<el-table-column prop="num" label="借阅数量" />
			<el-table-column prop="user" label="借阅人" />
			<el-table-column prop="createTime" label="借阅时间" />
			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="small" @click="openEdit(scope.row.id)"
						>借阅
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
				:model="formBorrow"
				label-width="120px"
				:rules="rules"
				ref="formRef"
			>
				<el-form-item label="图书名称" prop="name">
					<el-select v-model="formBorrow.bookId"
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
					<el-input v-model="formBorrow.author" />
				</el-form-item>
				<el-form-item label="借阅人" prop="user">
					<el-select v-model="formBook.userId">
						<el-option
							v-for="(item, index) in userList"
							:key="index"
							:label="item.name"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="借阅时间" prop="createTime">
					<el-input v-model="formBorrow.createTime" />
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
				:model="formBorrow"
				label-width="120px"
				:rules="rules"
				ref="formRef"
			>
				<el-form-item label="图书名称" prop="name">
					<el-select v-model="formBorrow.bookId"
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
					<el-input v-model="formBorrow.author" />
				</el-form-item>
				<el-form-item label="借阅人" prop="user">
					<el-select v-model="formBook.userId">
						<el-option
							v-for="(item, index) in userList"
							:key="index"
							:label="item.name"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="借阅时间" prop="createTime">
					<el-input v-model="formBorrow.createTime" />
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
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStores';
import { addData, getAllList, delData, editData } from '@/api/borrow';
import { queryList } from '@/api/book';
import { getUserList } from '@/api/user';

const store = useUserStore();
const token = store.getToken();

const bookList = ref([]);
const userList = ref([]);
// 控制修改弹窗的显示隐藏
const editDialog = ref(false);
// 控制添加弹窗的显示隐藏
const addDialog = ref(false);
const prefix = import.meta.env.VITE_TEST_URL;
// 文件上传路径

const tableData = reactive({
	records: [],
	pages: 0,
	page: 1,
	size: 10,
	type: 5, // 查询普通用户
});

const loadData = () => {
	getAllList(tableData)
		.then((res) => {
			tableData.records = res.records;
			tableData.pages = res.pages;
		})
		.catch((error) => {
			ElMessage.error('查询失败');
		});
	getUserList().then((res) => {
		userList.value = res.records;
	});
	queryList().then((res) => {
		bookList.value = res.records;
	});
};

// 添加借阅记录
const add = (formRef) => {
	formRef.value.validate((valid) => {
		if (valid) {
			addData(formBorrow)
				.then((res) => {
					ElMessage.success('添加成功');
					addDialog.value = false;
					loadData();
				})
				.catch((error) => {
					ElMessage.error('添加失败');
				});
		} else {
			return false;
		}
	});
};

// 删除借阅记录
const deleted = (id) => {
	delData(id)
		.then((res) => {
			ElMessage.success('删除成功');
			loadData();
		})
		.catch((error) => {
			ElMessage.error('删除失败');
		});
};

// 修改借阅记录
const edit = (formRef) => {
	formRef.value.validate((valid) => {
		if (valid) {
			editBorrow(formBorrow)
				.then((res) => {
					ElMessage.success('修改成功');
					editDialog.value = false;
					loadData();
				})
				.catch((error) => {
					ElMessage.error('修改失败');
				});
		} else {
			return false;
		}
	});
};

onMounted(() => {
	loadData();
});
</script>

<style scoped></style>
