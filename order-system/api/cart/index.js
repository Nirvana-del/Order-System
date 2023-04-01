import {
	request
} from "@/utils/request";

// 获取购物车的数据
export function getCartApi() {
	return request({
		url: '/worder/cart/getCart',
		method: 'get',
	})
}
// 添加商品至购物车
export function addToCartApi(dishesId) {
	return request({
		url: '/worder/cart/addCart',
		method: 'post',
		data:{
			dishesId,
			count: 1
		}
	})
}
// 更改购物车商品数量
export function changeCartApi(id, count) {
	return request({
		url: `/worder/cart/changeQuantity/${id}/${count}`,
		method: 'get'
	})
}
// 清空购物车
export function clearCartApi() {
	return request({
		url: `/worder/cart/clearCart`,
		method: 'delete'
	})
}
// 从购物车删除
export function removeFromCartApi(id) {
	return request({
		url: `/worder/cart/deleteCart/${id}`,
		method: 'delete'
	})
}
// 购物车详情
export function cartDetailApi(id) {
	return request({
		url: `/worder/cart/getByprimaryKey/${id}`,
		method: 'get'
	})
}