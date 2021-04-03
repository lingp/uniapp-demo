<template>
	<view @click="openDetail">
		<!-- 基础卡片 -->
		<view v-if="item.mode === 'base'" class="list-card-item">
			<view class="list-card-item-image">
				<image class="list-card-item-image-image" :src="item.cover[0]" mode="aspectFit"></image>
			</view>
			<view class="list-card-item-content">
				<view class="list-card-item-content-title">
					<text>
						{{item.title}}
					</text>
					<likes :item="item" :isIndex="isIndex"></likes>
				</view>
				<view class="list-card-item-content-desc">
					<view class="list-card-item-content-desc-icon">
						{{item.classify}}
					</view>
					<view class="list-card-item-content-desc-views">
						{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
		
		<!-- 多图卡片 -->
		<view v-if="item.mode === 'column'" class="list-card-item mode-column">
			<view class="list-card-item-content">
				<view class="list-card-item-content-title">
					<text>
						{{item.title}}
					</text>
					<likes :item="item" :isIndex="isIndex"></likes>
				</view>
				<view class="list-card-item-image">
					<view class="list-card-item-image-item" v-if="index < 3" v-for="(item,index) in item.cover" :key="index">
						<image class="list-card-item-image-image" :src="item" mode="aspectFit"></image>
					</view>
				</view>
				<view class="list-card-item-content-desc">
					<view class="list-card-item-content-desc-icon">
						{{item.classify}}
					</view>
					<view class="list-card-item-content-desc-views">
						{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
		
		<!-- 大图模式 -->
		<view v-if="item.mode === 'image'" class="list-card-item mode-big-img">
			<view class="list-card-item-image">
				<image class="list-card-item-image-image" :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="list-card-item-content">
				<view class="list-card-item-content-title">
					<text>
						<text>{{item.title}}</text>
					</text>
					<likes :item="item" :isIndex="isIndex"></likes>
				</view>
				
				<view class="list-card-item-content-desc">
					<view class="list-card-item-content-desc-icon">
						{{item.classify}}
					</view>
					<view class="list-card-item-content-desc-views">
						{{item.browse_count}}
					</view>
				</view>
			</view>
		</view>
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
			},
			mode: {
				type: String,
				default: 'base'
			},
			isIndex: { // 判断是否是在首页文章列表点击
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			};
		},
		methods: {
			openDetail() {
				const item = this.item
				this.$emit('click', item)
				const params = {
					_id:item._id,
					title:item.title,
					author:item.author,
					create_time:item.create_time,
					thumbs_up_count:item.thumbs_up_count,
					browse_count:item.browse_count
				}
				console.log('打开详情页面',params);
				// 传参注意长度
				uni.navigateTo({
					url:'/pages/detail/detail?params='+JSON.stringify(params)
				})
			}
		}
	}
</script>

<style lang="scss">
	.list-card-item {
		box-sizing: border-box;
		margin: 10px;
		padding: 10px;
		border-radius: 5px;
		display: flex;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		flex-shrink: 0;
		flex: 1;
		.list-card-item-image {
			flex-shrink: 0;
			height: 60px;
			width: 60px;
			border-radius: 5px;
			overflow: hidden;
			
			.list-card-item-image-image {
				width: 100%;
				height: 100%;
			}
		}

		.list-card-item-content {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			flex: 1;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;
			
			.list-card-item-content-title {
				// border: 1px solid blue;
				box-sizing: border-box;
				color: #333;
				font-weight: 400;
				line-height: 1.2;
				font-size: 14px;
				padding-right: 30px;
				margin-bottom: 5px;
				position: relative;
				
				text {
					overflow: hidden;
					word-break: break-word;
					text-overflow: -o-ellipsis-lastline;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;	
				}
			}

			.list-card-item-content-desc {
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				.list-card-item-content-desc-icon {
					text-align: center;
					padding: 0 5px;
					margin-right: 5px;
					border-radius: 15px;
					color: $app-base-color;
					border: 1px $app-base-color solid;
				}
				.list-card-item-content-desc-views {
					color: #999;
					line-height: 1.5;
				}
			}
		}
	
		&.mode-column {
			.list-card-item-content {
				width: 100%;
				padding-left: 0;
			}
			.list-card-item-image {
				display: flex;
				margin-top: 10px;
				width: 100%;
				height: 70px;
				.list-card-item-image-item {
					flex: 1;
					margin-left: 10px;
					width: 100%;
					border-radius: 5px;
					overflow: hidden;
					&:first-child {
						margin-left: 0;
					}
					
					.list-card-item-image-image {
						width: 100%;
						height: 100%;
					}
				}
				
				
			}
			.list-card-item-content-desc {
				margin-top: 10px;
			}
		}
	
		&.mode-big-img {
			flex-direction: column;
			
			.list-card-item-image {
				width: 100%;
				height: 100px;
			}
			.list-card-item-content {
				padding-left: 0;
				margin-top: 10px;
				
				.list-card-item-content-desc {
					display: flex;
					align-items: center;
					margin-top: 10px;
				}
			}
		}
	}
</style>
