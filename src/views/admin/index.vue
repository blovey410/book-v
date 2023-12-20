<template>
	<el-container style="position: relative; width: 100%; height: 100%">
		<div
			style="
				position: fixed;
				left: 0;
				top: 0;
				height: 100%;
				width: 10vw;
				background-color: #304156;
			"
		>
			<el-aside width="10vw" style="height: 100%">
				<el-scrollbar>
					<el-menu
						:default-openeds="['/admin']"
						background-color="rgb(48,65,86)"
						text-color="#fff"
						opacity="0.8"
						active-text-color="#ffd04b"
						:router="true"
					>
						<el-sub-menu index="/admin">
							<template #title>
								<el-icon>
									<VideoPlay />
								</el-icon>
								知识共享平台
							</template>
							<el-menu-item index="/admin/user">用户管理</el-menu-item>
							<el-menu-item index="/admin/file">文件管理</el-menu-item>
							<el-menu-item index="/admin/tag">分类管理</el-menu-item>
						</el-sub-menu>
					</el-menu>
				</el-scrollbar>
			</el-aside>
		</div>

		<div style="position: relative; margin-left: 210px; width: 85vw">
			<el-container>
				<el-header class="head">
					<div>
						<el-page-header @back="goBack">
							<template #content>
								<span> {{ title }} </span>
							</template>
						</el-page-header>
					</div>
					<div class="toolbar">
						<el-dropdown>
							<el-icon>
								<setting />
							</el-icon>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="userLogout"
										>退出登录</el-dropdown-item
									>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
						<span>{{ userStore.useInfo.username }}</span>
					</div>
				</el-header>

				<el-main>
					<el-scrollbar>
						<router-view v-slot="{ Component, route }">
							<transition name="fade" mode="out-in">
								<component :is="Component" />
							</transition>
						</router-view>
					</el-scrollbar>
				</el-main>
			</el-container>
		</div>
	</el-container>
</template>

<script setup>
import { Setting, VideoPlay } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

const checked1 = ref(1);

import { logout } from "@/api/user";
import { useUserStore } from "@/stores/userStores";

const router = useRouter();
const route = useRoute();
const title = ref("");
const goBack = () => {
	router.back();
};
const userStore = useUserStore();

const userLogout = async () => {
	await logout();
	userStore.clear();
	await router.push("/login");
};

onBeforeRouteUpdate((to) => {
	title.value = to.meta.title;
});

onMounted(() => {
	title.value = route.meta.title;
});
</script>

<style scoped>
.el-sub-menu .el-menu-item {
	background-color: #1f2d3d !important;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.toolbar {
}

.head {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	box-shadow: rgba(0, 0, 0, 0.05) 0 6px 10px 0,
		rgba(0, 0, 0, 0.08) 0 0 0 1px;
	margin: 0 20px;
	background-color: #ffff;
}

body {
	background-color: #f5f7fa;
}
</style>
