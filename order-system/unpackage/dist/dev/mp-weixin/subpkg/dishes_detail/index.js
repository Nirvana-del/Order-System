"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order_index = require("../../api/order/index.js");
require("../../utils/request.js");
require("../../store/modules/user.js");
require("../../api/user/index.js");
require("../../store/index.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const state = common_vendor.reactive({
      dishesDetail: {},
      comments: []
    });
    const {
      dishesDetail,
      comments
    } = common_vendor.toRefs(state);
    async function getDishesDetail(id) {
      const res = await api_order_index.getDishesDetailApi(id);
      console.log(res);
      dishesDetail.value = res.dishes;
      getDishesComments(res.dishes.id);
    }
    async function getDishesComments(id) {
      const res = await api_order_index.getDishesCommentsApi(id);
      if (res.comments !== null && res.comments.length !== 0) {
        comments.value = res.comments;
      }
      console.log(comments.value);
    }
    common_vendor.onLoad((options) => {
      console.log(options);
      getDishesDetail(options.dishesId);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(dishesDetail).picUrl,
        b: common_vendor.f(common_vendor.unref(comments), (item, k0, i0) => {
          return {
            a: "15150988-2-" + i0 + ",15150988-1",
            b: common_vendor.p({
              title: item.nickName,
              note: item.commentContent,
              thumb: item.avatarUrl,
              ["thumb-size"]: "lg",
              rightText: item.commentCreateTime
            })
          };
        }),
        c: common_vendor.p({
          title: "评价",
          type: "line"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/23877/Desktop/毕设/点餐小程序/order-system/subpkg/dishes_detail/index.vue"]]);
wx.createPage(MiniProgramPage);
