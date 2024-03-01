<template>
	<Header />
	<div class="main">
		<div class="flex justify-evenly mt-10">
			<el-image
				style="width: 50%; height: 500px"
				:src="bookDetail.imgUrl"
				fit="cover"
			>
			</el-image>
			<div class="flex flex-col w-1/4 justify-center text-2xl">
				<span>书名：{{ bookDetail.name }}</span>
				<span>作者：{{ bookDetail.author }}</span>
				<span>编号：{{ bookDetail.id }}</span>
				<span>出版社：{{ bookDetail.create }}</span>
				<span>简介：{{ bookDetail.info }}</span>
				<el-button type="primary" class="mt-5">借阅</el-button>qq
			</div>
		</div>
	</div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
// 获取图书编号
const id = route.query.id;
const bookDetail = ref({
	name: '三国演义',
	author: '罗贯中',
	id: '1523',
	create: '新华出版社',
	imgUrl: '',
	info: '描写了从东汉末年到西晋初年之间近百年的历史风云，以描写战争为主，诉说了东汉末年的群雄割据混战和魏、蜀、吴三国之间的政治和军事斗争，最终司马炎一统三国，建立晋朝的故事',
});

// 获取图书详情
const getBookDetail = async (id) => {};
onMounted(() => {
	getBookDetail(id);
});
</script>

<style scoped>
span {
	margin-bottom: 10px;
}
</style>
