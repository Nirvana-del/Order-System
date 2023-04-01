import {
	request
} from "@/utils/request";

// 获取我的收藏
export function getMyCollectApi() {
	return request({
		url: '/worder/favorites',
		method: 'get',
	})
}

// id				
// username				
// dishesId

// 添加收藏
export function addCollectApi(dishesId) {
	return request({
		url: `/worder/favorites?dishesId=${dishesId}`,
		method: 'post',
	})
}
// 删除收藏的菜品
export function removeCollectApi(id) {
	return request({
		url: `/worder/favorites/${id}`,
		method: 'delete',
	})
}