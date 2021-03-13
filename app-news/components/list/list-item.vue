<template>
	<list-scroll @loadmore="loadmore">
		<list-card v-for="(item, index) in list" :item="item" :key="item._id + index" mode="base"></list-card>
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
