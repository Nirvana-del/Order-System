<template>
	<div>
		<uni-list>
			<uni-list-item v-for="item in foodList" >
				<!-- 自定义 header -->
				<template v-slot:header>
					<view class="slot-box" @click="gotoDishesDetail(item)">
						<image class="slot-image" :src="item.picUrl"></image>
					</view>
				</template>
				<!-- 自定义 body -->
				<template v-slot:body>
					<view class="slot-right">
						<view class="title">
							{{item.dishesName}}
						</view>
						<view class="body">
							<view class="footer-price">
								￥{{item.totalAmount}}
							</view>
							<view class="footer-count">
								共
								<text class="totalCount">
									{{item.count}}
								</text>
								件
							</view>
						</view>
						<view class="time">
							下单时间：{{item.createTime}}
						</view>
					</view>
				</template>
				<!-- 自定义 footer-->
				<template v-slot:footer>
					<view class="footer-right">
						<view class="footer-title">
							待评价
						</view>

						<view class="footer-appraise">
							<uni-tag text="评价" type="success" @click="appraiseOrder(item)" />
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-popup ref="reply" type="bottom">
			<view class="pop">
				<uni-easyinput class="input" focus trim="all" v-model="comment" placeholder="请输入内容" @blur="hideKeyborad"
					@confirm="sendComment"></uni-easyinput>
			</view>
		</uni-popup>
	</div>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		getOrderDetailApi,
		addCommentApi,
		changeStatusApi
	} from '@/api/order/index.js'
	import {
		reactive,
		ref,
		toRefs
	} from "vue";
	const state = reactive({
		foodList: [],
		comment: '',
		currentItem: {}
	})
	const reply = ref()
	const {
		comment,
		foodList,
		currentItem
	} = toRefs(state)
	function gotoDishesDetail(row){
		console.log(row);
		uni.navigateTo({
			url: '/subpkg/dishes_detail/index?dishesId=' + row.dishesId
		})
	}
	async function sendComment() {
		console.log(comment.value);
		console.log(currentItem.value);
		const newObj = {
			dishesId: currentItem.value.dishesId,
			commentContent: comment.value
		}
		const res = await addCommentApi(newObj)
		comment.value = ''
		uni.hideKeyboard()
		reply.value.close()
		await changeStatusApi(currentItem.value.orderId)
	}

	function appraiseOrder(row) {
		reply.value.open('bottom')
		console.log(row);
		currentItem.value = row
	}
	async function getOrderDetail(id) {
		const res = await getOrderDetailApi(id)
		console.log(res);
		foodList.value = res.orderItemList.map(item => ({
			...item,
			createTime: item.createTime.slice(0, 10) + item.createTime.slice(11, 19)
		}))
	}
	onLoad((options) => {
		console.log(options);
		getOrderDetail(options.id)
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
		margin-top: 40rpx;
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