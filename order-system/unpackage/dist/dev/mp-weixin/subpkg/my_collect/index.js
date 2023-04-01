"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../store/modules/user.js");
const api_collect_index = require("../../api/collect/index.js");
require("../../api/user/index.js");
require("../../utils/request.js");
require("../../store/index.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_tag2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const state = common_vendor.reactive({
      foodList: [],
      currentItem: {},
      checked: false
    });
    const {
      foodList,
      currentItem,
      checked
    } = common_vendor.toRefs(state);
    function gotoDishesDetail(row) {
      console.log(row);
      common_vendor.index.navigateTo({
        url: "/subpkg/dishes_detail/index?dishesId=" + row.id
      });
    }
    async function cancelCollect(row) {
      console.log(row);
      await api_collect_index.removeCollectApi(row.id);
      await getMyCollect();
    }
    async function getMyCollect(id) {
      const res = await api_collect_index.getMyCollectApi();
      console.log(res);
      foodList.value = res.dishesList;
    }
    common_vendor.onLoad((options) => {
      console.log(options);
      getMyCollect();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(foodList), (item, k0, i0) => {
          return {
            a: item.favorites.picUrl,
            b: common_vendor.o(($event) => gotoDishesDetail(item), item.id),
            c: common_vendor.t(item.favorites.name),
            d: common_vendor.t(item.favorites.originPrice),
            e: common_vendor.o(($event) => gotoDishesDetail(item), item.id),
            f: common_vendor.o(($event) => cancelCollect(item), item.id),
            g: "00bdbd19-2-" + i0 + "," + ("00bdbd19-1-" + i0),
            h: item.id,
            i: "00bdbd19-1-" + i0 + ",00bdbd19-0"
          };
        }),
        b: common_vendor.p({
          text: "取消收藏",
          type: "success"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/23877/Desktop/毕设/点餐小程序/order-system/subpkg/my_collect/index.vue"]]);
wx.createPage(MiniProgramPage);
