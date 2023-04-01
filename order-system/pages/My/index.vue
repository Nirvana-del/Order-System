<template>
	<view class="my-container">
		<!-- <my-login v-if="!token"></my-login> -->

		<my-userinfo></my-userinfo>
	</view>
</template>

<script setup>
	import {
		useUserStoreHook
	} from '../../store/modules/user'
	import {
		onShow
	} from "@dcloudio/uni-app"
	import {
		computed,
		ref
	} from "vue";
	import {
		useBadgeHook
	} from '@/hooks/useBadge.js'
	const {
		token
	} = useUserStoreHook()
	// const hasToken = ref(uni.getStorageSync('token'))
	onShow(() => {
		console.log('token', token);
		if (!token) {
			uni.navigateTo({
				url: '/pages/Login/index'
			})
		} else {
			useBadgeHook()
		}
	})
</script>

<style lang="scss">
	page,
	.my-container {
		height: 100%;
	}
</style>