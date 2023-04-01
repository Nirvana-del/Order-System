import {
	request
} from "@/utils/request";
// 创建订单
export function createOrderApi(cartId) {
	return request({
		url: `/worder/order/createOrder`,
		method: 'post',
		data: {
			cartId
		}
	})
}
// 待评价    已完成   已取消   待支付  待上餐
// 买家根据订单状态获取订单
export function getOrderByStatusApi(status) {
	return request({
		url: `/worder/order/buyerGetOrder?status=${status}`,
		method: 'get'
	})
}
export function payOrderApi(id) {
	return request({
		url: `/worder/order/payOrder/${id}`,
		method: 'get'
	})
}
export function cancelOrderApi(id) {
	return request({
		url: `/worder/order/cancelOrder/${id}`,
		method: 'delete'
	})
}
export function scanCodeApi(code) {
	console.log(code);
	return request({
		url: `/worder/code/add/${code}`,
		method: 'post'
	})
}
// 获取菜品详情
export function getOrderDetailApi(orderId) {
	return request({
		url: `/worder/orderItem/getByOrderId/${orderId}`,
		method: 'get'
	})
}
// 添加评价
export function addCommentApi(obj) {
	const {
		dishesId,
		commentContent
	} = obj
	return request({
		url: `/worder/comment/addComment?dishesId=${dishesId}&commentContent=${commentContent}`,
		method: 'post'
	})
}
// 根据主键获取菜品详细信息
export function getDishesDetailApi(id) {
	return request({
		url: `/worder/dishes/getByprimaryKey/${id}`,
		method: 'get'
	})
}
// 根据主键获取菜品的评价
export function getDishesCommentsApi(dishesId) {
	return request({
		url: `/worder/comment/getAllComment/${dishesId}`,
		method: 'get'
	})
}
// 修改订单状态为已完成
export function changeStatusApi(orderId) {
	return request({
		url: `/worder/order/complated/${orderId}`,
		method: 'get'
	})
}