<template>
	<Header />
	<div class="main" style="margin-top: 50px">
		<div style="font-size: 40px; font-weight: 600">通知公告</div>
		<el-divider />
		<div
			v-for="(item, index) in tableData.list"
			:key="index"
		>
			<div style="display: flex; justify-content: space-between; font-size: 26px" >
				<div class="hover:text-blue-600" @click="openInfo(item.id)" style="cursor: pointer; ">{{ item.title }}</div>
				<div>{{ item.createTime }}</div>
			</div>
			<el-divider />
		</div>
	</div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { onMounted, reactive } from 'vue';
import { getAnnouncementPage } from '@/api/announcement';
import { useRouter } from 'vue-router';

const tableData = reactive({
	list: [],
	total: 0,
	current: 1,
	pageSize: 10,
	pages: 0,
});

const router = useRouter();

const openInfo = (id) => {
	router.push({ path: '/info', query: { id } });
};


const loadData = async () => {
	const res = await getAnnouncementPage({
		current: tableData.page,
		size: tableData.pageSize,
	});
	if (res.code === 200) {
		tableData.list = res.data.records;
		tableData.total = res.data.total;
		tableData.current = res.data.current;
		tableData.pages = res.data.pages;
	}
};

onMounted(() => {
	loadData();
});
</script>

<style lang="scss" scoped></style>
