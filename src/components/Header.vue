<script setup>
import { ref } from "vue";

const isShow = ref(true);
const openMenu = () => {
	isShow.value = !isShow.value;
}
</script>

<template>
	<div class="header bg-color">
		<ul class="flex flex-row flex-header justify-around items-center">
			<li><a href=""> 首页</a></li>
			<li><a href=""> 分类</a></li>
			<li><a href=""> 搜索</a></li>
			<li><a href=""> 本馆介绍</a></li>
			<li><a href=""> 公告</a></li>
			<li @mouseenter="openMenu()" @mouseleave="openMenu()"><a href=""> 我的</a>
				<ul class="flex flex-col bg-color" :class="{none: isShow}">
					<li><a href="">图书借阅</a></li>
					<li><a href="">图书归还</a></li>
					<li><a href="">个人资料</a></li>
					<li><a href="">管理员管理</a></li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<style scoped>
.bg-color{
	background-color: #a22b2b;
}
.header{
	width: 100%;
	height: 50px;
	color: #fff;
	font-size: 20px;
}
.flex-header{
	align-items: center;
	height: 100%;
}
.flex-header li{
	width: 100%;
	height: 100%;
	line-height: 50px;
	list-style: none;
	text-align: center;
}
li:hover{
	background-color: #701616;
	color: #fff;
}
.none{
	display: none;
}
</style>
