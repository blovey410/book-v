<template>
	<!--	文件头-->
	<Header />

	<div class="main">
		<!--	轮播图-->
		<el-carousel :interval="5000" arrow="always" height="400px">
			<el-carousel-item v-for="item in list" :key="item">
				<el-image style="width: 1215px; height: 500px" :src="item.src" />
			</el-carousel-item>
		</el-carousel>

		<!--	热门书籍-->
		<h1 class="text-slate-800">热门书籍</h1>
		<div
			style="
				display: grid;
				grid-template-columns: repeat(6, 1fr);
				height: 300px;
			"
		>
			<BookCard v-for="item in bookList" :key="item" :item="item" />
		</div>
		<!--	热门书籍-->
		<h1 class="text-slate-800">本周热门推荐</h1>
		<div v-for="(item, index) in adminList" :key="index" :item="item">
			<el-link type="primary" :href="item.url" >{{ item.title }}</el-link>
		</div>

		<!--	留言板块-->
		<h1 class="text-slate-800">留言板块</h1>
		<el-input
			v-model="message"
			:rows="4"
			type="textarea"
			placeholder="Please input"
		/>
		<div class="flex justify-between">
			<el-button type="primary" class="float-right mt-2" @click="find()"
				>查看留言
			</el-button>
			<el-button type="primary" class="float-right mt-2" @click="submit()"
				>留言
			</el-button>
		</div>
	</div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { ref, onMounted } from 'vue';
import BookCard from '@/components/bookCard/BookCard.vue';
import { addComment } from '@/api/comment';
import { ElMessage } from 'element-plus';
import { getHotBook } from '@/api/book';
import { getRecommendList } from '@/api/recommend';
import lunbo1 from '@/assets/image/bg.jpg';
import lunbo2 from '@/assets/image/bg1.jpg';
import lunbo3 from '@/assets/image/bg2.jpg';
import lunbo4 from '@/assets/image/bg3.jpg';
import lunbo5 from '@/assets/image/bg4.jpg';
import { useUserStore } from '@/stores/userStores';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const user = userStore.getUserInfo();
// 轮播图片列表
const list = [
	{
		src: lunbo1,
	},
	{
		src: lunbo2,
	},
	{
		src: lunbo3,
	},
	{
		src: lunbo4,
	},
	{
		src: lunbo5,
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
// 管理员推荐
const adminList = ref([
	{
		name: '三国演义',
		imgUrl: '',
	},
]);
// 留言提交相关
const message = ref('');
const submit = async () => {
	const res = await addComment({ content: message.value, userId: user.id });
	if (res.success) {
		message.value = '';
		ElMessage.success('留言成功');
	}
};

const find = () => {
	router.push({ path: '/comment' });
};

const loadData = async () => {
	let res = await getHotBook();
	if (res.success) {
		bookList.value = res.data;
	}
	res = await getRecommendList();
	if (res.success) {
		adminList.value = res.data;
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
