<template>
	<div class="">
		<div class="flex items-center flex-wrap">
			<div
				v-for="item in tableData.records"
				:key="item"
				style="display: flex; flex-direction: column"
			>
				<BookCard :item="item" />
				<el-tag
					type="success"
					:hit="true"
					size="large"
					style="font-size: larger"
					>{{ item.status }}</el-tag
				>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useUserStore } from '@/stores/userStores';
import { getBorrowById, returnData } from '@/api/borrow';
import BookCard from '@/components/bookCard/BookCard.vue';
const tableData = reactive({
	records: [],
});
const store = useUserStore();
const page = async () => {
	const res = await getBorrowById(store.getUserInfo().id, 2);
	tableData.records = res.data.records;
};

onMounted(() => {
	page();
});
</script>

<style scoped></style>
