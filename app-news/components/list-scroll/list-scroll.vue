<template>
	<scroll-view scroll-y="true"  class="list-scroll"
	:style="{height: scrollHeight + 'px'}" 
	@scrolltolower="loadmore"
	>
		<slot></slot>
	</scroll-view>	
</template>

<script>
	export default {
		props:{
			isFollow : {
				type: Boolean,
				default: false // 关注页面，因为有默认的标题栏，高度要自己减掉
			},
		},
		data() {
			return {
				scrollHeight: '',
				isMp: false, // 是否是小程序
			};
		},
		mounted() {
			this.$data.isMp = true
			let that = this;
			let scrollViewTop = 0
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			let screenHeight = info.screenHeight
						
			const query = uni.createSelectorQuery().in(this);
			query.select('.list-scroll').boundingClientRect(data => {
			  // console.log("得到布局位置信息" + JSON.stringify(data));
			  // console.log("节点离页面顶部的距离为" + data.top);
			  // 剪掉 节点离页面顶部的距离 + tabBar的高度（固定的，详见下面链接）
			  // https://uniapp.dcloud.io/frame?id=%E5%9B%BA%E5%AE%9A%E5%80%BC
			  let scrollHeight = screenHeight - data.top - 50
			  console.log('scrollHeight', scrollHeight)
			  if (this.isFollow)  {
				  scrollHeight = scrollHeight - 50; // 标题栏
			  }
			  that.$data.scrollHeight = scrollHeight
			}).exec();
		},
		methods: {
			loadmore(){
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}
</style>
