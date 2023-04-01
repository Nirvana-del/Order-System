"use strict";
const utils_request = require("../../utils/request.js");
function getCartApi() {
  return utils_request.request({
    url: "/worder/cart/getCart",
    method: "get"
  });
}
function addToCartApi(dishesId) {
  return utils_request.request({
    url: "/worder/cart/addCart",
    method: "post",
    data: {
      dishesId,
      count: 1
    }
  });
}
function changeCartApi(id, count) {
  return utils_request.request({
    url: `/worder/cart/changeQuantity/${id}/${count}`,
    method: "get"
  });
}
function clearCartApi() {
  return utils_request.request({
    url: `/worder/cart/clearCart`,
    method: "delete"
  });
}
exports.addToCartApi = addToCartApi;
exports.changeCartApi = changeCartApi;
exports.clearCartApi = clearCartApi;
exports.getCartApi = getCartApi;
