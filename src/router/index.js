import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStores';
import { pinia } from '@/pinia';

const userStore = useUserStore(pinia);
const user = userStore.getUserInfo();
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
				{
					path: '/me',
					name: 'me',
					component: () => import('@/views/book/me/me.vue'),
					// beforeEnter: (to, from, next)=> {
					// 	if (user){
					// 		ElMessage.error('请先登录');
					// 		next({ path: from.path });
					// 	}
					// },
				},
				{
					path: '/aboutMe',
					name: 'aboutMe',
					component: () => import('@/views/book/about-me/aboutMe.vue'),
					// beforeEnter: (to, from, next) => {
					// 	if (user){
					// 		ElMessage.error('请先登录');
					// 		next({ path: from.path });
					// 	}
					// },
				},
				{
					path: '/proclamation',
					name: 'proclamation',
					component: () => import('@/views/book/proclamation/Proclamation.vue'),
				},
				{
					path: '/info',
					name: 'info',
					component: () => import('@/views/book/proclamation/Info.vue'),
				},
				{
					path: '/comment',
					name: 'commentUser',
					component: () => import('@/views/book/comment/CommentList.vue'),
				},
				{
					path: '/more',
					name: 'more',
					component: () => import('@/views/book/tags/more.vue'),
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
				{
					path: '/admin/recommend',
					name: 'recommend',
					component: () => import('@/views/admin/recommend/recommend.vue'),
				},
				{
					path: '/admin/announcement',
					name: 'announcement',
					component: () =>
						import('@/views/admin/announcement/announcement.vue'),
				},
			],
			// beforeEnter: (to, from, next) => {
			// 	if (to.path.includes('/admin')) {
			// 		if (user.role === '1') {
			// 			next();
			// 		} else {
			// 			ElMessage.error('无权访问后台系统');
			// 			next({ path: '/login' });
			// 		}
			// 	}
			// },
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
export default router;
