<template>
	<el-dialog
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		v-model="dialogVisible"
		title="确认借阅数量"
		width="500"
	>
		<el-form :model="formBorrow" label-width="80px">
			<el-form-item label="借阅数量">
				<el-input v-model="formBorrow.num" />
			</el-form-item>
		</el-form>
		<div class="text-center">
			<el-button type="primary" @click="borrow">确认</el-button>
			<el-button @click="dialogVisible = false">取消</el-button>
		</div>
	</el-dialog>
</template>

<script setup>
const props = defineProps({
	dialogVisible: Boolean,
	bookId: String,
});

import { useUserStore } from '@/stores/userStores';
import { addData } from '@/api/borrow';
import { ref, toRef, watch } from 'vue';
import { ElMessage } from 'element-plus';

const store = useUserStore();
const user = store.getUserInfo();
// const dialogVisible = toRef(props, 'dialogVisible');
const dialogVisible = ref(props.dialogVisible);
const bookId = toRef(props, 'bookId');
const formBorrow = ref({
	bookId: bookId,
	userId: user.id,
	num: 1,
});

// 借阅图书
const borrow = async (id) => {
	const res = await addData(formBorrow.value);
	if (res.success) {
		ElMessage.success('借阅成功');
		dialogVisible.value = false;
	} else {
		ElMessage.error(res.msg);
	}
};

watch(
	() => props.dialogVisible,
	(val) => {
		dialogVisible.value = val;
	},
);
</script>

<style lang="scss" scoped></style>
