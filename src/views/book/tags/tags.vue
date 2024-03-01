<template>
	<Header />
	<div class="main">
		<!-- <div
			v-for="(tag, index) in tagList"
			class="border-slate-400 flex flex-row items-center mt-3 justify-between"
		>
			<div class="flex flex-row items-center">
				<el-button type="primary" style="font-size: 30px">{{
					tag.name
				}}</el-button>
				<div v-for="(book, index) in tag.bookList" :key="index">
					<div class="flex flex-col ml-3">
						<BookCard :item="book"/>
						<el-button type="primary" class="float-right mt-2" @click=""
							>借阅</el-button
						>
					</div>
				</div>
			</div>
			<div class="text-3xl"><a href="#">更多>>></a></div>
		</div> -->
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import Header from '@/components/Header.vue';
import BookCard from '@/components/BookCard/bookCard.vue';
import { getTagList } from '@/api/tag';
import { getByTagId } from '@/api/book';
const tagList = ref([
	{
		name: '热门',
		bookList: [
			{
				id: 1,
				name: '三国演义',
				imgUrl: '',
				author: '罗贯中',
			},
			{
				id: 2,
				name: '三国演义',
				imgUrl: '',
				author: '罗贯中',
			},
		],
	},
	{
		name: '科幻',
		bookList: [
			{
				name: '三国演义',
				imgUrl: '',
				author: '罗贯中',
			},
		],
	},
	{
		name: '言情',
		bookList: [
			{
				name: '三国演义',
				imgUrl: '',
				author: '罗贯中',
			},
		],
	},
	{
		name: '武侠',
		bookList: [
			{
				name: '三国演义',
				imgUrl: '',
				author: '罗贯中',
			},
		],
	},
	{
		name: '悬疑',
		bookList: [
			{
				name: '三国演义',
				imgUrl: '',
				author: '罗贯中',
			},
		],
	},
	{
		name: '历史',
		bookList: [
			{
				name: '三国演义',
				imgUrl: '',
				author: '罗贯中',
			},
		],
	},
	{
		name: '军事',
		bookList: [
			{
				name: '三国演义',
				imgUrl: '',
				author: '罗贯中',
			},
		],
	},
	{
		name: '游戏',
		bookList: [
			{
				name: '三国演义',
				imgUrl: '',
				author: '罗贯中',
			},
		],
	},
	{
		name: '童话',
		bookList: [
			{
				name: '三国演义',
				imgUrl: '',
				author: '罗贯中',
			},
		],
	},
	{
		name: '其他',
		bookList: [
			{
				name: '三国演义',
				imgUrl: '',
				author: '罗贯中',
			},
		],
	},
]);

const loadData = async () => {
	let res = await getTagList();
	if (res.success) {
		tagList.value = res.data;
	}
	tagList.value.forEach((item) => {
		res = getByTagId(item.id);
		if (res.success) {
			item.bookList = ref.data;
		}
	});
};

onMounted(() => {
	loadData();
});
</script>
<style scoped></style>
