<template>
	<view class="search">
		<navBar :isSearch="true"  v-model="searchVal" @input="change"></navBar>
		<view class="content">
			<view class="content-box" v-if="isHistory">
				<view class="content-header">
					<text class="content-header-title">搜索历史</text>
					<text class="content-header-clear" @click="clear()">清除</text>
				</view> 
				<view class="content-label" v-if="historyLists.length > 0">
					<view class="content-lable-item" v-for="(item, index) in historyLists" 
						:key="index" @click="openHistory(item)">
						{{item.name}}
					</view>
				</view>
				<view class="content-no-data" v-else>
					没有搜索历史
				</view>
			</view>
			
			<view class="content-list">
				<list-scroll class="list-scroll" v-if="!isHistory" >
					<uni-load-more v-if="isLoading" status="loading" iconType="snow"></uni-load-more>
					<view v-if="searchList.length > 0">
						<list-card @click.native="setHistory()"  :item="item" v-for="item in searchList" :key="item._id"></list-card>
					</view>
					<view class="content-no-data" v-if="searchList.length == 0 && !isLoading">
						没有搜索到相关数据
					</view>
					
				</list-scroll>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				searchVal: '',
				searchList: [],
				isLoading: false,
				isHistory: true,
			}
		},
		computed: {
			...mapState(['historyLists'])
		},
		methods: {
			change(value) {
				if (!value) {
					clearTimeout(this.timer)
					this.mark = false
					this.search(value)
					return
				}
				if (!this.mark) {
					this.mark = true
					this.timer = setTimeout(() => {
						this.mark = false
						this.search(value)
					}, 1000)
				}
			},
			search(value) {
				if (!value) {
					this.searchList = []
					this.isHistory = true
					return
				}
				
				this.isHistory = false
				this.isLoading = true
			
				this.$api.get_search({
					value,
				}).then(res => {
					const {
						data
					} = res
					this.isLoading = false
					this.searchList = data					
				}).catch(()=> {
					this.isLoading = false
				})
				
			},
			setHistory() {
				console.log("searchVal", this.searchVal)
				this.$store.dispatch('set_history', {
					name: this.searchVal
				})
			},
			openHistory(item) {
				this.searchVal = item.name
				this.search(this.searchVal)
			},
			clear() {
				this.$store.dispatch('clearHistory')
				uni.showToast({
					title: '清空完成'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}

	.search {
		display: flex;
		flex-direction: column;
		flex: 1;
			
		.content {
			display: flex;
			flex-direction: column;
			flex: 1;
			width: 100%;
			.content-box {
				background-color: #fff;
				.content-header {
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					color: #666;
					padding: 10px 15px;
					border-bottom: 1px #f5f5f5 solid;
					.content-header-title {
						color: $app-base-color;
					}
					.content-header-clear {
						color: #30b33a;
						font-weight: bold;
					}
				}
						
				.content-label {
					display: flex;
					flex-wrap: wrap;
					padding: 0 15px 15px 15px;
					.content-lable-item {
						border: 1px red solid;
						padding: 2px 10px;
						margin-top: 12px;
						margin-right: 10px;
						border-radius: 5px;
						border: 1px #666 solid;
						font-size: 14px;
						color: #666;
					}
				}
			}
			
			
			.content-list {
				background-color: #fff;
				
			}
		}
	
		
		.content-no-data {
			background-color: #fff;
			width: 100%;
			text-align: center;
			height: 200px;
			line-height: 200px;
			font-size: 12px;
			color: #666;
		}
	}
</style>
