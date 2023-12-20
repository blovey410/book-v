<template>
	<!--	文件头-->
	<Header />
	<!--	轮播图-->
	<el-carousel :interval="5000" arrow="always">
		<el-carousel-item v-for="item in 5" :key="item">
			<h3 text="2xl" justify="center">{{ item }}</h3>
		</el-carousel-item>
	</el-carousel>
	<!--	热门书籍-->
	<h1>热门书籍</h1>
	<div class="flex"></div>
	<!--	留言板块-->
	<h1>留言板块</h1>
</template>

<script setup>
import Header from "../../components/Header.vue";
// 轮播图片列表
const list = [
	{
		src: "https://img.yzcdn.cn/vant/apple-1.jpg",
	},
	{
		src: "https://img.yzcdn.cn/vant/apple-2.jpg",
	},
	{
		src: "https://img.yzcdn.cn/vant/apple-3.jpg",
	},
	{
		src: "https://img.yzcdn.cn/vant/apple-4.jpg",
	},
	{
		src: "https://img.yzcdn.cn/vant/apple-5.jpg",
	},
];
</script>

<style scoped>
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
