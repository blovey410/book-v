<template>
	<div class="login">
		<el-form class="login-form" :model="form" :rules="rules" ref="formRef">
			<h2>登录</h2>
			<el-form-item prop="username">
				<el-input v-model="form.username" placeholder="请输入用户名" />
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					type="password"
					v-model="form.password"
					placeholder="请输入密码"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" class="login-btn" @click="toLogin(formRef)"
					>登录</el-button
				>
				<el-button type="primary" class="login-btn" @click="toRegister"
					>去注册</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api/user';
import { useUserStore } from '@/stores/userStores';

const router = useRouter();
const form = reactive({
	username: 'admin',
	password: '123456',
});
const formRef = ref();
const rules = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};
const toRegister = () => {
	router.push('/register');
};

const userStore = useUserStore();

function toLogin(formEl) {
	formEl.validate(async (valid) => {
		if (valid) {
			const res = await login(form);
			if (!res.success) {
				ElMessage.error(res.msg);
				return;
			}
			userStore.setUserInfo(res.data);
			if (res.data.role === 1) {
				// 是管理员,则进入管理页面
				await router.push('/admin');
				return;
			}
			await router.push('/home');
		} else {
			return false;
		}
	});
}
</script>

<style>
.login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-image: url('@/assets/image/login.jpg');
	background-size: cover;
	background-position: center;
}

.login-form {
	width: 400px;
	padding: 40px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 0 10px #ccc;
	opacity: 0.9;
}

.login-form h2 {
	margin-bottom: 20px;
}

.captcha {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.captcha img {
	width: 150px;
	height: 50px;
	margin-right: 10px;
}

.captcha a {
	font-size: 14px;
	color: #333;
}
</style>
