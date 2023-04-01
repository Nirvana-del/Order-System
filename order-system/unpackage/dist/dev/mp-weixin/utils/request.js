"use strict";
const common_vendor = require("../common/vendor.js");
const store_modules_user = require("../store/modules/user.js");
const baseUrl = "http://10.33.36.231:8080";
function request(options) {
  const {
    token
  } = store_modules_user.useUserStoreHook();
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + options.url,
      data: options.data || {},
      method: options.method,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": token
      },
      success(res) {
        const data = res.data || res;
        switch (data.code) {
          case "20000":
            resolve(JSON.stringify(data.data) === "{}" ? data : data.data);
            break;
          case "500":
            common_vendor.index.showToast({
              title: data.message,
              icon: "none"
            });
            reject(false);
            break;
          case "400":
            common_vendor.index.showToast({
              title: data.message,
              icon: "none"
            });
            reject(false);
            break;
          default:
            reject(false);
            break;
        }
      },
      fail(res) {
        reject(res);
      }
    });
  });
}
exports.request = request;
