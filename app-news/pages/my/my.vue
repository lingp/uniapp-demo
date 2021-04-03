<template>
	<view class="my-wrapper">	
		<view class="header">
			<view class="back"></view>
			<view class="intro">
				<view class="avatar">
					<image src="../../static/image/follow-active.png" aspectFill></image>
				</view>
				<view class="desc">
					测试
				</view>
			</view>
			<view class="info">
				<view class="info-item">
					<view>关注</view>
					<view>2</view>
				</view>
				<view class="info-item">
					<view>粉丝</view>
					<view>2</view>
				</view>
				<view class="info-item">
					<view>积分</view>
					<view>2</view>
				</view>
			</view>
		</view>
		<view class="items">
			<view class="item" @click="open('article')">
				<view>
					<uni-icons class="item-icon" type="person" size="14"></uni-icons>我的文章
				</view>
				<view>
					<uni-icons type="arrowright" size="14"></uni-icons>
				</view>
			</view>	
			<view class="item" @click="open('feedback')">
				<view>
					<uni-icons class="item-icon" type="help" size="14"></uni-icons>意见反馈
				</view>
				<view>
					<uni-icons type="arrowright" size="14"></uni-icons>
				</view>
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
			open(type) {
				switch (type) {
					case 'article':
						uni.navigateTo({
							url:'/pages/my-article/my-article'
						})
						break;
					case 'feedback':
						uni.navigateTo({
							url:'../feedback/feedback'
						})
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #F5F5F5;
	}
	.my-wrapper {
		display: flex;
		flex-direction: column;
		.header {
			display: flex;
			flex-direction: column;
			padding-top: 20px;
			position: relative;
			box-sizing: border-box;
			.back {
				background: url(../../static/image/follow-active.png) no-repeat;
				background-size:100% 100%;
				background-position: center;
				width: 100%;
				height: 100%;
				top: 0;
				right: 0;
				float: left;
				position: absolute;
				border: 1px solid blue;
				filter: blur(15px);
				// z-index: -1;
			}
			.intro {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.avatar {
					width: 60px;
					height: 60px;
					padding: 20px;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.desc {
					font-size: 20px;
					font-weight: bold;
				}
			}
			.info {
				margin-top: 5px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 2px 0px;
				.info-item {
					flex: 1;
					text-align: center;
					font-size: 14px;
					color: black;
				}
			}
		}
		
		.items {
			display: flex;
			flex-direction: column;
			margin-top: 10px;
			.item {
				padding: 10px 10px;
				margin-bottom: 10px;			
				background-color: #FFFFFF;
				font-size: 14px;
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				.item-icon {
					margin-right: 5px;
				}
			}
		}
		
	}
</style>
