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
import fileCard from "@/components/fileCard/fileCard.vue";
import { queryKnow } from "@/api/file";

const route = useRoute();
const router = useRouter();
const tableData = reactive({
	records: [],
	search: "",
});

const loadData = async () => {
	const result = await queryKnow({
		name: tableData.search,
	});
	if (result.success) {
		tableData.records = result.data;
	}
};

watchEffect(() => {
	tableData.search = route.query.search;
	loadData();
});
</script>
<style scoped></style>
