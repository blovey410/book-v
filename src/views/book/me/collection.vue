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
import { getSelfCollect } from "@/api/collection";
import FileCard from "@/components/fileCard/fileCard.vue";
const tableData = reactive({
	records: [],
});

const route = useRoute();
const router = useRouter();

const toDetail = (id) => {
	router.push({
		path: "/detail",
		query: {
			id: id,
		},
	});
};

const page = async () => {
	const res = await getSelfCollect();
	tableData.records = res.data;
};

onMounted(() => {
	page();
});
</script>

<style scoped></style>
