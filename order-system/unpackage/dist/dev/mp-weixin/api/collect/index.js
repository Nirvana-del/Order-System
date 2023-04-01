"use strict";
const utils_request = require("../../utils/request.js");
function getMyCollectApi() {
  return utils_request.request({
    url: "/worder/favorites",
    method: "get"
  });
}
function addCollectApi(dishesId) {
  return utils_request.request({
    url: `/worder/favorites?dishesId=${dishesId}`,
    method: "post"
  });
}
function removeCollectApi(id) {
  return utils_request.request({
    url: `/worder/favorites/${id}`,
    method: "delete"
  });
}
exports.addCollectApi = addCollectApi;
exports.getMyCollectApi = getMyCollectApi;
exports.removeCollectApi = removeCollectApi;
