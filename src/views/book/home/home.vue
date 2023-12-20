<template>
	<div>
		<h1 class="text-[30px]">你好!</h1>
		<h2 class="text-[20px] ">
			<router-link style="color: lightskyblue"  to="/search">去首页</router-link>
			<span>欢迎回来 {{userStore.getUserInfo().username}}</span>
		</h2>
	</div>
</template>

<script setup>


import { useUserStore } from "@/stores/userStores";

let userStore = useUserStore();

</script>

<style scoped></style>
