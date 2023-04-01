"use strict";
const common_vendor = require("../../common/vendor.js");
const store_modules_user = require("../../store/modules/user.js");
require("../../api/user/index.js");
require("../../utils/request.js");
require("../../store/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "my-userinfo",
  setup(__props) {
    const {
      userinfo,
      updateUserInfo,
      updateToken,
      getUserInfo
    } = store_modules_user.useUserStoreHook();
    const state = common_vendor.reactive({
      avatar: "",
      nickname: ""
    });
    function gotoMyCollect() {
      common_vendor.index.navigateTo({
        url: "/subpkg/my_collect/index"
      });
    }
    function goOrderList(flag) {
      common_vendor.index.navigateTo({
        url: "/pages/Order/index?status=" + flag
      });
    }
    common_vendor.onShow(() => {
      getUserInfo().then((res) => {
        console.log(res);
        const {
          avatar,
          nickname
        } = res;
        state.avatar = avatar;
        state.nickname = nickname;
      });
    });
    async function logout() {
      const res = await common_vendor.index.showModal({
        title: "提示",
        content: "确认退出登录吗？"
      }).catch((err) => err);
      console.log(res);
      if (res && res.confirm) {
        updateUserInfo({});
        updateToken("");
        common_vendor.index.redirectTo({
          url: "/pages/Login/index"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: state.avatar,
        b: common_vendor.t(state.nickname),
        c: common_vendor.o(($event) => goOrderList(0)),
        d: common_vendor.o(($event) => goOrderList(1)),
        e: common_vendor.o(($event) => goOrderList(2)),
        f: common_vendor.o(($event) => goOrderList(0)),
        g: common_vendor.p({
          type: "arrowright",
          size: "15"
        }),
        h: common_vendor.o(gotoMyCollect),
        i: common_vendor.p({
          type: "arrowright",
          size: "15"
        }),
        j: common_vendor.o(logout)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/23877/Desktop/毕设/点餐小程序/order-system/components/my-userinfo/my-userinfo.vue"]]);
wx.createComponent(Component);
