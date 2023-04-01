"use strict";
const common_vendor = require("../../common/vendor.js");
const api_food_index = require("../../api/food/index.js");
const store_modules_user = require("../../store/modules/user.js");
const hooks_useBadge = require("../../hooks/useBadge.js");
const api_order_index = require("../../api/order/index.js");
require("../../utils/request.js");
require("../../api/user/index.js");
require("../../store/index.js");
require("../../hooks/useCart.js");
require("../../api/cart/index.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      getToken,
      token
    } = store_modules_user.useUserStoreHook();
    const scanCode = () => {
      common_vendor.index.scanCode({
        success: async function(res) {
          console.log(res);
          const response = await api_order_index.scanCodeApi(Number(res.result));
          console.log(response);
        }
      });
    };
    const state = common_vendor.reactive({
      title: "首页",
      swiperList: []
    });
    common_vendor.onShow(() => {
      console.log("token", token);
      if (!token) {
        common_vendor.index.redirectTo({
          url: "/pages/Login/index"
        });
      } else {
        hooks_useBadge.useBadgeHook();
        api_food_index.carouselApi().then((res) => {
          console.log(res);
          state.swiperList = res.carouselList;
        });
      }
    });
    const {
      title,
      swiperList
    } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(swiperList), (item, i, i0) => {
          return {
            a: item.picture,
            b: i
          };
        }),
        b: common_vendor.o(scanCode)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/23877/Desktop/毕设/点餐小程序/order-system/pages/Home/index.vue"]]);
wx.createPage(MiniProgramPage);
