<template>
	<Header />
	<div class="flex items-center flex-col">
		<div class="flex flex-col w-1/4 mt-10">
			<el-input
				placeholder="请输入搜索内容"
				v-model="tableData.search"
				clearable
				@clear="loadData"
			>
				<template #append>
					<el-button
						type="primary"
						:icon="Search"
						@click="loadData"
					></el-button>
				</template>
			</el-input>
		</div>
		<div class="flex flex-wrap justify-center mt-10">
			<div
				v-for="(item, index) in tableData.records"
				class="flex flex-col justify-center mr-3"
			>
				<bookCard :item="item" />
				<el-button type="primary" class="float-right mt-2" @click="openBorrow(item.id)"
					>借阅</el-button
				>
			</div>
		</div>
	</div>
	<Borrow :dialogVisible="dialogVisible" :bookId="bookId" />
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { reactive, watchEffect } from 'vue';
import bookCard from '@/components/bookCard/bookCard.vue';
import { Search } from '@element-plus/icons-vue';
import Header from '@/components/Header.vue';
import Borrow from '@/components/Borrow.vue';
import { getSearch } from '@/api/book';
const route = useRoute();
const dialogVisible = ref(false);
const tableData = reactive({
	records: [
		{
			id: 1,
			name: '三国演义',
			imgUrl: '',
		},
		{
			id: 2,
			name: '三国演义',
			imgUrl: '',
		},
	],
	search: '',
});

const bookId = ref('');
openBorrow = (id) => {
	dialogVisible.value = true;
	bookId = id;
};
const loadData = async () => {
	const result = await getSearch({
		name: tableData.search,
	});
	if (result.success) {
		tableData.records = result.data;
	}
};

watchEffect(() => {
	tableData.search = route.query.search;
	loadData();
});
</script>
<style scoped></style>
