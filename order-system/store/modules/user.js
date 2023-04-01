import {
	defineStore
} from 'pinia'
import {
	ref
} from "vue";
import {
	loginApi,
	getUserInfoApi
} from '@/api/user';
import {
	store
} from '@/store';

export const useUserStore = defineStore('user', () => {
	const token = ref(uni.getStorageSync('token') || '') // 目前非持久化
	const userinfo = ref(JSON.parse(uni.getStorageSync('userinfo') || '{}'))
	// 重定向的 Object 对象
	const redirectInfo = ref({})

	function getToken() {
		return uni.getStorageSync('token') || ''
	}

	function updateUserInfo(newUserinfo) {
		userinfo.value = newUserinfo
		saveUserInfoToStorage(newUserinfo)
	}

	function saveUserInfoToStorage(newUserinfo) {
		uni.setStorageSync('userinfo', JSON.stringify(newUserinfo))
	}

	function updateToken(newToken) {
		token.value = newToken
		saveTokenToStorage(newToken)
	}

	function saveTokenToStorage(newToken) {
		uni.setStorageSync('token', newToken)
	}

	function updateRedirectInfo(info) {
		redirectInfo.value = info
	}

	/**
	 * 登录
	 * @param {Object} loginData
	 */
	function userLogin(loginData) {
		console.log(loginData);
		return new Promise((resolve, reject) => {
			loginApi(loginData)
				.then(response => {
					console.log(response);
					const {
						tokenType,
						accessToken
					} = response;
					updateToken(tokenType + ' ' +
						accessToken) // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
					resolve();
					getUserInfo()
				})
				.catch(error => {
					console.log(error);
					reject(error);
				});
		});
	}
	/**
	 * 获取用户信息
	 */
	function getUserInfo() {
		return new Promise((resolve, reject) => {
			getUserInfoApi()
				.then(response => {
					console.log(response);
					const {
						avatar,
						nickname,
						userId
					} = response
					const userObj = {
						avatar,
						nickname,
						userId
					}
					updateUserInfo(userObj)
					resolve(userObj);
				})
				.catch(error => {
					console.log(error);
					reject(error);
				});
		});
	}
	return {
		token,
		userinfo,
		redirectInfo,
		updateUserInfo,
		updateToken,
		updateRedirectInfo,
		userLogin,
		getUserInfo,
		getToken
	}
})

// 非setup
export function useUserStoreHook() {
	return useUserStore(store);
}