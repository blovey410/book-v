<template>
	<div class="register">
		<el-form class="login-form" :model="form" :rules="rules" ref="formRef">
			<h2>注册</h2>
			<el-form-item label="昵称" prop="username">
				<el-input v-model="form.username" />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="form.password" />
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-input type="text" v-model="form.sex" />
			</el-form-item>
			<el-form-item label="电话" prop="telephone">
				<el-input type="text" v-model="form.telephone" />
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input type="text" v-model="form.email" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="toRegister(formRef)">注册</el-button>
				<el-button @click="toLogin">返回登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import {ElMessage} from 'element-plus';
import {useRouter} from 'vue-router';
import {addUser} from '@/api/user';
import {reactive, ref} from 'vue';

const router = useRouter();
const form = reactive({
	username: '',
	password: '',
	sex: '',
	telephone: '',
	email: '',
	role: 2,
	status: 1,
});
const formRef = ref();
const rules = {
	username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
	password: [{required: true, message: '请输入密码', trigger: 'blur'}, {
		min: 6,
		max: 20,
		message: '密码长度在6-12位',
		trigger: ['blur','change']
	}, {
		pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,12}$/,
		message: '密码只能包含字母、数字、下划线',
		trigger: ['blur','change']
	}],
	sex: [{required: true, message: '请选择性别', trigger: 'blur'}],
	telephone: [{required: true, message: '请输入电话', trigger: 'blur'}, {
		pattern: /^1[3456789]\d{9}$/,
		message: '请输入正确的电话',
		trigger: ['blur','change']
	}],
	email: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
};

function toRegister(formEl) {
	formEl.validate(async (valid) => {
		if (valid) {
			const res = await addUser(form);
			if (!res.success) {
				ElMessage.error(res.msg);
				return;
			}
			await router.push('/login');
		} else {
			return false;
		}
	});
}

function toLogin() {
	router.push('/login');
}
</script>

<style>
.register {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-image: url('@/assets/image/register.jpg');
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
