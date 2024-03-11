import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
	'user',
	() => {
		const useInfo = ref({});

		function getUserInfo() {
			return useInfo.value;
		}
		function setUserInfo(data) {
			useInfo.value = data;
		}

		function clear() {
			useInfo.value = {};
		}

		return {
			useInfo,
			getUserInfo,
			setUserInfo,
			clear,
		};
	},
	{
		persist: {
			storage: sessionStorage,
		},
	},
);
