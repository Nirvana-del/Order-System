<template>
	<view class="scroll-view-container">
		<!-- 左侧的滑动区域 -->
		<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
			<block v-for="(item, i) in cart.items" :key="i">
				<view class="cart-item">
					<view class="item-left">
						<view class="item-left-pic">
							<view class="item-left-checkbox" @click="changeItemStatus(item)">
								<uni-icons v-if="item.selected" type="checkbox-filled" size="30"></uni-icons>
								<uni-icons v-else type="checkbox" size="30"></uni-icons>
							</view>
							<image :src="item.dishes.picUrl">
							</image>
						</view>
						<view class="item-left-label">
							<text class="item-right-title">{{item.dishes.name}}</text>
							<text class="item-right-price">￥{{item.dishes.originPrice}}</text>
						</view>
					</view>
					<view class="item-right">
						<uni-number-box v-model="item.count" @change="(count) => changeItemNum(item, count)" />
					</view>
					<!-- </view> -->
				</view>
			</block>
		</scroll-view>
		<!-- 商品导航组件区域 -->
		<view class="goods_nav">
			<uni-goods-nav :options="options" :buttonGroup="buttonGroup" @buttonClick="buttonClick" />
		</view>
		<uni-popup ref="popup" type="message">
			<uni-popup-message type="warning" message="请先选择菜品" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		computed,
		reactive,
		ref,
		toRefs,
		watch,
		watchEffect
	} from "vue";
	import {
		loginApi
	} from "@/api/user/index.js";
	import {
		getCartApi
	} from "@/api/cart/index.js";
	import {
		onShow
	} from "@dcloudio/uni-app"
	import {
		useUserStoreHook
	} from "../../store/modules/user";
	import {
		useCart
	} from "../../hooks/useCart";
	import {
		useBadgeHook
	} from '@/hooks/useBadge.js'
	const popup = ref()
	const {
		token
	} = useUserStoreHook()
	const {
		cart,
		getCart,
		changeCart,
		removeFromCart,
		cartDetail,
		clearCart,
		totalPrice
	} = useCart()
	import {
		createOrderApi
	} from '@/api/order/index.js'
	const state = reactive({
		// 当前设备可用的高度
		wh: 0,
		scrollTop: 0,
		options: [{
			// icon: 'cart',
			text: '总金额',
			info: 0
		}],
		buttonGroup: [{
				text: '清空购物车',
				backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
				color: '#fff',
			},
			{
				text: '提交订单',
				backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
				color: '#fff'
			}
		],
	})
	const {
		options,
		buttonGroup,
		wh
	} = toRefs(state)
	watchEffect(() => {
		options.value[0].info = '￥' + (totalPrice.value || 0)
	})
	onShow(() => {
		console.log('token', token);
		if (!token) {
			uni.redirectTo({
				url: '/pages/Login/index'
			})
		} else {
			useBadgeHook()
			const sysInfo = uni.getSystemInfoSync()
			wh.value = sysInfo.windowHeight - 50
			getCart()
		}
	})
	async function buttonClick(e) {
		console.log(e);
		if (cart.value.items.filter(item => item.selected).length === 0) {
			return popup.value.open()
		}
		if (e.index === 0) {
			const res = await uni.showModal({
				title: '提示',
				content: '确认清空购物车吗？'
			}).catch(err => err)
			if (res && res.confirm) {
				await clearCart()
			}
		} else if (e.index === 1) {
			// createOrderApi()
			const cartIds = []
			cart.value.items.forEach(item => {
				if (item.selected) {
					cartIds.push(item.id)
				}
			})
			const cartId = cartIds.join(',')
			console.log(cartId);
			const res = await createOrderApi(cartId)
			console.log(res);
			getCart()
		}
	}

	function changeItemStatus(item) {
		console.log(item);
		item.selected = !item.selected
	}

	async function changeItemNum(row, currentAmount) {
		console.log(row);
		console.log(currentAmount);
		await changeCart(row.id, currentAmount)
	}
</script>

<style lang="scss">
	.goods_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.cart-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 5px;

		.item-left {
			display: flex;
			justify-content: center;
			align-items: flex-start;

			&-label {
				display: flex;
				flex-direction: column;
				margin-left: 5px;
				align-items: start;
			}

			&-pic {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		image {
			width: 48px;
			height: 48px;
		}

		text {
			font-size: 12px;
		}
	}
</style>