<template>
	<Header />
	<div class="main" style="padding: 50px 0 0 50px">
		<h1 style="font-size: 40px; font-weight: 500">{{ 本馆介绍 }}</h1>
		<el-divider />
		<div style="font-size: 30px">
			<p>
				乡村文化馆，坐落于风景如画的乡村之中，是传承乡村文化、展示乡村风貌的重要场所。馆内陈列着丰富多彩的展品，包括民间手工艺品、历史照片、图书收藏等，每一件展品都承载着深厚的乡村记忆，诉说着乡村的变迁与发展。
			</p>
			<p>
				乡村文化馆不仅是展示乡村文化的窗口，更是传承乡村文明、弘扬乡村精神的重要阵地。我们定期举办各类文化活动，如乡村文艺演出、传统手工艺体验等，让游客在欣赏乡村美景的同时，也能深入了解乡村文化的内涵与魅力。
			</p>
			<p>
				此外，乡村文化馆还致力于乡村文化的传承与创新，积极挖掘乡村文化的现代价值，推动乡村文化的繁荣发展。我们坚信，乡村文化不仅是乡村的宝贵财富，更是中华民族优秀传统文化的重要组成部分。
			</p>
			<p>欢迎各位游客前来乡村文化馆参观游览，共同感受乡村文化的独特魅力！</p>
			<p>
				乡村文化馆图书管理系统，作为乡村文化的重要载体，致力于为广大乡村读者提供便捷、高效的图书借阅服务。本系统采用先进的信息化技术，实现了图书的自动化管理，为乡村读者提供了更加丰富的阅读资源。
			</p>
			<p>
				通过乡村文化馆图书管理系统，读者可以轻松查询馆藏图书信息，快速完成借阅、归还等操作。系统还提供了个性化的阅读推荐服务，根据读者的阅读习惯和兴趣偏好，为其推荐合适的图书，让读者在享受阅读乐趣的同时，不断提升自我修养。
			</p>
			<p>
				此外，乡村文化馆图书管理系统还注重与读者的互动与交流，通过线上平台，读者可以发表阅读心得、参与图书讨论，与其他读者分享阅读体验，共同营造一个良好的阅读氛围。
			</p>
			<p>
				乡村文化馆图书管理系统将继续秉承“服务乡村、传承文化”的宗旨，不断优化系统功能，提升服务质量，为乡村文化的繁荣发展贡献力量。
			</p>
		</div>
	</div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getRecommendById } from '@/api/recommend';
const route = useRoute();
const id = route.query.id;

loadData = async () => {
	const res = await getRecommendById({ id });
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
