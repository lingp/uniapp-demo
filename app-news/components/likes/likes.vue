<template>
	<view class="icons-heart" @click="likeTap">
		<uni-icons size="20" color="#f07373" type="heart" :type="like?'heart-filled':'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				like: false
			};
		},
		watch: {
			item(newVal) {
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods: {
			likeTap() {
				this.like = !this.like
				this.setUpdateLikes()
				console.log('收藏成功');
			},
			setUpdateLikes() {
				uni.showLoading()
				this.$api.update_like({
					user_id: '60234e2bef338d00018925ae', // TODO
					article_id: this.item._id
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title:this.like?'收藏成功':'取消收藏',
						icon:'none'
					})
					console.log(res);
					
				}).catch(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	.icons-heart {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
</style>
