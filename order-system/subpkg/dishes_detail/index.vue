<template>
	<div>
		<image class="slot-image" :src="dishesDetail.picUrl"></image>
		<!-- 	<view class="comment">
			评价
		</view> -->
		<uni-section title="评价" type="line">
			<view>
				<uni-list>
					<uni-list-item v-for="item in comments" :title="item.nickName" :note="item.commentContent"
						:thumb="item.avatarUrl" thumb-size="lg" :rightText="item.commentCreateTime" />
				</uni-list>
			</view>
		</uni-section>
	</div>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		getDishesDetailApi,
		getDishesCommentsApi
	} from '@/api/order/index.js'
	import {
		reactive,
		toRefs
	} from 'vue'
	const state = reactive({
		dishesDetail: {},
		comments: []
	})
	const {
		dishesDetail,
		comments
	} = toRefs(state)
	async function getDishesDetail(id) {
		const res = await getDishesDetailApi(id)
		console.log(res);
		dishesDetail.value = res.dishes
		getDishesComments(res.dishes.id)
	}
	async function getDishesComments(id) {
		const res = await getDishesCommentsApi(id)
		if (res.comments !== null && res.comments.length !== 0) {
			comments.value = res.comments
		}
		console.log(comments.value);
	}
	onLoad((options) => {
		console.log(options);
		getDishesDetail(options.dishesId)
	})
</script>

<style>
</style>