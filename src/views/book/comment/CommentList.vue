<script setup>
import Header from '@/components/Header.vue';
import { onMounted, reactive, ref } from 'vue';
import { getListAllComments } from '@/api/comment';

const list = ref([]);

const tableData = reactive({
	page: 1,
	size: 100000,
});

const loadData = async () => {
	let res = await getListAllComments();
	if (res.success) {
		list.value = res.data.records;
	}
};

onMounted(() => {
	loadData();
});
</script>

<template>
	<Header />
	<div class="main" style="margin-top: 50px">
		<div style="font-size: 40px; font-weight: 600">评论列表</div>
		<el-divider />
		<el-table
			size="large"
			:data="list"
			:show-header="false"
			:row-style="{ fontSize: '28px', height: '80px' }"
			style="width: 100%"
		>
			<el-table-column
				prop="content"
				label="评论内容"
				:show-overflow-tooltip="true"
			>
			</el-table-column>
			<el-table-column prop="username" label="评论人"></el-table-column>
			<el-table-column prop="createTime" label="评论时间"></el-table-column>
		</el-table>
	</div>
</template>

<style scoped>
:deep (
.el-table .cell
) {
	height: 60px;
	line-height: 60px;
}
</style>
