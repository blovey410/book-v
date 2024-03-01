<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue';

const isShow = ref(true);
const openMenu = () => {
	isShow.value = false;
};
const closeMenu = () => {
	isShow.value = true;
};
</script>

<template>
	<el-menu
		background-color="#a22b2b"
		text-color="#fff"
		active-text-color="#ffd04b"
		mode="horizontal"
		:router="true"
	>
		<el-menu-item index="/home">首页</el-menu-item>
		<el-menu-item index="/tags">分类</el-menu-item>
		<el-menu-item index="/search">搜索</el-menu-item>
		<el-menu-item index="4">本馆介绍</el-menu-item>
		<el-menu-item index="5">公告</el-menu-item>
		<el-sub-menu index="6">
			<template #title> <div style="font-size: 20px">我的</div></template>
			<el-menu-item index="5-1">图书借阅</el-menu-item>
			<el-menu-item index="5-2">图书归还</el-menu-item>
			<el-menu-item index="5-3">个人资料</el-menu-item>
			<el-menu-item index="/login">管理员管理</el-menu-item>
		</el-sub-menu>
	</el-menu>
</template>

<style scoped>
.el-menu {
	padding: 0 10%;
	justify-content: space-evenly;
}
.el-menu-item {
	font-size: 20px;
}
</style>
