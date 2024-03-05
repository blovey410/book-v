import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStores';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: '/',
			redirect: '/login',
			children: [
				{
					path: '/home',
					name: 'home',
					component: () => import('@/views/book/index.vue'),
				},
				{
					path: '/tags',
					name: 'tags',
					component: () => import('@/views/book/tags/tags.vue'),
				},
				{
					path: '/bookInfo',
					name: 'detail',
					component: () => import('@/views/book/detail/detail.vue'),
				},
				{
					path: '/search',
					name: 'search',
					component: () => import('@/views/book/search/search.vue'),
				},
			],
		},
		//后台模块
		{
			path: '/admin',
			name: 'admin',
			component: () => import('@/views/admin/index.vue'),
			redirect: '/admin/user',
			children: [
				{
					path: '/admin/book',
					name: 'book',
					component: () => import('@/views/admin/book/book.vue'),
				},
				{
					path: '/admin/tag',
					name: 'tag',
					component: () => import('@/views/admin/tag/tag.vue'),
				},
				{
					path: '/admin/user',
					name: 'user',
					component: () => import('@/views/admin/user/user.vue'),
				},
				{
					path: '/admin/borrow',
					name: 'borrow',
					component: () => import('@/views/admin/borrow/borrow.vue'),
				},
				{
					path: '/admin/return',
					name: 'return',
					component: () => import('@/views/admin/return/return.vue'),
				},
				{
					path: '/admin/comment',
					name: 'comment',
					component: () => import('@/views/admin/comment/comment.vue'),
				},
			],
		},
		{
			path: '/login',
			component: () => import('@/views/login.vue'),
		},
		{
			path: '/register',
			component: () => import('@/views/register.vue'),
		},
	],
});

// const whitelisting = ["/login", "/register"];
// router.beforeEach((to, from, next) => {
// 	const userStore = useUserStore();
// 	if (userStore.getToken() && to.path.includes("/admin")) {
// 		const user = userStore.getUserInfo();
// 		if (user.role === 1) {
// 			next();
// 		} else {
// 			ElMessage.error("无权访问后台系统");
// 			next({ path: "/home" });
// 		}
// 	}
// 	if (!whitelisting.includes(to.path) && !userStore.getToken()) {
// 		next({ path: "/login" });
// 	} else {
// 		next();
// 	}
// });

export default router;
