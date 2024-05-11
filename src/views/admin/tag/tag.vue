<template>
	<div>
		<div>
			<el-button @click="addDialog = true">添加分类</el-button>
		</div>
		<el-table :data="tableData.records">
			<el-table-column prop="id" label="分类编号" />
			<el-table-column prop="name" label="分类名称" />
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
		>
			<el-form
				:model="formData"
				label-width="120px"
				:before-close="resetForm"
				:rules="rules"
				ref="formRef"
			>
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="formData.name" />
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
			title="新增分类"
			width="30%"
			:before-close="resetForm"
		>
			<el-form
				:model="formData"
				label-width="120px"
				:rules="rules"
				ref="formRef"
			>
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="formData.name" />
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/userStores';
import {
	deletedTag,
	getTagById,
	getTagPage,
	saveTag,
	updaTetag,
} from '@/api/tag';

const tableData = reactive({
	records: [],
	pages: 0,
	current: 1,
	size: 10,
	total: 0,
});
const formData = ref({});
const editDialog = ref(false);
const addDialog = ref(false);

const openEdit = async (id) => {
	const res = await getTagById(id);
	if (res.success) {
		formData.value = res.data;
		editDialog.value = true;
	} else {
		ElMessage.error(res.msg);
	}
};
const formRef = ref();
const rules = {
	name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
};
const edit = (formRef) => {
	formRef.validate(async (valid) => {
		if (valid) {
			const res = await updaTetag(formData.value);
			if (res.success) {
				ElMessage.success('修改成功');
			} else {
				ElMessage.error(res.msg);
			}
			editDialog.value = false;
			resetForm();
			loadData();
		} else {
			return false;
		}
	});
};

const add = (formRef) => {
	formRef.validate(async (valid) => {
		if (valid) {
			const res = await saveTag(formData.value);
			if (res.success) {
				ElMessage.success('添加成功');
			} else {
				ElMessage.error(res.msg);
			}
			addDialog.value = false;
			resetForm();
			await loadData();
		} else {
			return false;
		}
	});
};
const deleted = async (id) => {
	ElMessageBox.confirm('确认要删除该分类?', 'Warning', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		const res = await deletedTag({ id });
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
	formData.value = {};
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
const loadData = async () => {
	const res = await getTagPage({
		current: tableData.current,
		size: tableData.size,
	});
	if (res.success) {
		tableData.records = res.data.records;
		tableData.current = res.data.pageNum;
		tableData.pages = res.data.pages;
		tableData.total = res.data.total;
	}
};

onMounted(() => {
	loadData();
});
</script>

<style scoped></style>
