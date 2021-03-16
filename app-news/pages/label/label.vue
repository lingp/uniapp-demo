<template>
	<view class="label">
		<view class="label-content">
			<view class="label-content-header">
				<text>我的标签</text>
				<text class="label-edit" @click="editLabel()">{{isEdit?'完成':'编辑'}}</text>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view  v-if="!loading" class="label-content-detail">
				<view class="lable-content-detail-item" v-for="(item, index) in userLabels" :key="index">
					{{item.name}}
					<uni-icons v-if="isEdit" @click="del(index)" class="icons-close" type="clear" size="20" color="red"></uni-icons>
				</view>
				<view class="content-no-data" v-if="userLabels.length == 0 && !loading">
					当前没有数据
				</view>
			</view>
		</view>
		<view class="label-content">
			<view class="label-content-header">
				<text>标签推荐</text>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="!loading"  class="label-content-detail">
				<view @click="add(index)" class="lable-content-detail-item" v-for="(item, index) in labelList" :key="index">
					{{item.name}}
				</view>
				<view class="content-no-data" v-if="labelList.length == 0 && !loading">
					当前没有数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEdit: false,
				labelList: [],
				userLabels: [],
				loading: true
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			getLabel() {
				this.loading = true
				this.$api.get_label({
					type: 'all'
				}).then((res) => {
					const {
						data
					} = res
					this.userLabels = data.filter(item => item.current)
					this.labelList = data.filter(item => !item.current)
					this.loading = false
				})
			},
			editLabel() {
				if (this.isEdit) {
					this.isEdit = false
					this.setUpdateLable(this.userLabels)
				} else {
					this.isEdit = true
				}
			},
			add(index) {
				if (!this.isEdit) {
					return;
				}
				this.userLabels.push(this.labelList[index])
				this.labelList.splice(index, 1)
			},
			del(index) {
				this.labelList.push(this.labelList[index])
				this.userLabels.splice(index, 1)
			},
			setUpdateLable(label) {
				let newArrIds = []
				label.forEach(item => {
					newArrIds.push(item._id)
				})
				uni.showLoading()
				this.$api.update_label({
					label: newArrIds
				}).then((res) => {
					uni.hideLoading()
					uni.showToast({
						title: '更新成功',
						icon: 'none'
					})
					uni.$emit('labelChange')
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		background-color: #f5f5f5;
	}

	.label {
		display: flex;
		flex: 1;
		flex-direction: column;

		.label-content {
			display: flex;
			background-color: #FFFFFF;
			flex-direction: column;
			margin-bottom: 10px;
			flex: 1;

			.label-content-header {
				display: flex;
				justify-content: space-between;
				padding: 10px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px solid #f5f5f5;

				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content-detail {
				display: flex;
				flex-wrap: wrap;
				padding: 0 15px 15px 15px;

				.lable-content-detail-item {
					font-size: 14px;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 19px;
					border: 1px #666 solid;
					color: #666;
					border-radius: 5px;
					position: relative;

					.icons-close {
						position: absolute;
						top: -8px;
						right: -8px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
		}
	}
	
	.content-no-data {
		text-align: center;
		width: 100%;
		padding: 50px 0;
		color: #999;
		font-size: 14px;
	}
</style>
