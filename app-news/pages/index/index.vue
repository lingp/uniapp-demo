<template>
	<view class="content">
		<navBar></navBar>
		<tab :list="tabList" @tab="tab" :tabIndex="tabIndex"></tab>
		<view class="home-list">
			<list :activeIndex="activeIndex" :tabList="tabList" @change="change"></list>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				tabList: [],
				activeIndex: 0,
				tabIndex: 0
			}
		},
		onLoad() {
			uni.$on('labelChange',(res)=>{
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
			this.getLabel()
		},
		methods: {
			tab({
				data,
				index
			}) {
				console.log(data, index);
				this.activeIndex = index;
			},
			getLabel() {
				// uniCloud.callFunction({
				// 	name: 'get_label'
				// }).then(res => {
				// 	console.log(res)
				// 	this.tabList = res.result.data
				// })
				this.$api.get_label().then((res) => {
					const {
						data
					} = res
					console.log('标签 ',data);
					data.unshift({
						name:'全部'
					})
					this.tabList = data
				})
			},
			change(current) {
				this.activeIndex = current;
				this.tabIndex = current
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex; // 这个很重要，只有这个页面才会scroll-view才能正常
	}
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
