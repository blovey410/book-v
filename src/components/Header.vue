<script setup>
import { useUserStore } from '@/stores/userStores';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const logout = () => {
	userStore.clear();
	router.push('/login');
};
</script>

<template>
	<el-menu
		background-color="#a22b2b"
		text-color="#fff"
		mode="horizontal"
		:router="true"
	>
		<el-menu-item index="/home">首页</el-menu-item>
		<el-menu-item index="/tags">分类</el-menu-item>
		<el-menu-item index="/search">搜索</el-menu-item>
		<el-menu-item index="/aboutMe">本馆介绍</el-menu-item>
		<el-menu-item index="/proclamation">公告</el-menu-item>
		<el-sub-menu index="6">
			<template #title>
				<div style="font-size: 20px">我的</div>
			</template>
			<el-menu-item index="/me">个人资料</el-menu-item>
			<el-menu-item index="/login">管理员管理</el-menu-item>
			<div class="span" @click="logout">退出登录</div>
		</el-sub-menu>
	</el-menu>
</template>

<style scoped>
.el-menu {
	padding: 0 10%;
	justify-content: space-evenly;
}

.el-menu-item {
	font-size: 24px;
}

.span {
	cursor: pointer;
	font-size: 24px;
	color: #fff;
	padding: 10px;
}
.span:hover{
	background-color: #822222;
}
</style>
