<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item class="home-swiper-item" v-for="(item, index) in tabList" :key="index">
			<list-item :list="list[index]" :load="load[index]" @loadmore="loadmore"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		components: {
			listItem
		},
		props: {
			activeIndex: {
				type: Number,
				default: 0
			},
			tabList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				list: {},
				load: {} ,// 记录了 当前分类的 page，loading状态等
			};
		},
		watch: {
			tabList(newVal) {
				if (newVal.length === 0) return
				this.list = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		created() {
			// this.list = {}
			// this.load = {}
			this.getList(0) // TODO
		},
		methods: {
			loadmore() {
				console.log('loadMore')
				this.load[this.activeIndex].page++;
				this.getList(this.activeIndex)
			},
			change(e) {
				const {
					current
				} = e.detail
				this.$emit('change', current)
				
				// 当数据不存在 或者 长度是 0 的情况下，才去请求数据
				if (!this.list[current] || this.list[current].length === 0) {
					this.getList(current)
				}
			},
			getList(current) {
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				console.log('tabList', this.tabList)
				console.log('current', current)
				// TODO，不合理
				let name = this.tabList[current] && this.tabList[current].name ? this.tabList[current].name : '全部'
				
				this.$api.get_list({
					name: name,
					page: this.load[current].page
				}).then((res) => {
					const {
						data
					} = res;
					
					if (data.length === 0) {
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						
						this.$set(this.load, current, oldLoad)
						this.$forceUpdate()
						return
					}
					
					console.log('list', data)
					console.log('tab', this.tabList[current].name)
					let tmpList = this.list[current] || []
					tmpList.push(...data)					
					this.$set(this.list, current, tmpList)
					
				})
			},
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;

		.home-swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
