<template>
	<view class="wrapper">
		<view class="header">
			<view class="title">
				{{formData.title}}
			</view>
			<view class="info">
				<view class="avatar">
					<image :src="formData.author.avatar" mode="aspectFill"></image>
				</view>
				<view class="info-content">
					<view class="name">
						{{formData.author.author_name}}
					</view>
					<view class="other">
						<text>{{formData.create_time}}</text>
						<text>{{formData.browse_count}} 浏览</text>
						<text>{{formData.thumbs_up_count}} 赞</text>
					</view>
				</view>
				<button class="button-attention" @click="follow(formData.author.id)">{{formData.is_author_like?'取消关注':'关注'}}</button>
			</view>
		</view>
		<view class="content">
			<view class="detail">
				<u-parse :content="formData.content" :noData="noData" @navigate="navigate"></u-parse>
			</view>
			<view class="comment">
				<view class="comment-title">最新评论</view>
				<view class="commnet-content" v-for="item in commentsList" :key="item.comment_id">
					<comments-box :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="icons">
				<view class="icons-box">
					<uni-icons @click="openCommentList" type="chat" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="icons-box">
					<uni-icons @click="likeTap(formData._id)" :type="formData.is_like?'heart-filled':'heart'" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="icons-box">
					<uni-icons @click="thumbsup(formData._id)" :type="formData.is_thumbs_up?'hand-thumbsup-filled':'hand-thumbsup' " size="22" color="#F07373"></uni-icons>
				</view>
			</view>
		</view>
		<release ref="popup" @submit="submit"></release>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	
	export default {
		components:{
			uParse
		},
		data() {
			return {
				formData: {},
				noData:'<p style="text-align:center;color:#666">详情加载中...</p>',
				replyFormData: {},
				commentsList: []
			}
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			this.getDetail()
			this.getComments()
		},
		methods: {
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then((res) => {
					const {data} = res
					this.formData = data
				})
			},
			navigate(href, e) {
				console.log(href)
			},
			openComment() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			submit(content) {
				const data = {
					article_id: this.formData._id,
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
					this.getComments()
					this.close()
					this.replyFormData = {}
				})
			},
			getComments() {
				this.$api.get_comments({
					article_id: this.formData._id
				}).then(res=>{
					console.log(res);
					const {data} = res
					this.commentsList = data
				})
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
			// 收藏
			likeTap(article_id) {
				uni.showLoading()
				this.$api.update_like({
					article_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					uni.$emit('set_update_like', {
						'is_index' : false
					})
					uni.showToast({
						title:this.formData.is_like ?'收藏成功':'取消收藏',
						icon:'none'
					})
					console.log('收藏成功');
				})
			},
			// 点赞
			thumbsup(article_id){
				uni.showLoading()
				this.$api.update_thumbsup({
					article_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_thumbs_up = true
					this.formData.thumbs_up_count++
					uni.showToast({
						title:res.msg
					})
				})
			},
			// 关注
			follow(author_id){
				console.log('关注');
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_author_like = !this.formData.is_author_like
					uni.showToast({
						title:this.formData.is_author_like?'关注作者成功':'取消关注作者',
						icon:'none'
					})
				})
			},
			openCommentList() {
				console.log('hello world')
				uni.navigateTo({
					url: "../comment-list/comment-list?id=" + this.formData._id
				})
			}
		}
	}
</script>

<style lang="scss">
	.wrapper {
		padding: 15px 0;
		padding-bottom: 54px;
		.header {
			.title {
				padding: 0 15px;
				font-size: 18px;
				font-weight: bold;
				color: #333;
			}
			.info {
				display: flex;
				align-items: center;
				margin-top: 10px;
				padding: 0 15px;
				flex: 1;
				.avatar {
					flex-shrink: 0;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					overflow: hidden;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				.info-content {
					width: 100%;
					padding-left: 10px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					font-size: 12px;
					.name {
						font-size: 14px;
						color: #333;
					}
					.other {
						color: #999;
						text {
							margin-right: 10px;
						}
					}
				}
				.button-attention {
					flex-shrink: 0;
					height: 30px;
					font-size: 12px;
					color: #fff;
					background-color: $app-base-color;
				}
			}
		}
	
		.content {
			margin: 20px;
			min-height: 500px;
			.detail {
			}
			.comment {
				margin-top: 30px;
				.comment-title {
					padding: 10px 0px;
					font-size: 14px;
					font: #666;
					border-bottom: 1px #F5F5FF solid;
				}
				.comment-content {
					padding: 0 15px;
					border-top: 1px #eee solid;
				}
			}
		}
		
		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			width: 100%;
			height: 50px;
			border-top: 1px #f5f5f5 solid;
			background-color: #fff;
			box-sizing: border-box;
			flex: 1;
			.input {
				border: 1px #ddd solid;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 30px;
				border-radius: 5px;
				padding: 0 10px;
				margin-left: 10px;
				text {
					font-size: 12px;
					color: #999;
				}
			}
			.icons {
				display: flex;
				flex: 1;
				flex-shrink: 0;
				padding: 0 10px;
				.icons-box {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 44px;
				}
			}
		}
	}
	
</style>
