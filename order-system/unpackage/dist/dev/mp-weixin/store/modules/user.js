"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user_index = require("../../api/user/index.js");
const store_index = require("../index.js");
const useUserStore = common_vendor.defineStore("user", () => {
  const token = common_vendor.ref(common_vendor.index.getStorageSync("token") || "");
  const userinfo = common_vendor.ref(JSON.parse(common_vendor.index.getStorageSync("userinfo") || "{}"));
  const redirectInfo = common_vendor.ref({});
  function getToken() {
    return common_vendor.index.getStorageSync("token") || "";
  }
  function updateUserInfo(newUserinfo) {
    userinfo.value = newUserinfo;
    saveUserInfoToStorage(newUserinfo);
  }
  function saveUserInfoToStorage(newUserinfo) {
    common_vendor.index.setStorageSync("userinfo", JSON.stringify(newUserinfo));
  }
  function updateToken(newToken) {
    token.value = newToken;
    saveTokenToStorage(newToken);
  }
  function saveTokenToStorage(newToken) {
    common_vendor.index.setStorageSync("token", newToken);
  }
  function updateRedirectInfo(info) {
    redirectInfo.value = info;
  }
  function userLogin(loginData) {
    console.log(loginData);
    return new Promise((resolve, reject) => {
      api_user_index.loginApi(loginData).then((response) => {
        console.log(response);
        const {
          tokenType,
          accessToken
        } = response;
        updateToken(tokenType + " " + accessToken);
        resolve();
        getUserInfo();
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }
  function getUserInfo() {
    return new Promise((resolve, reject) => {
      api_user_index.getUserInfoApi().then((response) => {
        console.log(response);
        const {
          avatar,
          nickname,
          userId
        } = response;
        const userObj = {
          avatar,
          nickname,
          userId
        };
        updateUserInfo(userObj);
        resolve(userObj);
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }
  return {
    token,
    userinfo,
    redirectInfo,
    updateUserInfo,
    updateToken,
    updateRedirectInfo,
    userLogin,
    getUserInfo,
    getToken
  };
});
function useUserStoreHook() {
  return useUserStore(store_index.store);
}
exports.useUserStoreHook = useUserStoreHook;
