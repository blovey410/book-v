<template>
	<div>
		<div>
			<el-button @click="addDialog = true">添加用户</el-button>
		</div>
		<el-table :data="tableData.records">
			<el-table-column prop="username" label="用户名" />
			<el-table-column prop="sex" label="性别" />
			<el-table-column prop="telephone" label="联系方式" />
			<el-table-column prop="email" label="邮箱" />
			<el-table-column prop="role" label="等级">
				<template #default="scope">
					<el-tag v-if="scope.row.role === 1" type="success">管理员</el-tag>
					<el-tag v-else-if="scope.row.role === 2" type="warning"
						>普通用户
					</el-tag>
					<el-tag v-else-if="scope.row.role === 3" type="danger"
						>禁用用户
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="small" @click="openEditUser(scope.row.id)"
						>修改
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
			v-model="editDialog"
			title="修改"
			width="30%"
			:before-close="resetForm"
		>
			<el-form
				:model="formUser"
				label-width="120px"
				:rules="rules"
				ref="formRef"
			>
				<el-form-item label="用户名" prop="username">
					<el-input v-model="formUser.username" />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="formUser.password" />
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-input type="sex" v-model="formUser.sex" />
				</el-form-item>
				<el-form-item label="联系方式" prop="telephone">
					<el-input v-model="formUser.telephone" />
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="formUser.email" />
				</el-form-item>
				<el-form-item label="用户等级">
					<el-select v-model="formUser.role" disabled>
						<el-option label="管理员" :value="1" />
						<el-option label="普通用户" :value="2" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="edit(formRef)">更新</el-button>
					<el-button @click="resetForm">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 7e00010005999999911800077fbc810300cb7e  -->
		<el-dialog
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			v-model="addDialog"
			title="新增"
			width="30%"
			:before-close="resetForm"
		>
			<el-form
				:model="formUser"
				label-width="120px"
				:rules="rules"
				ref="formRef"
			>
				<el-form-item label="用户名" prop="username">
					<el-input v-model="formUser.username" />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="formUser.password" />
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-input type="sex" v-model="formUser.sex" />
				</el-form-item>
				<el-form-item label="联系方式" prop="telephone">
					<el-input v-model="formUser.telephone" />
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="formUser.email" />
				</el-form-item>
				<el-form-item label="用户等级" prop="role">
					<el-select v-model="formUser.role">
						<el-option label="管理员" :value="1" />
						<el-option label="普通用户" :value="2" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="add(formRef)">添加</el-button>
					<el-button @click="resetForm">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import {
	addUser,
	deletedUser,
	getUserById,
	getUserList,
	updateUser,
} from '@/api/user';
const tableData = reactive({
	records: [],
	pages: 0,
	current: 1,
	size: 10,
	total: 0,
});
const formUser = ref({});
const editDialog = ref(false);
const addDialog = ref(false);
const formRef = ref();
const rules = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
	sex: [{ required: true, message: '请输入性别', trigger: 'blur' }],
	telephone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
	email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
	role: [{ required: true, message: '请选择身份', trigger: 'blur' }],
};
const openEditUser = async (id) => {
	const res = await getUserById(id);
	if (res.success) {
		formUser.value = res.data;
		editDialog.value = true;
	} else {
		ElMessage.error(res.msg);
	}
};
const edit = (formRef) => {
	formRef.validate(async (valid) => {
		if (!valid) {
			return false;
		}
		const res = await updateUser(formUser.value);
		if (res.success) {
			ElMessage.success('修改成功');
		} else {
			ElMessage.error(res.msg);
		}
		editDialog.value = false;
		resetForm();
		loadData();
	});
};

const add = (formRef) => {
	formRef.validate(async (valid) => {
		if (!valid) {
			return false;
		}
		const res = await addUser(formUser.value);
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
	ElMessageBox.confirm('确认要删除该用户?', 'Warning', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		const res = await deletedUser({ id });
		if (res.success) {
			ElMessage.success('删除完成');
		} else {
			ElMessage.error(res.msg);
		}
		loadData();
	});
};
const resetForm = () => {
	if (addDialog.value) {
		addDialog.value = false;
	}
	if (editDialog.value) {
		editDialog.value = false;
	}
	formUser.value = {};
};

const loadData = async () => {
	const res = await getUserList({
		page: tableData.page,
		size: tableData.size,
	});
	if (res.success) {
		tableData.records = res.data;
		tableData.page = res.data.pageNum;
		tableData.pages = res.data.pages;
	}
};
onMounted(() => {
	loadData();
});
</script>

<style scoped></style>
