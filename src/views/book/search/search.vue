<template>
	<Header />
	<div class="flex items-center flex-col">
		<div class="flex flex-col w-1/4 mt-10">
			<el-input placeholder="请输入搜索内容" v-model="search" @input="loadData">
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
				<el-button
					type="primary"
					class="float-right mt-2"
					@click="openBorrow(item.id)"
					>借阅</el-button
				>
			</div>
		</div>
	</div>
	<Borrow :dialogVisible="dialogVisible" :bookId="bookId" />
</template>
<script setup>
import { reactive, ref } from 'vue';
import bookCard from '@/components/bookCard/bookCard.vue';
import { Search } from '@element-plus/icons-vue';
import Header from '@/components/Header.vue';
import Borrow from '@/components/Borrow.vue';
import { getSearch } from '@/api/book';
const dialogVisible = ref(false);
const tableData = reactive({
	records: [],
});
const search = ref('');
const bookId = ref('');
const openBorrow = async (id) => {
	dialogVisible.value = true;
	bookId.value = id;
};
const loadData = async () => {
	const result = await getSearch({
		search: search.value,
	});
	if (result.success) {
		tableData.records = result.data;
	}
};
</script>
<style scoped></style>
