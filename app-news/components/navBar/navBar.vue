<template>
	<view>
		<view class="navbar">
			<!-- 状态栏占位，主要是微信小程序是有状态栏的 -->
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-content"  :class="{search: isSearch}" :style="{height: navBarHeight + 'px', width: navBarWidth + 'px'}"  @click.stop="openSearch()">
				<view v-if="isSearch"  class="narbar-search-icon-back" @click.stop="back()">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<view v-if="isSearch" class="navbar-search">
					<!-- 搜索页显示  -->
					<input class="navbar-search_text" type="text" placeholder="请输入您要搜索的内容" 
						v-model="val" 
						@input="inputChange"
					/>
				</view>
					
				<view v-if="!isSearch" class="navbar-search">
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
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			searchVal: {
				type: [String, Number],
				default: '12'
			},
			model: {
				prop: 'searchVal',
				event: 'change'
			}
		},
		data() {
			return {
				statusBarHeight: 20,
				navBarWidth: 375,
				navBarHeight: 45,
				val: ''
			}
		},
		watch:{
			searchVal(newVal){
				alert('hello world')
				this.val = newVal
			}
		},
		methods: {
			openSearch() {
				if (this.isSearch) {
					return;
				}
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			back() {
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			inputChange(e) {
				const {
					value
				} = e.detail
				this.$emit('input', value)
			}
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
		
			&.search {
				padding-left: 0;
				justify-content: left;
				.narbar-search-icon-back {
					margin-left: 10px;
					margin-right: 10px;
				}
				.navbar-search {
					border-radius: 5px;
				}
			}
		}
	
		
	}
</style>
