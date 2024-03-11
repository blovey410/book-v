<template>
	<div class="">
		<div class="flex flex-wrap">
			<div
				v-for="(item, index) in tableData.records"
				style="display: flex; flex-direction: column; margin-right: 20px;"
			>
				<BookCard :key="index" :item="item" @click.stop="detail(item.bookId)" />
				<el-tag
					:hit="true"
					size="large"
					style="font-size: larger; margin: 2px 0;"
					>{{ item.user }}</el-tag
				>
				<el-button
					type="primary"
					v-if="item.status === '未归还'"
					@click="returnBook(item.bookId)"
					>归还</el-button
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
import { useRouter } from 'vue-router';
const tableData = reactive({
	records: [],
});

const router = useRouter();
const store = useUserStore();
const userinfo = store.getUserInfo()
const page = async () => {
	const res = await getBorrowById(userinfo.id, 1);
	tableData.records = res.data.records;
};

const returnBook = async (id) => {
	const res = await returnData({
		bookId: id,
		userId: userinfo.id
	});
	if (res.code === 200) {
		page();
	}
};

const detail = (id) => {
	router.push({
		path: `/bookInfo`,
		query: { id },
	});
};

onMounted(() => {
	page();
});
</script>

<style scoped></style>
