"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order_index = require("../../api/order/index.js");
const store_modules_user = require("../../store/modules/user.js");
require("../../utils/request.js");
require("../../api/user/index.js");
require("../../store/index.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_segmented_control2 + _easycom_uni_tag2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_tag + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      token
    } = store_modules_user.useUserStoreHook();
    const state = common_vendor.reactive({
      items: ["待支付", "待上餐", "已完成", "待评价"],
      current: 0,
      orderList: [],
      currId: ""
    });
    const {
      items,
      current,
      orderList,
      currId
    } = common_vendor.toRefs(state);
    const payRef = common_vendor.ref();
    async function gotoOrderDetail(row) {
      common_vendor.index.navigateTo({
        url: "/subpkg/order_detail/index?id=" + row.id
      });
    }
    async function getOrderByStatus(status = "待评价") {
      const res = await api_order_index.getOrderByStatusApi(status);
      console.log(res);
      orderList.value = res.orderList;
    }
    async function clickTab(e) {
      console.log(e.currentIndex);
      current.value = e.currentIndex;
      getOrderByStatus(items.value[e.currentIndex]);
    }
    async function payOrder() {
      await api_order_index.payOrderApi(currId.value);
      getOrderByStatus(items.value[current.value]);
    }
    async function cancelOrder(id) {
      console.log(id);
      await api_order_index.cancelOrderApi(id);
      getOrderByStatus(items.value[current.value]);
    }
    common_vendor.onLoad((options) => {
      if (!token) {
        common_vendor.index.navigateTo({
          url: "/pages/Login/index"
        });
      } else {
        current.value = Number(options.status);
        getOrderByStatus(items.value[Number(options.status)]);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(clickTab),
        b: common_vendor.p({
          current: common_vendor.unref(current),
          values: common_vendor.unref(items),
          ["style-type"]: "text",
          ["active-color"]: "#ffa200"
        }),
        c: common_vendor.f(common_vendor.unref(orderList), (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.id),
            b: common_vendor.o(($event) => gotoOrderDetail(item), item.id)
          }, common_vendor.unref(current) === 0 ? {
            c: common_vendor.o(($event) => cancelOrder(item.id), item.id),
            d: "3958fa02-3-" + i0 + "," + ("3958fa02-2-" + i0),
            e: common_vendor.p({
              text: "取消订单",
              type: "error"
            })
          } : {}, common_vendor.unref(current) === 1 || common_vendor.unref(current) === 2 ? {
            f: common_vendor.o(($event) => gotoOrderDetail(item), item.id),
            g: "3958fa02-4-" + i0 + "," + ("3958fa02-2-" + i0),
            h: common_vendor.p({
              text: "查看订单"
            })
          } : {}, common_vendor.unref(current) === 3 ? {
            i: common_vendor.o(($event) => gotoOrderDetail(item), item.id),
            j: "3958fa02-5-" + i0 + "," + ("3958fa02-2-" + i0),
            k: common_vendor.p({
              type: "primary",
              text: "去评价"
            })
          } : {}, {
            l: common_vendor.t(item.totalAmount),
            m: common_vendor.o(($event) => gotoOrderDetail(item), item.id),
            n: item.id,
            o: "3958fa02-2-" + i0 + ",3958fa02-1"
          });
        }),
        d: common_vendor.unref(current) === 0,
        e: common_vendor.unref(current) === 1 || common_vendor.unref(current) === 2,
        f: common_vendor.unref(current) === 3,
        g: common_vendor.o(payOrder),
        h: common_vendor.p({
          type: "danger",
          cancelText: "关闭",
          confirmText: "同意",
          title: "通知",
          content: "确认支付吗"
        }),
        i: common_vendor.sr(payRef, "3958fa02-6", {
          "k": "payRef"
        }),
        j: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/23877/Desktop/毕设/点餐小程序/order-system/pages/Order/index.vue"]]);
wx.createPage(MiniProgramPage);
