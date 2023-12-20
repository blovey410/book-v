<script setup>
import { useRouter } from "vue-router";
import { addCollection, unCollection } from "@/api/collection";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/userStores";
const userStore = useUserStore();
const userInfo = userStore.getUserInfo();
defineProps({
	records: {
		type: Object,
		required: true,
	},
});
const router = useRouter();
const toDetail = (id) => {
	router.push({
		path: "/detail",
		query: {
			id,
		},
	});
};
const cancelCollection = async (id) => {
	const res = await unCollection(id);
	if (res.success) {
		ElMessage.success("取消收藏成功");
		location.reload();
	} else {
		ElMessage.error("取消收藏失败");
	}
};
const collection = async (id) => {
	const res = await addCollection({
		file_id: id,
		user_id: userInfo.id,
	});
	if (res.success) {
		ElMessage.success("收藏成功");
		location.reload();
	} else {
		ElMessage.error("收藏失败");
	}
};

const prefix = import.meta.env.VITE_TEST_URL;
</script>

<template>
	<div
		v-for="(item, index) in records"
		:key="index"
		class="h-[300px] w-[300px] pr-4 cursor-pointer"
	>
		<div @click="toDetail(item.id)">
			<div class="h-[200px]">
				<img
					:src="`${prefix}/file/preview?url=${item.cover}`"
					class="object-fill h-full w-full"
					alt=""
				/>
			</div>
			<div class="describe">
				{{ item.name }}
			</div>
		</div>

		<div class="flex justify-between">
			<el-button
				type="primary"
				class="mt-2"
				:href="`${prefix}/file/preview?url=${item.url}`"
				target="_blank"
				tag="a"
				>预览
			</el-button>
			<el-button
				v-if="item.isCollection"
				type="primary"
				class="mt-2"
				@click="cancelCollection(item.id)"
				target="_blank"
				>取消收藏
			</el-button>
			<el-button
				v-if="!item.isCollection"
				type="primary"
				class="mt-2"
				@click="collection(item.id)"
				target="_blank"
				>收藏
			</el-button>
			<el-button
				tag="a"
				type="primary"
				class="mt-2"
				:href="`${prefix}/file/download?id=${item.id}`"
				>下载
			</el-button>
		</div>
	</div>
</template>

<style scoped>
.describe {
	color: #494949c7;
	font-weight: 400;
	font-size: 16px;
	font-family: "Microsoft YaHei", serif;
	word-break: break-all;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
