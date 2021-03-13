<template>
	<view>
		<view class="navbar">
			<!-- 状态栏占位，主要是微信小程序是有状态栏的 -->
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-content" :style="{height: navBarHeight + 'px', width: navBarWidth + 'px'}">
				<view class="navbar-search">
					<view class="narbar-search-icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="narbar-search-content">
						点击查询
					</view>
				</view>
			</view>
		</view>
		<!-- 因为navbar是绝对定位，需要搞一个占位的，把内容往下顶 -->
		<view :style="{height: statusBarHeight + navBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 20,
				navBarWidth: 375,
				navBarHeight: 45
			}
		},
		methods: {
			
		},
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync();
			console.log(info)
			// 设置状态高度，主要是用于占位，在H5是0
			this.statusBarHeight = info.statusBarHeight
			// 设置导航栏宽度为屏幕宽度
			this.navBarWidth = info.windowWidth
			
			// 微信小程序 有“胶囊” 需要特殊处理
			// #ifdef MP
				// 获取胶囊位置
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
				console.log(menuButtonInfo)
				
				// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
				this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight) * 1

				// 导航栏宽度
				this.navBarWidth = menuButtonInfo.left
			// #endif
		}
	}
</script>

<style lang="scss">
	.navbar {
		width: 100%;
		background-color: $app-base-color;
		position: fixed;
		top: 0;
		left: 0;			
		box-sizing: border-box;
		.navbar-content {
			padding: 0 10px;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			.navbar-search {
				border-radius: 30px;
				background-color: #FFFFFF;
				height: 30px;
				width: 100%;
				display: flex;
				align-items: center;
				padding: 0 5px;
				.narbar-search-icon {
					margin-right: 10px;
					box-sizing: border-box;
				}
				.narbar-search-content {
					width: 100%;
					font-size: 14px;
					color: #999;
				}
			}
		}
	}
</style>
