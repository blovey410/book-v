<template>
	<div class="">
		<div class="flex flex-wrap">
			<div
				v-for="(item, index) in tableData.records"
				style="display: flex; flex-direction: column; margin-right: 20px"
			>
				<BookCard :key="index" :item="item" @click.stop="detail(item.bookId)" />
				<el-tag
					:hit="true"
					size="large"
					style="font-size: larger; margin: 2px 0"
					>{{ item.user }}
				</el-tag>
				<el-tag
					v-if="item.status === 1"
					:hit="true"
					size="large"
					style="font-size: larger; margin: 2px 0"
					>归还天数：{{ item.residue }} 天
				</el-tag>
				<el-tag type="danger"
					v-else
					:hit="true"
					size="large"
					style="font-size: larger; margin: 2px 0"
					>{{ item.status }}
				</el-tag>
				<el-button
					type="primary"
					v-if="item.status === '未归还'"
					@click="openNum(item.bookId)"
					>归还
				</el-button>
			</div>
		</div>
	</div>
	<el-dialog
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		v-model="dialogVisible"
		title="确认归还数量"
		width="500"
	>
		<el-form :model="formReturn" label-width="80px">
			<el-form-item label="归还数量">
				<el-input v-model="formReturn.num" />
			</el-form-item>
		</el-form>
		<div class="text-center">
			<el-button type="primary" @click="returnBook()">确认</el-button>
			<el-button @click="dialogVisible = false">取消</el-button>
		</div>
	</el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/userStores';
import { getBorrowById, returnData } from '@/api/borrow';
import BookCard from '@/components/bookCard/BookCard.vue';
import { useRouter } from 'vue-router';

const tableData = reactive({
	records: [],
});

const router = useRouter();
const store = useUserStore();
const userinfo = store.getUserInfo();
const page = async () => {
	const res = await getBorrowById(userinfo.id, 1);
	tableData.records = res.data.records;
};
const dialogVisible = ref(false);
const formReturn = ref({
	bookId: '',
	num: 1,
});

const openNum = (id)=>{
	dialogVisible.value = true;
	formReturn.value.bookId = id;
}

const returnBook = async () => {
	const res = await returnData(
		{
			bookId: formReturn.value.bookId,
			userId: userinfo.id,
			num: formReturn.value.num,
		}
	);
	if (res.code === 200) {
		page();
	}
};

const detail = (id) => {
	router.push({
		path: `/bookInfo`,
		query: { id },
	});
};

onMounted(() => {
	page();
});
</script>

<style scoped></style>
