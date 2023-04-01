"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order_index = require("../../api/order/index.js");
require("../../utils/request.js");
require("../../store/modules/user.js");
require("../../api/user/index.js");
require("../../store/index.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_tag2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_easyinput2 + _easycom_uni_popup2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_easyinput + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const state = common_vendor.reactive({
      foodList: [],
      comment: "",
      currentItem: {}
    });
    const reply = common_vendor.ref();
    const {
      comment,
      foodList,
      currentItem
    } = common_vendor.toRefs(state);
    function gotoDishesDetail(row) {
      console.log(row);
      common_vendor.index.navigateTo({
        url: "/subpkg/dishes_detail/index?dishesId=" + row.dishesId
      });
    }
    async function sendComment() {
      console.log(comment.value);
      console.log(currentItem.value);
      const newObj = {
        dishesId: currentItem.value.dishesId,
        commentContent: comment.value
      };
      await api_order_index.addCommentApi(newObj);
      comment.value = "";
      common_vendor.index.hideKeyboard();
      reply.value.close();
      await api_order_index.changeStatusApi(currentItem.value.orderId);
    }
    function appraiseOrder(row) {
      reply.value.open("bottom");
      console.log(row);
      currentItem.value = row;
    }
    async function getOrderDetail(id) {
      const res = await api_order_index.getOrderDetailApi(id);
      console.log(res);
      foodList.value = res.orderItemList.map((item) => ({
        ...item,
        createTime: item.createTime.slice(0, 10) + item.createTime.slice(11, 19)
      }));
    }
    common_vendor.onLoad((options) => {
      console.log(options);
      getOrderDetail(options.id);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(foodList), (item, k0, i0) => {
          return {
            a: item.picUrl,
            b: common_vendor.o(($event) => gotoDishesDetail(item)),
            c: common_vendor.t(item.dishesName),
            d: common_vendor.t(item.totalAmount),
            e: common_vendor.t(item.count),
            f: common_vendor.t(item.createTime),
            g: common_vendor.o(($event) => appraiseOrder(item)),
            h: "3a1a7e64-2-" + i0 + "," + ("3a1a7e64-1-" + i0),
            i: "3a1a7e64-1-" + i0 + ",3a1a7e64-0"
          };
        }),
        b: common_vendor.p({
          text: "评价",
          type: "success"
        }),
        c: common_vendor.o(_ctx.hideKeyborad),
        d: common_vendor.o(sendComment),
        e: common_vendor.o(($event) => common_vendor.isRef(comment) ? comment.value = $event : null),
        f: common_vendor.p({
          focus: true,
          trim: "all",
          placeholder: "请输入内容",
          modelValue: common_vendor.unref(comment)
        }),
        g: common_vendor.sr(reply, "3a1a7e64-3", {
          "k": "reply"
        }),
        h: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/23877/Desktop/毕设/点餐小程序/order-system/subpkg/order_detail/index.vue"]]);
wx.createPage(MiniProgramPage);
