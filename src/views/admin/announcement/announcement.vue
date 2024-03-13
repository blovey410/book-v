<template>
	<div>
		<div>
			<el-button @click="addDialog = true">添加</el-button>
		</div>

		<div class="border w-[77vw]">
			<el-table max-height="75vh" :data="tableData.records">
				<el-table-column prop="title" label="公告标题" />
				<el-table-column prop="content" label="公告内容" :show-overflow-tooltip="true"/>
				<el-table-column prop="createTime" label="创建时间" />
				<el-table-column label="操作">
					<template #default="scope">
						<el-button size="small" @click="openEdit(scope.row.id)"
							>修改</el-button
						>
						<el-button size="small" @click="deleted(scope.row.id)" type="danger"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="example-pagination-block">
			<el-pagination
				layout="sizes, total, ->, prev, pager, next"
				:page-size="tableData.size"
				:current-page="tableData.current"
				:page-count="tableData.pages"
				:total="tableData.total"
				:page-sizes="[10, 20, 50, 100]"
				@prev-click="preClick"
				@next-click="nextClick"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>

		<el-dialog
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			v-model="editDialog"
			title="edit"
			width="30%"
			:before-close="resetForm"
		>
			<el-form :rules="rule" :model="form" label-width="120px">
				<el-form-item label="公告标题" prop="title">
					<el-input v-model="form.title" />
				</el-form-item>
				<el-form-item label="公告内容" prop="content">
					<el-input v-model="form.content" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="edit">修改</el-button>
					<el-button @click="resetForm">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			v-model="addDialog"
			title="add"
			width="30%"
			:before-close="resetForm"
		>
			<el-form :rules="rule" :model="form" label-width="120px">
				<el-form-item label="公告标题" prop="title">
					<el-input v-model="form.title" />
				</el-form-item>
				<el-form-item label="公告内容" prop="content">
					<el-input v-model="form.content" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="add">添加</el-button>
					<el-button @click="resetForm">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import {
	getAnnouncementPage,
	updateAnnouncement,
	deletedAnnouncement,
	addAnnouncement,
	getAnnouncementById,
} from '@/api/announcement';
import { useUserStore } from '@/stores/userStores';

const tableData = reactive({
	records: [],
	pages: 0,
	current: 1,
	size: 10,
});
const form = ref({
	id: '', //${column.comment}
	title: '', //公告标题
	content: '', //公告内容
	createTime: '', //创建时间
});
const rule = ref({
	title: [{ required: true, message: '公告标题不能为空', trigger: 'blur' }],
	content: [{ required: true, message: '公告内容不能为空', trigger: 'blur' }],
});
const userStore = useUserStore();
const token = userStore.token;
const editDialog = ref(false);
const addDialog = ref(false);

const preClick = async () => {
	tableData.current--;
	await loadData();
};
const nextClick = async () => {
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

/**
 * 打开编辑按钮
 */
const openEdit = async (id) => {
	const res = await getAnnouncementById(id);
	form.value = res.data;
	editDialog.value = true;
};

/**
 *修改
 */
const edit = async () => {
	const res = await updateAnnouncement(form.value);
	ElMessage.success('修改成功');
	editDialog.value = false;
	loadData();
	resetForm();
};

/**
 *添加
 */
const add = async () => {
	const res = await addAnnouncement(form.value);
	ElMessage.success('添加成功');
	addDialog.value = false;
	loadData();
	resetForm();
};

/**
 * 删除数据
 */
const deleted = async (id) => {
	ElMessageBox.confirm('是否确认删除？', '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		const res = await deletedAnnouncement({ id });
		ElMessage.success('success');
		loadData();
	});
};

/**
 * 重置表单
 */
const resetForm = () => {
	if (addDialog.value) {
		addDialog.value = false;
	}
	if (editDialog.value) {
		editDialog.value = false;
	}
	form.value = {};
};

const loadData = async () => {
	const res = await getAnnouncementPage({
		current: tableData.current,
		size: tableData.size,
	});
	tableData.records = res.data.records;
	tableData.current = res.data.current;
	tableData.pages = res.data.pages;
};
onMounted(() => {
	// 初始加载分页数据
	loadData();
});
</script>

<style scoped></style>
