<template>
	<view>
		<!-- 轮播图的区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<!-- {{item}} -->
				<!-- <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id"> -->
				<image :src="item.picture"></image>
				<!-- </navigator> -->
			</swiper-item>
		</swiper>
		<button @click="scanCode">扫码点餐</button>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		reactive,
		ref,
		toRefs
	} from "vue";
	import {
		foodListApi,
		foodDetailApi,
		carouselApi
	} from '@/api/food/index.js'
	import {
		useUserStoreHook
	} from "../../store/modules/user";
	import {
		onLoad,
		onShow,

	} from "@dcloudio/uni-app"
	import {
		useBadgeHook
	} from '@/hooks/useBadge.js'
	import { scanCodeApi } from '@/api/order/index.js'
	const {
		getToken,
		token
	} = useUserStoreHook()
	const scanCode = () => {
		uni.scanCode({
			success: async function(res) {
				console.log(res);
				const response = await scanCodeApi(Number(res.result))
				console.log(response);
			}
		});
	}
	const state = reactive({
		title: '首页',
		swiperList: []
	})

	async function getFoodList() {
		const res = await foodListApi()
		console.log(res);
	}

	onShow(() => {
		console.log('token', token);
		if (!token) {
			uni.redirectTo({
				url: '/pages/Login/index'
			})
		} else {
			useBadgeHook()
			carouselApi().then(res => {
				console.log(res);
				state.swiperList = res.carouselList
			})
		}
	})
	const {
		title,
		swiperList
	} = toRefs(state);
</script>

<style lang="scss">

</style>