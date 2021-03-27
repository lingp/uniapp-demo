<template>
	<view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<view class="popup-header-item" @click="close">取消</view>
					<view class="popup-header-item" @click="submit">发布</view>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="comments"  maxlength="200" fixed placeholder="请输入评论内容" />
				</view>
				<view class="popup-footer">
					<view class="popup-count">{{comments.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				comments: ''
			};
		},
		methods: {
			open() {
				this.comments = ''
				this.$refs.popup.open()
			},
			close() {
				this.comments = ''
				this.$refs.popup.close()
			},
			submit() {
				if (!this.comments) {
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
					})
				}
				this.$emit('submit', this.comments)
			}
		}
	}
</script>

<style lang="scss">
	.popup-wrap {
		background-color: #FFFFFF;
		.popup-header {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666666;
			border-bottom: 1px #F5F5F5 solid;
			.popup-header-item {
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}
		.popup-content {
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			.popup-textarea {
				width: 100%;
				height: 200px;
			}
		}
		.popup-footer {
			height: 30px;
			line-height: 30px;
			font-size: 12px;
			color: #999;
			text-align: right;
			padding-right: 15px;
			// padding-bottom: 10px;
			border-top: 1px #F5F5F5 solid;
		}
	}
</style>
