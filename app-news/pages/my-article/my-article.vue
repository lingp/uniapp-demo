<template>
	<view class="list">
		<list-scroll >
			<list-card  v-for="(item, index) in list" :item="item" :key="item._id + index" mode="base"></list-card>
			<uni-load-more  iconType="snow"  :status="loading" ></uni-load-more>
		</list-scroll>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				loading: 'loading',
			}
		},
		onLoad() {
			this.get_follow()
		},
		methods: {
			get_follow() { // TODO，方法要重写，拿的应该是我的文章，先占位
				this.$api.get_follow().then((res) => {
					const {
						data
					} = res
					console.log(data)
					this.list = data
					this.loading = 'noMore'
				})
			},
		}
	}
</script>

<style>

</style>
