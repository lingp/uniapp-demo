<template>
	<view class="follow-wrap">
		<view class="tab">
			<view class="tab-item" :class="{active : tabItem === 'article' ? true : false}" @click="clickTab('article')">文章</view>
			<view class="tab-item" :class="{active : tabItem === 'author' ? true : false}" @click="clickTab('author')">作者</view>
		</view>
		<view class="list" >
			<swiper class="list-swiper" :current="tabItem === 'article' ? 0 : 1">
				<swiper-item>
					<list-scroll :isFollow="true">
						<list-card  v-for="(item, index) in followList" :item="item" :key="item._id + index" mode="base"></list-card>
						<uni-load-more  iconType="snow"  :status="loading" ></uni-load-more>
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<view class="author-list">
						<view class="author-item" v-for="(item, index) in followAuthorList" :key="item._id">
							<view class="portrait">
								<image :src="item.avatar" aspectFit ></image>
							</view>
							<view class="info">
								<view class="name">{{item.author_name}}</view>
								<view class="intro">
									<view class="desc">
										{{item.professional}}
									</view>
									<view class="other">
										<view>
											发帖 2
										</view>
										<view>
											粉丝 {{item.fans_count}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabItem: 'article',
				followList: [],
				loading: 'loading',
				followAuthorList: []
			}
		},
		onLoad() {
			let _this = this
			uni.$on('set_update_like', function() {
				console.log('follow', 'set_update_like')
				_this.get_follow()
			})
			this.get_follow()
			this.get_follow_author()
		},
		methods: {
			clickTab(tabItem) {
				this.tabItem = tabItem
			},
			get_follow() {
				this.$api.get_follow().then((res) => {
					const {
						data
					} = res
					console.log(data)
					this.followList = data
					this.loading = 'noMore'
				})
			},
			get_follow_author(){
				this.$api.get_follow_author().then((res) => {
					const {
						data
					} = res
					console.log('followAuthorList', data)
					this.followAuthorList = data
					this.loading = 'noMore'
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex; // 这个很重要，只有这个页面才会scroll-view才能正常
	}

	.follow-wrap {
		display: flex;
		flex: 1;
		padding: 0px 15px;
		flex-direction: column;

		.tab {
			border: 2px solid $app-base-color;
			display: flex;
			border-radius: 5px;
			height: 30px;
			font-size: 12x;

			// box-sizing: border-box;
			.tab-item {
				// border: 1px solid red;
				flex: 1;
				text-align: center;
				line-height: 2;
				height: 100%;

				&:first-child {
					border-right: 2px solid $app-base-color;
				}

				&.active {
					color: $app-base-color;
				}
			}

		}
	
		.list {
			flex: 1;
			box-sizing: border-box;
			overflow: hidden;
			border-top: 1px solid #F5F5F5;
			margin-top: 10px;
			padding: 10px 0px;
			.list-swiper {
				height: 100%;
				.author-list {
					height: 100%;
					display: flex;
					flex-direction: column;
					.author-item {
						// flex: 1;
						padding: 10px 0;
						display: flex;
						height: 50px;
						// box-sizing: border-box;
						border-bottom: 1px solid #F5F5F5;
						.portrait {
							width: 40px;
							height: 40px;
							image {
								width: 100%;
								height: 100%;
							}
						}
						.info {
							flex: 1;
							box-sizing: border-box;
							display: flex;
							font-size: 14px;
							flex-direction: column;
							margin-left: 10px;
							.name {
								font-size: 14px;
								font-weight: bold;
								margin-bottom: 5px;
							}
							.intro {
								display: flex;
								justify-content: space-between;
								justify-items: center;
								font-size: 12px;
								color: #a6a6a6;
								.other {
									display: flex;
									&>:first-child {
										margin-right: 10px;
									}
								}
							}
							
						}
					}
				}
			}
		}
		
	}
</style>
