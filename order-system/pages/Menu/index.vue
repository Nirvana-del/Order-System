<template>
	<view class="goods-detail-container">
		<!-- 使用自定义的搜索组件 -->
		<!-- <my-search :bgcolor="'pink'" :radius="3"></my-search> -->
		<view class="scroll-view-container">
			<!-- 左侧的滑动区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item, i) in cateList" :key="i">
					<view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">
						{{item[0]}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧的滑动区域 -->
			<scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, i2) in foodList" :key="i2">
					<!-- 二级分类的标题 -->
					<!-- <view class="cate-lv2-title">/ {{item2.cat_name}} /</view> -->
					<!-- 当前二级分类下的三级分类列表 -->
					<!-- <view class="cate-lv3-list"> -->
					<view class="cate-lv2-item">
						<view class="item-left" @click="gotoDishesDetail(item2)">
							<view class="item-left-pic">
								<image :src="item2.dishes.picUrl">
								</image>
							</view>
							<view class="item-left-label">
								<text class="item-right-title">{{item2.dishes.name}}</text>
								<text class="item-right-amount">销量：{{item2.dishes.sales}}</text>
								<text class="item-right-price">￥{{item2.dishes.originPrice}}</text>
							</view>

						</view>
						<view class="item-right" :style="{
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center'
						}">
							<uni-fav :checked="false" @click="addCollect(item2)" />
							<uni-icons type="plus-filled" color="#ffa200" size="30"
								@click="addToCart(item2.dishes.id)"></uni-icons>
						</view>
						<!-- </view> -->
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 商品导航组件区域 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @buttonClick="buttonClick" />
		</view>
	</view>
	<uni-popup ref="messageRef" type="message">
		<uni-popup-message type="warning" :message="messageValue" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script setup>
	import {
		computed,
		onMounted,
		reactive,
		toRefs,
		watchEffect,
		ref
	} from "vue";
	import {
		getCateListApi
	} from "@/api/category"
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app"
	import {
		foodListApi
	} from "../../api/food";
	import {
		useUserStoreHook
	} from "../../store/modules/user";
	import {
		groupBy,
		toPairsIn
	} from 'lodash'
	import {
		useCart
	} from "../../hooks/useCart";
	import {
		useBadgeHook
	} from '@/hooks/useBadge.js'
	import {
		addCollectApi
	} from '@/api/collect/index.js'
	const messageRef = ref()
	const messageValue = ref('')
	const {
		getToken,
		token
	} = useUserStoreHook()
	const {
		addToCart,
		totalCount
	} = useCart()
	async function addCollect(row) {
		const res = await addCollectApi(row.dishes.id)
		console.log(res);
		messageValue.value = res.message
		messageRef.value.open()
	}

	function gotoDishesDetail(row) {
		console.log(row);
		uni.navigateTo({
			url: '/subpkg/dishes_detail/index?dishesId=' + row.dishes.id
		})
	}
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
			getFoodList()
		}
	})

	function buttonClick() {
		console.log('button');
		uni.switchTab({
			url: '/pages/Cart/index'
		})
	}
	const state = reactive({
		options: [{
			text: '已点',
			info: 0
		}],
		buttonGroup: [{
			text: '去结算',
			backgroundColor: '#ffa200',
			color: '#fff'
		}],
		// 当前设备可用的高度
		wh: 0,
		cateList: [],
		foodList: [],
		active: 0,
		scrollTop: 0
	})

	const {
		wh,
		cateList,
		foodList,
		active,
		scrollTop,
		options,
		buttonGroup
	} = toRefs(state)
	watchEffect(() => {
		options.value[0].info = totalCount.value
	})
	// 获取分类列表的数据
	async function getFoodList() {
		const res = await foodListApi()
		console.log(res.dishesList);
		const newArr = toPairsIn(groupBy(res.dishesList, "dishes.categoryName"))
		// foodList.value = res.dishesList
		cateList.value = newArr
		foodList.value = newArr[active.value][1]
	}

	function activeChanged(i) {
		active.value = i
		foodList.value = cateList.value[i][1]
		scrollTop.value = scrollTop.value === 0 ? 1 : 0
	}
</script>

<style lang="scss">
	.goods-detail-container {
		padding-bottom: 50px;
	}

	.goods_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				background-color: #F7F7F7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #FFFFFF;
					position: relative;

					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #ffa200;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
		}
	}

	.cate-lv2 {
		display: flex;
		flex-direction: column;
		justify-content: center;

		.cate-lv2-item {
			display: flex;
			justify-content: space-between;
			align-items: center;

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
			}

			image {
				width: 48px;
				height: 48px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>