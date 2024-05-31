import { createApp } from 'vue';

import './index.css';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

import App from './App.vue';
import router from './router';
import './assets/main.css';
import './assets/base.css'

import dayjs from 'dayjs';
import dayjsZhCn from 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import { pinia } from '@/pinia';

const app = createApp(App);
app.use(ElementPlus, {
	locale: zhCn,
});

app.use(router);
app.use(pinia);

dayjs.locale(dayjsZhCn);
dayjs.extend(relativeTime);

app.mount('#app');
