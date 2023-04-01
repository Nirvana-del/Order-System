"use strict";
const utils_request = require("../../utils/request.js");
function loginApi(loginData) {
  const {
    username,
    password
  } = loginData;
  return utils_request.request({
    url: "/worder/auth/login",
    method: "post",
    data: {
      username,
      password
    }
  });
}
function getUserInfoApi() {
  return utils_request.request({
    url: "/worder/users/me",
    method: "get"
  });
}
function registerUserApi(data) {
  const {
    username,
    nickname,
    password,
    password_confirm,
    mobile,
    gender,
    avatar
  } = data;
  return utils_request.request({
    url: `/worder/users/registSeller?username=${username}&password=${password}&nickname=${nickname}&mobile=${mobile}&gender=${gender}&avatar=${avatar}`,
    method: "post"
  });
}
exports.getUserInfoApi = getUserInfoApi;
exports.loginApi = loginApi;
exports.registerUserApi = registerUserApi;
