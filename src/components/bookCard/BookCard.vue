<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const prefix = import.meta.env.VITE_TEST_URL;
defineProps({
	item: Object,
});
const getInfo = (id) => {
	// TODO: 跳转到书籍详情页
	router.push({
		path: `/bookInfo`,
		query: { id },
	});
};
</script>

<template>
	<div>
		<el-card
			class="flex justify-center"
			shadow="hover"
			style="width: 150px"
			:body-style="{ padding: '0px' }"
			@click="getInfo(item.id)"
		>
			<el-image
				style="width: 100%; height: 100px; margin-top: 10px"
				:src="item.imgUrl"
				fit="cover"
			></el-image>
			<div class="flex flex-col">
				<span>书名：{{ item.name }}</span>
				<span>作者：{{ item.author }}</span>
			</div>
		</el-card>
	</div>
</template>

<style scoped></style>
