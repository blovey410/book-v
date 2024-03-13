<template>
	<Header />
	<div class="main">
		<div class="flex justify-evenly mt-10">
			<el-image
				style="width: 50%; height: 500px"
				:src="prefix + bookDetail.imgUrl"
				fit="cover"
			>
			</el-image>
			<div class="flex flex-col w-1/3 justify-center text-2xl">
				<span>编号：{{ bookDetail.id }}</span>
				<span>书名：{{ bookDetail.name }}</span>
				<span>作者：{{ bookDetail.author }}</span>
				<span>出版社：{{ bookDetail.press }}</span>
				<span>简介：{{ bookDetail.info }}</span>
				<span>小说主题：{{ bookDetail.theme }}</span>
				<el-button type="primary" class="mt-5" @click="openBorrow"
					>借阅</el-button
				>
			</div>
		</div>
	</div>
	<Borrow :dialogVisible="dialogVisible" :bookId="id" />
</template>

<script setup>
import Header from '@/components/Header.vue';
import Borrow from '@/components/Borrow.vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { queryBook } from '@/api/book';

const dialogVisible = ref(false);
const route = useRoute();
const prefix = import.meta.env.VITE_TEST_URL + '/uploads/';
// 获取图书编号
const id = route.query.id;
const bookDetail = ref({});

// 获取图书详情
const getBookDetail = async (id) => {
	const res = await queryBook({ id });
	bookDetail.value = res.data;
};

// 打开借阅弹窗
const openBorrow = () => {
	dialogVisible.value = true;
};

onMounted(() => {
	getBookDetail(id);
});
</script>

<style scoped>
span {
	margin-bottom: 10px;
}
</style>
