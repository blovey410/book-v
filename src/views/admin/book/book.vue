<template>
	<div>
		<div>
			<el-input placeholder="请输入仓库名称" v-model="tableData.search" style="width: 240px; margin-right: 10px" />
      <el-button type="primary" @click="findByParam()">查询</el-button>
      <el-button type="success" @click="resetParam()">重置</el-button>
			<el-button @click="addDialog = true">添加图书</el-button>
		</div>
		<el-table :data="tableData.records">
			<el-table-column prop="name" label="图书名称" />
			<el-table-column prop="author" label="图书作者" />
			<el-table-column prop="imgUrl" label="图书封面" width="200">
				<template #default="scope">
					<el-image
						style="width: 100px; height: 130px"
						:src="prefix + '/uploads/' + scope.row.imgUrl"
					/>
				</template>
			</el-table-column>
			<el-table-column prop="num" label="图书数量" />
			<el-table-column
				prop="info"
				label="图书简介"
				:show-overflow-tooltip="true"
			/>
			<el-table-column prop="press" label="出版社" />
			<el-table-column prop="theme" label="题名主题" />
			<el-table-column prop="createTime" label="创建时间" />
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
				<el-form-item label="封面上传" prop="imgUrl">
					<el-upload
						v-model:file-list="covers"
						:action="uploadUrl"
						list-type="picture-card"
						:limit="1"
						:on-success="coversSuccess"
						:on-error="uploadfail"
						accept="image/*"
					>
						<el-icon>
							<Plus />
						</el-icon>
					</el-upload>
				</el-form-item>
				<el-form-item label="图书数量" prop="num">
					<el-input v-model="formBook.num" />
				</el-form-item>
				<el-form-item label="图书简介" prop="info">
					<el-input v-model="formBook.info" />
				</el-form-item>
				<el-form-item label="出版社" prop="press">
					<el-input v-model="formBook.press" />
				</el-form-item>
				<el-form-item label="题名主题" prop="theme">
					<el-input v-model="formBook.theme" />
				</el-form-item>
				<el-form-item label="图书分类" prop="tagId">
					<el-select v-model="formBook.tagId">
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
				<el-form-item label="封面上传" prop="imgUrl">
					<el-upload
						v-model:file-list="covers"
						:action="uploadUrl"
						list-type="picture-card"
						:limit="1"
						:on-success="coversSuccess"
						:on-error="uploadfail"
						accept="image/*"
					>
						<el-icon>
							<Plus />
						</el-icon>
					</el-upload>
				</el-form-item>
				<el-form-item label="图书数量" prop="num">
					<el-input v-model="formBook.num" />
				</el-form-item>
				<el-form-item label="图书简介" prop="info">
					<el-input v-model="formBook.info" />
				</el-form-item>
				<el-form-item label="出版社" prop="press">
					<el-input v-model="formBook.press" />
				</el-form-item>
				<el-form-item label="题名主题" prop="theme">
					<el-input v-model="formBook.theme" />
				</el-form-item>
				<el-form-item label="图书分类" prop="tagId">
					<el-select v-model="formBook.tagId">
						<el-option
							v-for="(item, index) in tagList"
							:key="index"
							:label="item.name"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="edit(formRef)">添加</el-button>
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
import { getTagList } from '@/api/tag';
import {
	addBook,
	deleteBook,
	queryBook,
	queryPage,
	updateById,
} from '@/api/book';
const addDialog = ref(false);
const tagList = ref([]);
const prefix = import.meta.env.VITE_TEST_URL;
// 文件上传路径
const uploadUrl = prefix + '/book/upload';
const covers = ref([]);
const tableData = reactive({
	records: [],
	pages: 0,
	current: 1,
	size: 10,
	total: 0,
	search: '',
});
// 查询相关
const findByParam = ()=>{
	loadData();
}

//上传相关
const coversSuccess = (response) => {
	if (response.success) {
		formBook.value.imgUrl = response.msg;
	}
};
const uploadfail = () => {
	ElMessage.error('上传失败');
};

const formRef = ref();
const rules = {
	name: [{ required: true, message: '请输入图书名称', trigger: 'blur' }],
	imgUrl: [{ required: true, message: '请上传图书封面', trigger: 'blur' }],
	tagId: [{ required: true, message: '请选择图书分类', trigger: 'blur' }],
};
const formBook = ref({
	url: '',
	name: '',
	imgUrl: '',
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

const edit = (formRef) => {
	formRef.validate(async (valid) => {
		if (!valid) {
			return false;
		}
		const res = await updateById(formBook.value);
		if (res.success) {
			ElMessage.success('修改成功');
		} else {
			ElMessage.error(res.msg);
		}
		editDialog.value = false;
		resetForm();
		await loadData();
	});
};
const clearFileList = () => {
	covers.value = [];
};
const loadData = async () => {
	let res = await queryPage({
		current: tableData.current,
		size: tableData.size,
		search: tableData.search,
	});
	if (res.success) {
		tableData.records = res.data.records;
		tableData.current = res.data.current;
		tableData.pages = res.data.pages;
		tableData.total = res.data.total;
	} else {
		ElMessage.error(res.msg);
	}
	res = await getTagList();
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
	clearFileList();
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

const editDialog = ref(false);
const openEdit = async (id) => {
	editDialog.value = true;
	const res = await queryBook({ id });
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
