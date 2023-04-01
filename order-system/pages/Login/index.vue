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
		<uni-popup ref="registerForm" type="dialog">
			<uni-popup-dialog mode="input" title="注册信息" @confirm="submitRegister">
				<uni-forms ref="registForm" :rules="baseRules" :modelValue="registFormData">
					<uni-forms-item label="用户名" name="username" required>
						<uni-easyinput v-model="registFormData.username" placeholder="请输入用户名" />
					</uni-forms-item>
					<uni-forms-item label="昵称" name="nickname" required>
						<uni-easyinput v-model="registFormData.nickname" placeholder="请输入昵称" />
					</uni-forms-item>
					<uni-forms-item label="密码" name="password" required>
						<uni-easyinput type="password" v-model="registFormData.password" placeholder="请输入密码" />
					</uni-forms-item>
					<uni-forms-item label="确认密码" name="password_confirm" required>
						<uni-easyinput v-model="registFormData.password_confirm" placeholder="请再次输入密码" />
					</uni-forms-item>
					<uni-forms-item label="电话" name="mobile" required>
						<uni-easyinput type="password" v-model="registFormData.mobile" placeholder="请输入电话号码" />
					</uni-forms-item>

					<uni-forms-item label="性别" name="gender" required>
						<uni-data-select :localdata="range" v-model="registFormData.gender"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="头像">
						<button @click="chooseImg">选择头像</button>
					</uni-forms-item>
				</uni-forms>
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="message" type="message">
			<uni-popup-message type="success" message="上传成功" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="error_message" type="message">
			<uni-popup-message type="error" message="两次输入密码不一致" :duration="2000"></uni-popup-message>
		</uni-popup>
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
	import {
		onShow
	} from "@dcloudio/uni-app"
	import {
		registerUserApi
	} from '@/api/user/index.js'
	const {
		redirectInfo,
		updateRedirectInfo,
		updateUserInfo,
		userLogin,
		token
	} = useUserStoreHook()
	const registerForm = ref()
	const message = ref()
	const error_message = ref()
	const registForm = ref()
	const loginForm = ref()
	const customForm = ref()
	const state = reactive({
		userinfo: {
			username: 'test',
			password: '123456'
		},
		registFormData: {
			username: '',
			nickname: '',
			password: '',
			password_confirm: '',
			mobile: '',
			gender: '',
			avatar: ''
		},
		customRules: {
			username: {
				rules: [{
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
		},
		baseRules: {
			username: {
				rules: [{
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
			nickname: {
				rules: [{
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
			password_confirm: {
				rules: [{
					required: true,
					errorMessage: '请确认密码',
				}],
				validateTrigger: 'blur'
			},
			mobile: {
				rules: [{
					required: true,
					errorMessage: '请填写电话号码',
				}],
				validateTrigger: 'blur'
			},
			gender: {
				rules: [{
					required: true,
					errorMessage: '请填写性别',
				}],
				validateTrigger: 'blur'
			},
		}
	})
	const {
		userinfo,
		customRules,
		baseRules,
		registFormData
	} = toRefs(state)


	function chooseImg() {
		uni.chooseImage({
			count: 1,
			success: (res) => {
				console.log(res);
				const tempFilePaths = res.tempFilePaths;
				uni.uploadFile({
					url: 'http://localhost:8080/worder/files', //post请求的地址
					filePath: tempFilePaths[0],
					name: 'file',
					success: (uploadFileRes) => {
						console.log(uploadFileRes);
						var obj = JSON.parse(uploadFileRes.data);
						console.log(obj.data.url);
						registFormData.value.avatar = obj.data.url
						message.value.open()
					}
				})
			}

		})
	}

	const range = [{
			value: 0,
			text: '未知'
		},
		{
			value: 1,
			text: '男'
		},
		{
			value: 2,
			text: '女'
		},
	]




	async function submitRegister() {
		// console.log(registFormData.value);
		// registForm.value.validate().then(async (data) => {
		// console.log(data);
		console.log(registFormData.value);
		const {
			username,
			nickname,
			password,
			password_confirm,
			mobile,
			gender,
			avatar
		} = registFormData.value
		if (password !== password_confirm) {
			error_message.value.open()
		} else {
			registerForm.value.close()
			const newObj = {
				username,
				nickname,
				password,
				mobile,
				gender,
				avatar
			}
			console.log('去注册');
			const res = await registerUserApi(newObj)
			console.log(res);
		}
		// })
	}

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
		registerForm.value.open()
	}

	function gotoLogin() {
		loginForm.value.open()
	}
	onShow(() => {
		uni.hideHomeButton(); //隐藏home/返回主页按钮
		console.log('token', token);
		if (token !== '') {
			console.log('跳转到首页');
			uni.switchTab({
				url: '/pages/Home/index'
			})
		}
	})

	function navigateBack() {
		uni.switchTab({
			url: '/pages/Home/index',
			complete: () => {
				updateRedirectInfo(null)
			}
		})
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