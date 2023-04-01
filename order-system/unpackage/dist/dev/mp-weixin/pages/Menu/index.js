"use strict";
const common_vendor = require("../../common/vendor.js");
const store_modules_user = require("../../store/modules/user.js");
const api_food_index = require("../../api/food/index.js");
const hooks_useCart = require("../../hooks/useCart.js");
const hooks_useBadge = require("../../hooks/useBadge.js");
const api_collect_index = require("../../api/collect/index.js");
require("../../api/user/index.js");
require("../../utils/request.js");
require("../../store/index.js");
require("../../api/cart/index.js");
if (!Array) {
  const _easycom_uni_fav2 = common_vendor.resolveComponent("uni-fav");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_fav2 + _easycom_uni_icons2 + _easycom_uni_goods_nav2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_fav = () => "../../uni_modules/uni-fav/components/uni-fav/uni-fav.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_fav + _easycom_uni_icons + _easycom_uni_goods_nav + _easycom_uni_popup_message + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const messageRef = common_vendor.ref();
    const messageValue = common_vendor.ref("");
    const {
      getToken,
      token
    } = store_modules_user.useUserStoreHook();
    const {
      addToCart,
      totalCount
    } = hooks_useCart.useCart();
    async function addCollect(row) {
      const res = await api_collect_index.addCollectApi(row.dishes.id);
      console.log(res);
      messageValue.value = res.message;
      messageRef.value.open();
    }
    function gotoDishesDetail(row) {
      console.log(row);
      common_vendor.index.navigateTo({
        url: "/subpkg/dishes_detail/index?dishesId=" + row.dishes.id
      });
    }
    common_vendor.onShow(() => {
      console.log("token", token);
      if (!token) {
        common_vendor.index.redirectTo({
          url: "/pages/Login/index"
        });
      } else {
        hooks_useBadge.useBadgeHook();
        const sysInfo = common_vendor.index.getSystemInfoSync();
        wh.value = sysInfo.windowHeight - 50;
        getFoodList();
      }
    });
    function buttonClick() {
      console.log("button");
      common_vendor.index.switchTab({
        url: "/pages/Cart/index"
      });
    }
    const state = common_vendor.reactive({
      options: [{
        text: "已点",
        info: 0
      }],
      buttonGroup: [{
        text: "去结算",
        backgroundColor: "#ffa200",
        color: "#fff"
      }],
      // 当前设备可用的高度
      wh: 0,
      cateList: [],
      foodList: [],
      active: 0,
      scrollTop: 0
    });
    const {
      wh,
      cateList,
      foodList,
      active,
      scrollTop,
      options,
      buttonGroup
    } = common_vendor.toRefs(state);
    common_vendor.watchEffect(() => {
      options.value[0].info = totalCount.value;
    });
    async function getFoodList() {
      const res = await api_food_index.foodListApi();
      console.log(res.dishesList);
      const newArr = common_vendor.lodashExports.toPairsIn(common_vendor.lodashExports.groupBy(res.dishesList, "dishes.categoryName"));
      cateList.value = newArr;
      foodList.value = newArr[active.value][1];
    }
    function activeChanged(i) {
      active.value = i;
      foodList.value = cateList.value[i][1];
      scrollTop.value = scrollTop.value === 0 ? 1 : 0;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(cateList), (item, i, i0) => {
          return {
            a: common_vendor.t(item[0]),
            b: common_vendor.n(i === common_vendor.unref(active) ? "active" : ""),
            c: common_vendor.o(($event) => activeChanged(i), i),
            d: i
          };
        }),
        b: common_vendor.unref(wh) + "px",
        c: common_vendor.f(common_vendor.unref(foodList), (item2, i2, i0) => {
          return {
            a: item2.dishes.picUrl,
            b: common_vendor.t(item2.dishes.name),
            c: common_vendor.t(item2.dishes.sales),
            d: common_vendor.t(item2.dishes.originPrice),
            e: common_vendor.o(($event) => gotoDishesDetail(item2), i2),
            f: common_vendor.o(($event) => addCollect(item2), i2),
            g: "032bb581-0-" + i0,
            h: common_vendor.o(($event) => common_vendor.unref(addToCart)(item2.dishes.id), i2),
            i: "032bb581-1-" + i0,
            j: i2
          };
        }),
        d: common_vendor.p({
          checked: false
        }),
        e: common_vendor.p({
          type: "plus-filled",
          color: "#ffa200",
          size: "30"
        }),
        f: common_vendor.unref(wh) + "px",
        g: common_vendor.unref(scrollTop),
        h: common_vendor.o(buttonClick),
        i: common_vendor.p({
          fill: true,
          options: common_vendor.unref(options),
          buttonGroup: common_vendor.unref(buttonGroup)
        }),
        j: common_vendor.p({
          type: "warning",
          message: messageValue.value,
          duration: 2e3
        }),
        k: common_vendor.sr(messageRef, "032bb581-3", {
          "k": "messageRef"
        }),
        l: common_vendor.p({
          type: "message"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/23877/Desktop/毕设/点餐小程序/order-system/pages/Menu/index.vue"]]);
wx.createPage(MiniProgramPage);
