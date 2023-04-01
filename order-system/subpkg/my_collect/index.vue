<template>
	<div>
		<uni-list>
			<uni-list-item v-for="item in foodList" :key="item.id">
				<!-- 自定义 header -->
				<template v-slot:header>
					<view class="slot-box" @click="gotoDishesDetail(item)">
						<image class="slot-image" :src="item.favorites.picUrl"></image>
					</view>
				</template>
				<!-- 自定义 body -->
				<template v-slot:body>
					<view class="slot-right" @click="gotoDishesDetail(item)">
						<view class="title">
							{{item.favorites.name}}
						</view>
						<view class="body">
						￥{{item.favorites.originPrice}}
						</view>
					</view>
				</template>
				<!-- 自定义 footer-->
				<template v-slot:footer>
					<view class="footer-right">
						<view class="footer-appraise">
							<uni-tag text="取消收藏" type="success" @click="cancelCollect(item)" />
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</div>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		changeStatusApi
	} from '@/api/order/index.js'
	import {
		getMyCollectApi,
		removeCollectApi
	} from '@/api/collect/index.js'
	import {
		reactive,
		ref,
		toRefs
	} from "vue";
	const state = reactive({
		foodList: [],
		currentItem: {},
		checked: false
	})
	const {
		foodList,
		currentItem,
		checked
	} = toRefs(state)

	function gotoDishesDetail(row) {
		console.log(row);
		uni.navigateTo({
			url: '/subpkg/dishes_detail/index?dishesId=' + row.id
		})
	}
	async function cancelCollect(row) {
		console.log(row);
		await removeCollectApi(row.id)
		await getMyCollect()
		// currentItem.value = row
	}
	async function getMyCollect(id) {
		const res = await getMyCollectApi(id)
		console.log(res);
		foodList.value = res.dishesList
	}
	onLoad((options) => {
		console.log(options);
		getMyCollect()
	})
</script>

<style>
	.footer-right {
		display: flex;
		flex-direction: column;
		font-size: 30rpx;
		overflow: hidden;
	}

	.footer-title {
		font-style: italic;
		font-size: 30rpx;
	}

	.footer-price {
		font-size: 40rpx;
		font-weight: bold;
	}

	.body {
		display: flex;
		justify-content: start;
		align-items: center;
	}

	.footer-count {
		margin-left: 20rpx;
	}

	.footer-appraise {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}

	.totalCount {
		font-weight: bold;
	}

	.slot-image {
		width: 70px;
		height: 70px;
	}

	.slot-right {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.title {}

	.time {
		margin-top: 20rpx;
		font-size: 30rpx;
	}
</style>