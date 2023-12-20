<template>
	<div class="">
		<div class="flex items-center flex-wrap">
			<fileCard :records="tableData.records" />
		</div>
	</div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import FileCard from "@/components/fileCard/fileCard.vue";
import { queryFileByLogin } from "@/api/file";
const tableData = reactive({
	records: [],
});
const router = useRouter();
const page = async () => {
	const res = await queryFileByLogin();
	tableData.records = res.data;
};

onMounted(() => {
	page();
});
</script>

<style scoped></style>
