import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "./index.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import "./assets/base.css";
import axios from "axios";

import dayjs from "dayjs";
import dayjsZhCn from "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";

const app = createApp(App);
app.use(ElementPlus, {
	locale: zhCn,
});

app.use(router);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

axios.defaults.baseURL = import.meta.env.VITE_TEST_URL;

dayjs.locale(dayjsZhCn);
dayjs.extend(relativeTime);

app.mount("#app");
