<template>
	<Header />
	<div class="main" style=" margin-top: 50px">
		<div>
			<div class="text-5xl mb-1">{{ query.name }}</div>
		</div>
		<div class="grid gap-1 grid-cols-5">
			<div v-for="(book, index) in list" :key="index" >
				<div class="flex flex-col ml-3">
					<BookCard :item="book"/>
					<el-button
						type="primary"
						class="mt-2"
						style="width: 200px; font-size: 24px"
						@click="openBorrow(book.id)"
					>借阅</el-button
					>
				</div>
			</div>
		</div>

		<Borrow :dialogVisible="dialogVisible" :bookId="bookId" />
	</div>

</template>

<script setup>
import Header from '@/components/Header.vue';

import { onMounted, ref } from 'vue';
import { getByTagId } from '@/api/book';
import { useRoute } from 'vue-router';
import BookCard from '@/components/bookCard/BookCard.vue';
import Borrow from '@/components/Borrow.vue';

const route = useRoute();
const query = route.query;
const list = ref([]);
const dialogVisible = ref(false);
const bookId = ref('');
const loadData = async () => {
	const res = await getByTagId({
		tagId:query.tagId,
	});
	if (res.code === 200) {
		list.value = res.data;
	}
};
const openBorrow = (id) => {
	dialogVisible.value = true;
	bookId.value = id;
};

onMounted(() => {
	loadData();
})
</script>

<style scoped></style>
