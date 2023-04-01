"use strict";
const utils_request = require("../../utils/request.js");
function foodListApi() {
  return utils_request.request({
    url: "/worder/dishes/getDishesList",
    method: "get"
  });
}
function carouselApi(id) {
  return utils_request.request({
    url: `/worder/carousel/getAllCarousel`,
    method: "get"
  });
}
exports.carouselApi = carouselApi;
exports.foodListApi = foodListApi;
