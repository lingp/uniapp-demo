<template>
	<view class="feedback">
		<view class="item">
			<view class="title">意见反馈：</view>
			<view class="content">
				<textarea placeholder="请输入你要反馈的问题"></textarea>
			</view>
		</view>
		<view class="item">
			<view class="title">反馈图片：</view>
			<view class="images">
				<view class="item">
					<uni-icons type="plusempty" color="#F5F5F5" size="60"></uni-icons>
				</view>
				<view class="item">
					<image src="../../static/image/logo.png" aspectFill></image>
				</view>
				<view class="item">
					<image src="../../static/image/logo.png" aspectFill></image>
				</view>
				<view class="item">
					<image src="../../static/image/logo.png" aspectFill></image>
				</view>
				<view class="item">
					<image src="../../static/image/logo.png" aspectFill></image>
				</view>
				<view class="item">
					<image src="../../static/image/logo.png" aspectFill></image>
				</view>
				<view class="item">
					<image src="../../static/image/logo.png" aspectFill></image>
				</view>
			</view>
			<view class="item">
				<button type="primary">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.feedback {
		display: flex;
		flex-direction: column;
		padding: 5px 10px;
		.item {
			margin-bottom: 10px;
			.title {
				padding: 5px;
				font-size: 16px;
				color: #808080;
			}
			.content {
				padding: 5px;
				textarea {
					border: 1px solid #F0F0F0;
					font-size: 14px;
					width: 100%;
					padding: 5px;
				}
			}
			.images {
				padding: 5px;
				display: flex;
				flex: 1;
				flex-wrap: wrap;
				justify-content: left;
				.item {
					border: 1px solid #F0F0F0;
					width: 80px;
					height: 80px;
					text-align: center;
					line-height: 80px;
					image {
						width: 100%;
						height: 100%;
					}
					margin-right: 3px;
				}
			}
		}
	}
</style>
