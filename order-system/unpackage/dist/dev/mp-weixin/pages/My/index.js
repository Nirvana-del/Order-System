"use strict";
const common_vendor = require("../../common/vendor.js");
const store_modules_user = require("../../store/modules/user.js");
const hooks_useBadge = require("../../hooks/useBadge.js");
require("../../api/user/index.js");
require("../../utils/request.js");
require("../../store/index.js");
require("../../hooks/useCart.js");
require("../../api/cart/index.js");
if (!Array) {
  const _easycom_my_userinfo2 = common_vendor.resolveComponent("my-userinfo");
  _easycom_my_userinfo2();
}
const _easycom_my_userinfo = () => "../../components/my-userinfo/my-userinfo.js";
if (!Math) {
  _easycom_my_userinfo();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      token
    } = store_modules_user.useUserStoreHook();
    common_vendor.onShow(() => {
      console.log("token", token);
      if (!token) {
        common_vendor.index.navigateTo({
          url: "/pages/Login/index"
        });
      } else {
        hooks_useBadge.useBadgeHook();
      }
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/23877/Desktop/毕设/点餐小程序/order-system/pages/My/index.vue"]]);
wx.createPage(MiniProgramPage);
