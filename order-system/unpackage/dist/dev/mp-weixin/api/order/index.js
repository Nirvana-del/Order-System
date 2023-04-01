"use strict";
const utils_request = require("../../utils/request.js");
function createOrderApi(cartId) {
  return utils_request.request({
    url: `/worder/order/createOrder`,
    method: "post",
    data: {
      cartId
    }
  });
}
function getOrderByStatusApi(status) {
  return utils_request.request({
    url: `/worder/order/buyerGetOrder?status=${status}`,
    method: "get"
  });
}
function payOrderApi(id) {
  return utils_request.request({
    url: `/worder/order/payOrder/${id}`,
    method: "get"
  });
}
function cancelOrderApi(id) {
  return utils_request.request({
    url: `/worder/order/cancelOrder/${id}`,
    method: "delete"
  });
}
function scanCodeApi(code) {
  console.log(code);
  return utils_request.request({
    url: `/worder/code/add/${code}`,
    method: "post"
  });
}
function getOrderDetailApi(orderId) {
  return utils_request.request({
    url: `/worder/orderItem/getByOrderId/${orderId}`,
    method: "get"
  });
}
function addCommentApi(obj) {
  const {
    dishesId,
    commentContent
  } = obj;
  return utils_request.request({
    url: `/worder/comment/addComment?dishesId=${dishesId}&commentContent=${commentContent}`,
    method: "post"
  });
}
function getDishesDetailApi(id) {
  return utils_request.request({
    url: `/worder/dishes/getByprimaryKey/${id}`,
    method: "get"
  });
}
function getDishesCommentsApi(dishesId) {
  return utils_request.request({
    url: `/worder/comment/getAllComment/${dishesId}`,
    method: "get"
  });
}
function changeStatusApi(orderId) {
  return utils_request.request({
    url: `/worder/order/complated/${orderId}`,
    method: "get"
  });
}
exports.addCommentApi = addCommentApi;
exports.cancelOrderApi = cancelOrderApi;
exports.changeStatusApi = changeStatusApi;
exports.createOrderApi = createOrderApi;
exports.getDishesCommentsApi = getDishesCommentsApi;
exports.getDishesDetailApi = getDishesDetailApi;
exports.getOrderByStatusApi = getOrderByStatusApi;
exports.getOrderDetailApi = getOrderDetailApi;
exports.payOrderApi = payOrderApi;
exports.scanCodeApi = scanCodeApi;
