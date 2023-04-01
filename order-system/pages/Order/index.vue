<template>
	<view class="uni-padding-wrap uni-common-mt">
		<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#ffa200"
			@clickItem="clickTab" />
	</view>
	<view class="content">
		<uni-list>
			<uni-list-item v-for="item of orderList" :key="item.id">

				<template v-slot:body>
					<view :style="{
						display: 'flex',
						justifyContent: 'start',
						width: '100vw',
						alignItems: 'center'
					}">
						<view @click="gotoOrderDetail(item)">
							订单编号：{{item.id}}
						</view>
				
						<view :style="{
						display: 'flex',
						width: '50%',
						marginLeft: '40rpx',
						alignItems: 'center',
						justifyContent: 'space-between'
					}">
				<!-- 			<view>
								<uni-tag v-if="current===0" text="去支付" type="primary" @click="gotoPay(item.id)" />
							</view> -->
							<view>
								<uni-tag v-if="current===0" text="取消订单" type="error" @click="cancelOrder(item.id)" />
							</view>
							<view>
								<uni-tag v-if="(current===1) || (current===2)" text="查看订单" @click="gotoOrderDetail(item)" />
							</view>
							<view>
								<uni-tag v-if="current===3" type="primary" text="去评价" @click="gotoOrderDetail(item)" />
							</view>
						</view>
						<view @click="gotoOrderDetail(item)">
							￥{{item.totalAmount}}
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-popup ref="payRef" type="dialog">
			<uni-popup-dialog type="danger" cancelText="关闭" confirmText="同意" title="通知" content="确认支付吗"
				@confirm="payOrder"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		toRefs
	} from "vue";
	import {
		getOrderByStatusApi,
		payOrderApi,
		cancelOrderApi,
		getOrderDetailApi
	} from '@/api/order/index.js'
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app"
	import {
		useUserStoreHook
	} from '../../store/modules/user';
	const {
		token
	} = useUserStoreHook()
	const state = reactive({
		items: ['待支付', '待上餐', '已完成', '待评价'],
		current: 0,
		orderList: [],
		currId: ''
	})
	const {
		items,
		current,
		orderList,
		currId
	} = toRefs(state)
	const payRef = ref()
	function gotoPay(id){
		currId.value = id
		payRef.value.open()
	}
	async function gotoOrderDetail(row) {
		uni.navigateTo({
			url: '/subpkg/order_detail/index?id=' + row.id
		})
	}
	async function getOrderByStatus(status = '待评价') {
		const res = await getOrderByStatusApi(status)
		console.log(res);
		orderList.value = res.orderList
	}

	async function clickTab(e) {
		console.log(e.currentIndex);
		current.value = e.currentIndex
		getOrderByStatus(items.value[e.currentIndex])
	}
	async function payOrder() {
		await payOrderApi(currId.value)
		getOrderByStatus(items.value[current.value])
	}
	async function cancelOrder(id) {
		console.log(id);
		await cancelOrderApi(id)
		getOrderByStatus(items.value[current.value])
	}
	
	onLoad((options) => {
		if (!token) {
			uni.navigateTo({
				url: '/pages/Login/index'
			})
		}else{
			current.value = Number(options.status)
			getOrderByStatus(items.value[Number(options.status)])
		}
	})
</script>

<style>
</style>