<template>
	<div class="me">
		<div class="me-header">
			<div>
				<el-avatar :size="120" :src="imageUrl + userInfo.avatar" />
			</div>
			<div class="me-header-right">
				<div class="me-header-right-top text-black">
					<div class="name">用户名：{{ userInfo.username }}</div>
					<div class="name">手机号：{{ userInfo.phone }}</div>
					<div class="name">
						用户等级：{{ userInfo.level === 1 ? "管理员" : "普通用户" }}
					</div>
					<div class="name">邮箱：{{ userInfo.email }}</div>
				</div>
			</div>
		</div>
		<div class="me-content">
			<div
				class="flex justify-between border-b h-15 z-10 mt-5"
				style="position: sticky; top: 10vh"
			>
				<div class="flex">
					<div
						:class="[
							'mr-8',
							'text-xl',
							'hover:text-white',
							'cursor-pointer',
							activeTab === 'collection' ? 'text-black' : 'text-gray-400',
						]"
						@click="activeTab = 'collection'"
					>
						收藏
					</div>
					<div
						:class="[
							'mr-8',
							'text-xl',
							'hover:text-white',
							'cursor-pointer',
							activeTab === 'myfile' ? 'text-black' : 'text-gray-400',
						]"
						@click="activeTab = 'myfile'"
					>
						我的共享
					</div>
				</div>
				<div></div>
			</div>
			<div class="">
				<collection v-if="activeTab === 'collection'" />
				<myfile v-if="activeTab === 'myfile'" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import Collection from "@/views/film/me/collection.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStores";
import Myfile from "@/views/film/me/myfile.vue";

const route = useRoute();
const userStore = useUserStore();
const imageUrl = import.meta.env.VITE_TEST_URL + "/file/preview?url=";
const activeTab = ref(route.query.tab || "collection");

const userInfo = reactive({
	username: userStore.getUserInfo().username,
	phone: userStore.getUserInfo().phone,
	level: userStore.getUserInfo().role,
	avatar: userStore.getUserInfo().avatar,
	email: userStore.getUserInfo().email,
	likeCount: 0,
});

const works = reactive([]);

onMounted(() => {});
</script>

<style scoped lang="less">
.me {
	//margin: 0 auto;
	//width: 70%;
}

// 抽取.me-header 样式
.me-header {
	display: flex;
	margin-top: 20px;

	.me-header-right {
		display: flex;
		flex-direction: column;
		margin-left: 20px;
		justify-content: space-between;
		.name {
			font-size: 20px;
			font-weight: bold;
		}

		.me-header-right-bottom {
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>
