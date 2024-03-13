<template>
	<Header />
	<div class="main" style="margin: 0 8%">
		<div
			v-for="(tag, index) in tagList"
			class="border-slate-400 flex flex-row items-center mt-3 justify-between"
		>
			<div class="flex flex-row items-center">
				<el-button type="primary" style="font-size: 30px"
					>{{ tag.name }}
				</el-button>
				<div v-for="(book, index) in tag.bookList" :key="index">
					<div class="flex flex-col ml-3">
						<BookCard :item="book" />
						<el-button
							type="primary"
							class="float-right mt-2"
							@click="openBorrow(book.id)"
							>借阅
						</el-button>
					</div>
				</div>
			</div>
			<div class="text-3xl cursor-pointer" @click="openMore(tag)">更多>>></div>
		</div>
	</div>
	<Borrow :dialogVisible="dialogVisible" :bookId="bookId" />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import Header from '@/components/Header.vue';
import BookCard from '@/components/BookCard/bookCard.vue';
import Borrow from '@/components/Borrow.vue';
import { getTagList } from '@/api/tag';
import { getByTagId } from '@/api/book';
import { useRouter } from 'vue-router';

const router = useRouter();
const tagList = ref([]);
const dialogVisible = ref(false);
const bookId = ref('');
const loadData = async () => {
	let res = await getTagList();
	if (res.success) {
		tagList.value = res.data;
	}
	for (let index = 0; index < tagList.value.length; index++) {
		const element = tagList.value[index];
		res = await getByTagId({ tagId: element.id });
		if (res.success) {
			element.bookList = res.data;
		}
	}
};
const openBorrow = (id) => {
	dialogVisible.value = true;
	bookId.value = id;
};

const openMore = (tag) => {
	router.push({ path: 'more', query: { tagId: tag.id, name: tag.name } });
};
onMounted(() => {
	loadData();
});
</script>
<style scoped></style>
