<template>
	<div>
		<div>
			<el-button @click="addDialog = true">添加图书</el-button>
		</div>
		<el-table :data="tableData.records">
			<el-table-column prop="name" label="图书名称" />
			<el-table-column prop="author" label="图书作者" />
			<el-table-column prop="img_url" label="图书封面" width="200">
				<template #default="scope">
					<el-image
						style="width: 80px; height: 50px"
						:src="prefix + '/book/preview?url=' + scope.row.img_url"
					/>
				</template>
			</el-table-column>
			<el-table-column prop="num" label="图书数量" />
			<el-table-column prop="info" label="图书简介" />
			<el-table-column prop="create" label="出版社" />
			<el-table-column prop="theme" label="题名主题" />
			<el-table-column prop="create_time" label="创建时间" />
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
		<el-dialog
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			v-model="addDialog"
			title="新增"
			width="30%"
			:before-close="resetForm"
		>
			<el-form
				:model="formBook"
				label-width="120px"
				:rules="rules"
				ref="formRef"
			>
				<el-form-item label="图书名称" prop="name">
					<el-input v-model="formBook.name" />
				</el-form-item>
				<el-form-item label="图书作者" prop="author">
					<el-input v-model="formBook.author" />
				</el-form-item>
				<el-form-item label="封面上传" prop="img_url">
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
				<el-form-item label="图书数量" prop="num">
					<el-input v-model="formBook.author" />
				</el-form-item>
				<el-form-item label="图书简介" prop="info">
					<el-input v-model="formBook.author" />
				</el-form-item>
				<el-form-item label="出版社" prop="create">
					<el-input v-model="formBook.author" />
				</el-form-item>
				<el-form-item label="题名主题" prop="theme">
					<el-input v-model="formBook.author" />
				</el-form-item>
				<el-form-item label="图书分类" prop="classification">
					<el-select v-model="formBook.classification">
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
			title="修改"
			width="30%"
			:before-close="resetForm"
		>
			<el-form
				:model="formBook"
				label-width="120px"
				:rules="rules"
				ref="formRef"
			>
				<el-form-item label="图书名称" prop="name">
					<el-input v-model="formBook.name" />
				</el-form-item>
				<el-form-item label="图书作者" prop="author">
					<el-input v-model="formBook.author" />
				</el-form-item>
				<el-form-item label="封面上传" prop="img_url">
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
				<el-form-item label="图书数量" prop="num">
					<el-input v-model="formBook.author" />
				</el-form-item>
				<el-form-item label="图书简介" prop="info">
					<el-input v-model="formBook.author" />
				</el-form-item>
				<el-form-item label="出版社" prop="create">
					<el-input v-model="formBook.author" />
				</el-form-item>
				<el-form-item label="题名主题" prop="theme">
					<el-input v-model="formBook.author" />
				</el-form-item>
				<el-form-item label="图书分类" prop="classification">
					<el-select v-model="formBook.classification">
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
	</div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStores';
import { getTagPage } from '@/api/tag';
import { addBook, deleteBook, queryBook } from '@/api/book';

const store = useUserStore();
const token = store.getToken();
const addDialog = ref(false);
const tagList = ref([]);
const prefix = import.meta.env.VITE_TEST_URL;
// 文件上传路径
const uploadUrl = prefix + '/book/upload';
const covers = ref([]);
const imageUrl = import.meta.env.VITE_TEST_URL + '/book/preview?url=';
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
		formBook.value.img_url = response.data.url;
	}
};

const formRef = ref();
const rules = {
	name: [{ required: true, message: '请输入图书名称', trigger: 'blur' }],
	img_url: [{ required: true, message: '请上传图书封面', trigger: 'blur' }],
	classification: [
		{ required: true, message: '请选择图书分类', trigger: 'blur' },
	],
};

const formBook = ref({
	url: '',
	name: '',
	img_url: '',
	num: '',
	info: '',
	create: '',
	theme: '',
	content_type: '',
});
const deleted = async (id) => {
	const res = await deleteBook({ id });
	if (res.success) {
		ElMessage.success('删除成功');
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
		const res = await addBook(formBook.value);
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
const clearFileList = () => {
	covers.value = [];
};
const loadData = async () => {
	let res = await queryBook({
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
	formBook.value = {};
};
const beforeUpload = (rawFile) => {
	//类型判断
	if (rawFile.type !== 'image/jepg' || 'image/png') {
		ElMessage.error('只能上传图片');
		return false;
	}
	return true;
};

const editDialog = ref(false);
const openEdit = (id) => {
	editDialog.value = true;
	const res = queryBook({ id });
	if (res.success) {
		formBook.value = res.data;
	} else {
		ElMessage.error(res.msg);
	}
};

onMounted(() => {
	loadData();
});
</script>

<style scoped></style>
