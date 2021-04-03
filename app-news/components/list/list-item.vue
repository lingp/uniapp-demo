<template>
	<list-scroll @loadmore="loadmore">
		<list-card :isIndex="isIndex" v-for="(item, index) in list" :item="item" :key="item._id + index" mode="base"></list-card>
		<uni-load-more v-if="list.length === 0 || list.length > 7 || load.loading === 'noMore' " iconType="snow"  status="loading" :status="load.loading"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			list : {
				type: Array,
				default() {
					return []
				}
			},
			load: {
				type: Object,
				default () {
					return {
						loading: "loading"
					}
				}
			},
			isIndex: { // 判断是否是在首页文章列表点击
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			}
		},
		created() {
			console.log('isLoading', this.isLoading)
		},
		methods: {
			loadmore() {
				console.log('item')
				this.$emit('loadmore')
			}
		}
	}
</script>

<style>

</style>
