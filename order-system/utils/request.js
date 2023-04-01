import {
	useUserStoreHook
} from "../store/modules/user";

const baseUrl = 'http://localhost:8080'; //服务器请求地址
// const baseUrl = 'http://10.33.36.231:8080'; //服务器请求地址
// const baseUrl = 'https://67q2782k94.yicp.fun'; //服务器请求地址

//封装 Promise组件
export function request(options) {
	const {
		token
	} = useUserStoreHook()
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url,
			data: options.data || {},
			method: options.method,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': token
			},
			success(res) {
				const data = res.data || res;
				//switch根据项目返回的code判断
				switch (data.code) {
					case '20000':
						resolve(JSON.stringify(data.data) === '{}' ? data : data.data);
						break;
					case '500':
						uni.showToast({
							title: data.message,
							icon: "none",
						});
						reject(false);
						break;
					case '400':
						uni.showToast({
							title: data.message,
							icon: "none",
						});
						//跳转到登录页面
						reject(false);
						break;
					default:
						reject(false);
						break;
				}
			},
			fail(res) {
				// 失败处理
				reject(res);
			}
		});
	});
}