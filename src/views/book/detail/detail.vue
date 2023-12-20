<template>
	<div class="ml-36">
		<div class="pb-4">{{ file.name }}</div>
		<div class="h-[300px]">
			<div class="flex h-full">
				<div class="h-full">
					<el-image
						:src="`${prefix}/file/preview?url=${file.cover}`"
						class="w-[350px] h-full"
					/>
				</div>
				<div class="w-[400px] h-full mr-2 ml-2 flex flex-col">
					<div>文件名称:{{ file.name }}</div>
					<div>发布人:{{ file.create_user?.username }}</div>
					<div class="flex">
						分类:
						{{ file.classification.name }}
					</div>
				</div>
			</div>
		</div>
		<div>
			<el-button class="mt-2" v-if="file.isCollection" disabled
				>已收藏</el-button
			>
			<el-button class="mt-2" @click="postCollection" v-else
				>点击收藏</el-button
			>
		</div>

		<div class="mt-10">
			<span>发表评论</span>
			<div class="w-[500px]">
				<el-input
					type="textarea"
					:rows="3"
					placeholder="请输入内容"
					v-model="postCommentMessage"
				/>
				<el-button type="primary" class="mt-2" @click="postComment"
					>发表
				</el-button>
			</div>
		</div>

		<div class="w-[60%] mt-20">
			<div class="text-2xl text-[#93C5FD]">{{ file.name }}评论</div>
			<div class="w-full">
				<div
					v-for="(item, index) in commentPage.commentList"
					:key="index"
					class="pb-1 mb-1"
				>
					<div class="flex border-b-2 mb-2">
						<div class="flex">
							<div>
								<el-avatar
									:src="imageUrl + item.commentRoot.user.avatar"
									class="w-[50px] h-[50px]"
								/>
							</div>
						</div>
						<div class="ml-3 break-all mb-2 w-full">
							<div class="flex justify-between">
								<div>
									{{ item.commentRoot.user.username }}
								</div>
							</div>
							<div>
								{{ item.commentRoot.content }}
							</div>
							<div
								class="cursor-pointer text-blue-400"
								@click="
									replyRoot(
										item.commentRoot.id,
										item.commentRoot.user.id,
										item.commentRoot.id,
									)
								"
							>
								回复
							</div>
							<div
								class="flex items-center"
								v-if="commentPostVo.parent_id === item.commentRoot.id"
							>
								<input
									v-model="commentPostVo.content"
									type="text"
									class="rounded-lg text-black pl-3 pr-4 pt-1 pb-1"
								/>
								<el-button type="primary" @click="postReply">发表</el-button>
							</div>
						</div>
					</div>
					<div class="">
						<div
							v-for="(reply, replyIndex) in item.commentReplies"
							:key="replyIndex"
							class="flex border-b-2 pl-11 mt-3"
						>
							<div class="flex">
								<div>
									<el-avatar
										:src="imageUrl + reply.user.avatar"
										class="w-[50px] h-[50px]"
									/>
								</div>
							</div>
							<div class="ml-3 break-all w-full">
								<div class="flex justify-between">
									<div>
										{{ reply.user.username }}

										回复<span class="text-blue-400"
											>@{{ reply.replyUser.username }}：</span
										>{{ reply.content }}
									</div>
								</div>
								<span
									class="cursor-pointer text-blue-400"
									@click="
										replyRoot(reply.id, reply.replyUser.id, item.commentRoot.id)
									"
									>回复</span
								>
								<div
									class="flex items-center"
									v-if="commentPostVo.parent_id === reply.id"
								>
									<input
										v-model="commentPostVo.content"
										type="text"
										class="rounded-lg text-black pl-3 pr-4 pt-1 pb-1"
									/>
									<el-button type="primary" @click="postReply">发表</el-button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { queryFile } from "@/api/file";
import { addComment, getListAllComments } from "@/api/comment";
import { useUserStore } from "@/stores/userStores";
import { ElMessage } from "element-plus";
import { addCollection } from "@/api/collection";

const route = useRoute();
const prefix = import.meta.env.VITE_TEST_URL;
const userStore = useUserStore();
const userInfo = userStore.getUserInfo();
const imageUrl = import.meta.env.VITE_TEST_URL + "/file/preview?url=";
const file = ref({
	actorList: [],
	tagList: [],
	create_user: "",
	classification: "",
});

const commentPostVo = reactive({
	file_id: route.query.id,
	root_id: 0,
	parent_id: 0,
	reply_user_id: 0,
	content: "",
	user_id: userInfo.id,
});
const replyRoot = (parentId, replyUserId, rootId = 0) => {
	commentPostVo.content = "";
	commentPostVo.root_id = rootId;
	commentPostVo.reply_user_id = replyUserId;
	commentPostVo.parent_id = parentId;
};

const postCommentMessage = ref("");
const postComment = () => {
	commentPostVo.content = postCommentMessage.value;
	commentPostVo.root_id = 0;
	commentPostVo.parent_id = 0;
	postReply();
};

const postReply = async () => {
	if (commentPostVo.content === "") {
		return;
	}
	const result = await addComment(commentPostVo);
	if (result.success) {
		ElMessage.success({ message: "回复成功" });
	} else {
		ElMessage.error({ message: "回复失败" });
	}
	commentPostVo.content = "";
	commentPostVo.root_id = 0;
	commentPostVo.parent_id = 0;
	await loadComment();
};

const postCollection = async () => {
	const result = await addCollection({
		file_id: route.query.id,
		user_id: userInfo.id,
	});
	if (result.success) {
		ElMessage.success({ message: "收藏成功" });
		file.value.isCollection = true;
	} else {
		ElMessage.error({ message: "收藏失败" });
	}
};

const commentPage = reactive({
	commentList: [],
});

const loadFile = async () => {
	const result = await queryFile(route.query.id);
	file.value = result.data;
};

const loadComment = async () => {
	const result = await getListAllComments({ id: route.query.id });
	commentPage.commentList = result.data;
};

onMounted(() => {
	loadComment();
	loadFile();
});
</script>

<style scoped></style>
