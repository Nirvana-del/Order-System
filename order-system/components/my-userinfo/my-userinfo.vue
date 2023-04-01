<template>
	<view class="my-userinfo-container">
		<!-- 头像和昵称区域 -->
		<view class="top-box">
			<image :src="state.avatar" class="avatar"></image>
			<view class="nickname">{{state.nickname}}</view>
		</view>

		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第1个面板 -->
			<view class="panel">
				<view class="panel-body">
					<!-- 					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view> -->
		<!-- 			<view class="panel-item" @click="gotoMyCollect">
						<text>14</text>
						<text>收藏的菜品</text>
					</view> -->
					<!-- 				<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view> -->
				</view>
			</view>

			<!-- 第2个面板 -->
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item" @click="goOrderList(0)">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待支付</text>
					</view>
					<view class="panel-item" @click="goOrderList(1)">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text>待上餐</text>
					</view>
					<view class="panel-item" @click="goOrderList(2)">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>已完成</text>
					</view>
					<view class="panel-item" @click="goOrderList(0)">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>

			<!-- 第3个面板 -->
			<view class="panel">
				<view class="panel-list-item" @click="gotoMyCollect">
					<text>我的收藏</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
<!-- 				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view> -->
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useUserStoreHook,
	} from '../../store/modules/user';
	import {
		onShow
	} from "@dcloudio/uni-app"
	import {
		nextTick,
		reactive
	} from "vue";
	const {
		userinfo,
		updateUserInfo,
		updateToken,
		getUserInfo
	} = useUserStoreHook()
	const state = reactive({
		avatar: '',
		nickname: ''
	})

	function gotoMyCollect() {
		uni.navigateTo({
			url: '/subpkg/my_collect/index'
		})
	}

	function goOrderList(flag) {
		uni.navigateTo({
			url: '/pages/Order/index?status=' + flag
		})
	}
	onShow(() => {
		getUserInfo().then(res => {
			console.log(res);
			const {
				avatar,
				nickname
			} = res
			state.avatar = avatar
			state.nickname = nickname
		})
	})
	async function logout() {
		const res = await uni.showModal({
			title: '提示',
			content: '确认退出登录吗？'
		}).catch(err => err)
		console.log(res);
		if (res && res.confirm) {
			updateUserInfo({})
			updateToken('')
			uni.redirectTo({
				url: '/pages/Login/index'
			})
		}
	}
</script>

<style lang="scss">
	.my-userinfo-container {
		height: 100%;
		background-color: #F4F4F4;

		.top-box {
			height: 400rpx;
			background-color: linear-gradient(to bottom, #DEF3F4, #F2F6F8);
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.avatar {
				width: 90px;
				height: 90px;
				border-radius: 45px;
				border: 2px solid #FFF;
				box-shadow: 0 1px 5px black;
			}

			.nickname {
				font-size: 16px;
				color: #000;
				font-weight: bold;
				margin-top: 10px;
			}
		}
	}

	.panel-list {
		padding: 0 10px;
		position: relative;
		top: -10px;

		.panel {
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;

			.panel-title {
				line-height: 45px;
				padding-left: 10px;
				font-size: 15px;
				border-bottom: 1px solid #F4F4F4;
			}

			.panel-body {
				display: flex;
				justify-content: space-around;

				.panel-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					padding: 10px 0;
					font-size: 13px;

					.icon {
						width: 35px;
						height: 35px;
					}
				}
			}
		}
	}

	.panel-list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
		padding: 0 10px;
		line-height: 45px;
	}
</style>