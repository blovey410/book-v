<template>
	<Header />
	<div class="me main">
		<div class="me-header">
			<div class="me-header-right">
				<div class="me-header-right-top text-black">
					<div class="name">用户名：{{ userInfo.username }}</div>
					<div class="name">手机号：{{ userInfo.telephone }}</div>
					<div class="name">
						用户等级：{{ userInfo.level === 1 ? '管理员' : '普通用户' }}
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
							activeTab === 'myBorrow' ? 'text-black' : 'text-gray-400',
						]"
						@click="activeTab = 'myBorrow'"
					>
						我的借阅
					</div>
					<div
						:class="[
							'mr-8',
							'text-xl',
							'hover:text-white',
							'cursor-pointer',
							activeTab === 'myReturn' ? 'text-black' : 'text-gray-400',
						]"
						@click="activeTab = 'myReturn'"
					>
						我的归还
					</div>
				</div>
				<div></div>
			</div>
			<div class="">
				<my-borrow v-if="activeTab === 'myBorrow'" />
				<my-return v-if="activeTab === 'myReturn'" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStores';
import MyReturn from './MyReturn.vue';
import MyBorrow from './MyBorrow.vue';
import Header from '@/components/Header.vue';

const route = useRoute();
const userStore = useUserStore();

const activeTab = ref(route.query.tab || 'myBorrow');

const userInfo = reactive({
	username: userStore.getUserInfo().username,
	telephone: userStore.getUserInfo().telephone,
	level: userStore.getUserInfo().role,
	avatar: userStore.getUserInfo().avatar,
	email: userStore.getUserInfo().email,
});

const works = reactive([]);

onMounted(() => {});
</script>

<style scoped lang="less">
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
