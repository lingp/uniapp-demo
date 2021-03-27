<template>
	<view class="wrapper">
		<view class="commnet-content" v-for="(item, index) in commentsList" :key="index">
			<comments-box :comments="item" @reply="reply"></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" iconType="snow" :status="loading"></uni-load-more>
		<release ref="popup" @submit="submit"></release>
		<view class="footer">
			<view class="input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentsList: [],
				article_id: '',
				page: 1,
				pageSize: 5,
				loading:'loading'
			}
		},
		/**
		 * 上拉加载
		 */
		onReachBottom() {
			if(this.loading === 'noMore') return
			this.page++
			this.getComments()
		},
		onLoad(query) {
			this.articleId = query.id
			this.getComments();
		},
		methods: {
			openComment() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			reply(e){
				this.replyFormData = {
					"comment_id":e.comments.comment_id,
					"is_reply": e.is_reply
				}
				if(e.comments.reply_id){
					this.replyFormData.reply_id = e.comments.reply_id
				}
				console.log(this.replyFormData);
				this.openComment()
			},
			submit(content) {
				const data = {
					article_id: this.articleId,
					content,
					...this.replyFormData
				}
				console.log(data)
				uni.showLoading()
				this.$api.update_comment(data).then((res)=>{
					console.log(res);
					uni.hideLoading()
					uni.showToast({
						title:'评论发布成功'
					})
					this.getComments() // 直接调用这里有点问题
					this.close()
					this.replyFormData = {}
				})
			},
			/**
			 * 获取评论
			 */
			getComments() {
				let that = this
				this.$api.get_comments({
					article_id: this.articleId,
					pageSize: this.pageSize,
					page: this.page,
				}).then(res => {
					const {
						data
					} = res
					if(data.length === 0){
						this.loading = 'noMore'
						return
					}
					console.log(data)
					// 对象复制
					let oldFormData = JSON.parse(JSON.stringify(this.commentsList))
					oldFormData.push(...data)
					this.commentsList = oldFormData 
					console.log('commentsList', this.commentsList)
					// that.commentsList.push(...data)

					// this.$set(this.commentsList, 0, ...data)
				})
			}
		}
	}
</script>

<style lang="scss">
	.wrapper {
		padding: 0 15px;
		.commnet-content {
			padding-bottom: 55px;
		}
		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			width: 100%;
			height: 50px;
			background-color: #fff;
			box-sizing: border-box;
			flex: 1;
			padding: 0 15px;
			.input {
				border: 1px #ddd solid;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 30px;
				border-radius: 5px;
				padding: 0 10px;
				text {
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
</style>
