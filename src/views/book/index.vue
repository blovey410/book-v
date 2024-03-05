<template>
	<!--	文件头-->
	<Header />

	<div class="main">
		<!--	轮播图-->
		<el-carousel :interval="5000" arrow="always" height="400px">
			<el-carousel-item v-for="item in list" :key="item">
				<el-image style="width: 1215px;" :src="item.src" />
			</el-carousel-item>
		</el-carousel>

		<!--	热门书籍-->
		<h1 class="text-slate-800">热门书籍</h1>
		<div v-for="item in bookList" :key="item">
			<BookCard :item="item" />
		</div>
		<!--	留言板块-->
		<h1 class="text-slate-800">留言板块</h1>
		<el-input
			v-model="message"
			:rows="4"
			type="textarea"
			placeholder="Please input"
		/>
		<el-button type="primary" class="float-right mt-2" @click="submit()"
			>留言</el-button
		>
	</div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { ref, onMounted } from 'vue';
import BookCard from '@/components/bookCard/BookCard.vue';
import { addComment } from '@/api/comment';
import { ElMessage } from 'element-plus';
import { getHotBook } from '../../api/book';
import lunbo1 from "@/assets/image/bg.jpg";
// 轮播图片列表
const list = [
	{
		src: lunbo1,
	},
	{
		src: 'https://img.yzcdn.cn/vant/apple-2.jpg',
	},
	{
		src: 'https://img.yzcdn.cn/vant/apple-3.jpg',
	},
	{
		src: 'https://img.yzcdn.cn/vant/apple-4.jpg',
	},
	{
		src: 'https://img.yzcdn.cn/vant/apple-5.jpg',
	},
];
// 热门书籍列表
const bookList = ref([
	{
		name: '三国演义',
		imgUrl: '',
		author: '罗贯中',
	},
]);
// 留言提交相关
const message = ref('');
const submit = async () => {
	const res = await addComment({ message: message.value });
	if (res.success) {
		message.value = '';
		ElMessage.success('留言成功');
	}
};

const loadData = async () => {
	const res = await getHotBook();
	if (res.success) {
		bookList.value = res.data;
	}
};
onMounted(() => {
	loadData();
});
</script>

<style scoped>
h1 {
	font-size: 2rem;
	font-weight: 700;
	margin: 0;
}
.el-carousel__item h3 {
	color: #475669;
	opacity: 0.75;
	line-height: 300px;
	margin: 0;
	text-align: center;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #d3dce6;
}
</style>
