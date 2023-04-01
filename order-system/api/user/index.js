import {
	request
} from "@/utils/request";
export function loginApi(loginData) {
	const {
		username,
		password
	} = loginData
	return request({
		url: '/worder/auth/login',
		method: 'post',
		data: {
			username,
			password
		}
	})
}

export function logoutApi() {
	return request({
		url: '/worder/auth/logout',
		method: 'delete'
	})
}
export function getUserInfoApi() {
	return request({
		url: '/worder/users/me',
		method: 'get'
	})
}
export function registerUserApi(data) {
	const {
		username,
		nickname,
		password,
		password_confirm,
		mobile,
		gender,
		avatar
	} = data
	return request({
		url: `/worder/users/registSeller?username=${username}&password=${password}&nickname=${nickname}&mobile=${mobile}&gender=${gender}&avatar=${avatar}`,
		method: 'post'
	})
}