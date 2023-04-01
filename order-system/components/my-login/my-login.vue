<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<text class="tips-text" @click="gotoReg">没有账号？去注册</text>
		<button type="primary" class="btn-login" @click="gotoLogin">一键登录</button>
		<uni-popup ref="loginForm" type="dialog">
			<uni-popup-dialog mode="input" title="登录信息" @confirm="submit">
				<uni-forms ref="customForm" :rules="customRules" :modelValue="userinfo">
					<uni-forms-item label="用户名" required name="username">
						<uni-easyinput v-model="userinfo.username" placeholder="请输入用户名" />
					</uni-forms-item>
					<uni-forms-item label="密码" required name="password">
						<uni-easyinput v-model="userinfo.password" placeholder="请输入密码" />
					</uni-forms-item>
					<button type="primary" @click="submit">提交</button>
				</uni-forms>
			</uni-popup-dialog>
		</uni-popup>

		<text class="tips-text">登录后尽享更多权益</text>
	</view>
</template>

<script setup>
	import {
		useUserStoreHook
	} from '../../store/modules/user';
	import {
		reactive,
		toRefs,
		ref
	} from "vue";
	const loginForm = ref()
	const customForm = ref()
	const state = reactive({
		userinfo: {
			username: 'admin',
			password: '123456'
		},
		customRules: {
			username: {
				rules: [
					{
						required: true,
						errorMessage: '请填写用户名',
					},
					// 对name字段进行长度验证
					{
						minLength: 3,
						maxLength: 5,
						errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符',
					}
				],
				validateTrigger: 'blur'
			},
			password: {
				rules: [{
					required: true,
					errorMessage: '请填写密码',
				}],
				validateTrigger: 'blur'
			},
		}
	})
	const {
		userinfo,
		customRules
	} = toRefs(state)
	const {
		redirectInfo,
		updateRedirectInfo,
		updateUserInfo,
		userLogin
	} = useUserStoreHook()

	function submit() {
		customForm.value.validate().then(async (data) => {
			console.log(data);
			await userLogin(data)
			loginForm.value.close()
			navigateBack()
		}).catch(err => {
			console.log(err);
		})
	}

	function gotoReg() {

	}

	function gotoLogin() {
		loginForm.value.open()
	}

	function navigateBack() {
		
		console.log('跳转');
		if (redirectInfo.value && redirectInfo.value.openType === 'switchTab') {
			uni.switchTab({
				url: redirectInfo.from,
				complete: () => {
					updateRedirectInfo(null)
				}
			})
		} else {
			uni.switchTab({
				url: '/pages/Home/index',
				complete: () => {
					updateRedirectInfo(null)
				}
			})
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		background-color: #F8F8F8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;

		&::after {
			content: ' ';
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: linear-gradient(90deg, #FE6035, #EF1224);
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>