<template>
	<view class="tab">
		<scroll-view scroll-x="true" class="tab-scroll">
			<view class="tab-scroll-item" v-for="(item,index) in list"
			:key="index" 
			:class="{active:activeIndex === index}"
			@click="clickTab(item, index)"
			>{{item.name}}</view>
		</scroll-view>
		<view class="tab-icons" @click="open">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default() {
					return []
				},
			},
			tabIndex: {
				type: Number,
				default: 0
			}
		},
		watch: {
			tabIndex(newVal) {
				this.activeIndex = newVal
			}
		},
		data() {
			return {
				activeIndex: 0
			}
		},
		methods: {
			clickTab(item, index) {
				this.activeIndex = index
				this.$emit('tab', {
					data: item,
					index
				})
			},
			open() {
				uni.navigateTo({
					url: '/pages/label/label'
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		display: flex;
		box-sizing: border-box;
		border-bottom: 1px solid #F5F5F5;
		// flex: 1;
		width: 100%;
		height: 45px;
		line-height: 45px;
		color: #333;
		font-size: 14px;

		.tab-scroll {
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			width: 100%;
			white-space: nowrap; // 横向滚动的时候一定要有

			.tab-scroll-item {
				display: inline-block;
				padding: 0 15px;
				text-align: center;
				&.active {
					color: $app-base-color;
				}
			}
		}

		.tab-icons {
			position: relative;
			width: 45px;
			text-align: center;
			&::after {
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
	}
</style>
