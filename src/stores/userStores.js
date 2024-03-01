import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
	'user',
	() => {
		const token = ref();
		const useInfo = ref({});

		function getUserInfo() {
			return useInfo.value;
		}
		function setUserInfo(data) {
			useInfo.value = data;
		}
		function setToken(tokenResult) {
			token.value = tokenResult;
		}
		function getToken() {
			return token.value;
		}

		function clear() {
			useInfo.value = {};
			token.value = '';
		}

		return {
			useInfo,
			token,
			getUserInfo,
			setUserInfo,
			getToken,
			setToken,
			clear,
		};
	},
	{
		persist: {
			storage: sessionStorage,
		},
	},
);
