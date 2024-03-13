<template>
	<Header />
	<div class="main" style="padding: 50px 0 0 50px">
		<h1 style="font-size: 40px; font-weight: 700">{{ announcement.title }}</h1>
		<div style="text-align: right">{{ announcement.createTime }}</div>
		<div style="font-size: 30px">
			{{ announcement.content }}
		</div>
	</div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getAnnouncementById } from '@/api/announcement';

const route = useRoute();
const id = route.query.id;

const announcement = ref({});

const loadData = async () => {
	const res = await getAnnouncementById(id);
	if (res.code === 200) {
		announcement.value = res.data;
	}
};

onMounted(() => {
	loadData();
});
</script>

<style scoped>
.el-divider--horizontal {
	margin: 5px 0;
}

div > p {
	text-indent: 2em;
}
</style>
