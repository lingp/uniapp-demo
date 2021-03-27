<template>
	<view class="comment-box">
		<view class="comment-header">
			<view class="comment-portrait">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-info">
				<view v-if="!comments.is_reply" class="comment-info-title">{{comments.author.author_name}}</view>
				<view v-else class="comment-info-title">
				{{comments.author.author_name}}
				<text class="reply-text">回复</text>
				{{comments.to}}
				</view>
				<view class="comment-info-time">{{comments.create_time | formatTime}}</view>
			</view>
		</view>
		<view class="comment-content">
			<view>{{comments.comment_content}}</view>
			<view class="comment-cotent-info">
				<view class="comment-cotent-info-button" @click="commentsReply({comments:comments,is_reply:reply})">回复</view>
			</view>
			<view class="comment-content-reply" v-for="item in comments.replys" :key="item.comment_id">
				<comments-box :reply="true" :comments="item" @reply="commentsReply"></comments-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentsBox from '@/components/comments-box/comments-box.vue'
	import {
		parseTime
	} from '@/utils/index.js'
	export default {
		name: "comments-box",
		components: {
			commentsBox
		},
		props: {
			comments: {
				type: Object,
				default () {
					return {}
				}
			},
			reply: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			};
		},
		filters: {
			formatTime(time) {
				return parseTime(time)
			}
		},
		methods: {
			commentsReply(comment) {
				// 为了区分 主回复，还是子回复
				if (comment.is_reply) {
					comment.comments.reply_id = comment.comments.comment_id
					comment.comments.comment_id = this.comments.comment_id
				}
				// console.log(comment);
				this.$emit('reply', comment)
			}
		}
	}
</script>

<style lang="scss">
	.comment-box {
		margin: 15px 0;
		.comment-header {
			display: flex;
			flex-direction: row;
			flex: 1;
			align-items: center;
			.comment-portrait {
				width: 30px;
				height: 30px;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.comment-info {
				margin-left: 20px;
				display: flex;
				flex-direction: column;
				color: #999;
				font-size: 12px;
				line-height: 1;
				.comment-info-title {
					margin-bottom: 5px;
					font-size: 14px;
					color: #333;
					.reply-text {
						margin: 0 5px;
						font-weight: bold;
						color: #000;
					}
				}
			}
		}
		
		.comment-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;
			word-break:break-all;
			.comment-cotent-info {
				margin: 10px;
				display: flex;
				.comment-cotent-info-button {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px #ccc solid;
				}
			}
			.comment-content-reply {
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				padding-top: 10px;
				border: 1px #eee solid;
			}
		}
	}
</style>
