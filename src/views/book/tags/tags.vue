<template>
	<div>
		<div class="flex items-center flex-wrap">
			<fileCard :records="tableData.records" />
		</div>
	</div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { reactive, watchEffect } from "vue";
import { queryKnow } from "@/api/file";
import fileCard from "@/components/fileCard/fileCard.vue";

const route = useRoute();
const router = useRouter();
const tableData = reactive({
	records: [],
	pages: 0,
	page: 1,
	size: 10,
	tagId: "",
});

const loadData = async () => {
	const result = await queryKnow({
		id: tableData.tagId,
	});
	if (result.success) {
		tableData.records = result.data;
		tableData.page = result.data.pageNum;
		tableData.pages = result.data.pages;
	}
};

watchEffect(() => {
	if (route.query.tag === "hot") {
		return;
	}
	tableData.tagId = route.query.tag;
	loadData();
});
</script>
<style scoped></style>
