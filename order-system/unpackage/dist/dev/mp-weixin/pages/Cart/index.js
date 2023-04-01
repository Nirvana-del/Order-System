"use strict";
const common_vendor = require("../../common/vendor.js");
const store_modules_user = require("../../store/modules/user.js");
const hooks_useCart = require("../../hooks/useCart.js");
const hooks_useBadge = require("../../hooks/useBadge.js");
const api_order_index = require("../../api/order/index.js");
require("../../api/user/index.js");
require("../../utils/request.js");
require("../../store/index.js");
require("../../api/cart/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_number_box2 + _easycom_uni_goods_nav2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_number_box + _easycom_uni_goods_nav + _easycom_uni_popup_message + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const popup = common_vendor.ref();
    const {
      token
    } = store_modules_user.useUserStoreHook();
    const {
      cart,
      getCart,
      changeCart,
      removeFromCart,
      cartDetail,
      clearCart,
      totalPrice
    } = hooks_useCart.useCart();
    const state = common_vendor.reactive({
      // 当前设备可用的高度
      wh: 0,
      scrollTop: 0,
      options: [{
        // icon: 'cart',
        text: "总金额",
        info: 0
      }],
      buttonGroup: [
        {
          text: "清空购物车",
          backgroundColor: "linear-gradient(90deg, #FFCD1E, #FF8A18)",
          color: "#fff"
        },
        {
          text: "提交订单",
          backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
          color: "#fff"
        }
      ]
    });
    const {
      options,
      buttonGroup,
      wh
    } = common_vendor.toRefs(state);
    common_vendor.watchEffect(() => {
      options.value[0].info = "￥" + (totalPrice.value || 0);
    });
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
        getCart();
      }
    });
    async function buttonClick(e) {
      console.log(e);
      if (cart.value.items.filter((item) => item.selected).length === 0) {
        return popup.value.open();
      }
      if (e.index === 0) {
        const res = await common_vendor.index.showModal({
          title: "提示",
          content: "确认清空购物车吗？"
        }).catch((err) => err);
        if (res && res.confirm) {
          await clearCart();
        }
      } else if (e.index === 1) {
        const cartIds = [];
        cart.value.items.forEach((item) => {
          if (item.selected) {
            cartIds.push(item.id);
          }
        });
        const cartId = cartIds.join(",");
        console.log(cartId);
        const res = await api_order_index.createOrderApi(cartId);
        console.log(res);
        getCart();
      }
    }
    function changeItemStatus(item) {
      console.log(item);
      item.selected = !item.selected;
    }
    async function changeItemNum(row, currentAmount) {
      console.log(row);
      console.log(currentAmount);
      await changeCart(row.id, currentAmount);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(cart).items, (item, i, i0) => {
          return common_vendor.e({
            a: item.selected
          }, item.selected ? {
            b: "00579e02-0-" + i0,
            c: common_vendor.p({
              type: "checkbox-filled",
              size: "30"
            })
          } : {
            d: "00579e02-1-" + i0,
            e: common_vendor.p({
              type: "checkbox",
              size: "30"
            })
          }, {
            f: common_vendor.o(($event) => changeItemStatus(item), i),
            g: item.dishes.picUrl,
            h: common_vendor.t(item.dishes.name),
            i: common_vendor.t(item.dishes.originPrice),
            j: common_vendor.o((count) => changeItemNum(item, count), i),
            k: "00579e02-2-" + i0,
            l: common_vendor.o(($event) => item.count = $event, i),
            m: common_vendor.p({
              modelValue: item.count
            }),
            n: i
          });
        }),
        b: common_vendor.unref(wh) + "px",
        c: common_vendor.o(buttonClick),
        d: common_vendor.p({
          options: common_vendor.unref(options),
          buttonGroup: common_vendor.unref(buttonGroup)
        }),
        e: common_vendor.p({
          type: "warning",
          message: "请先选择菜品",
          duration: 2e3
        }),
        f: common_vendor.sr(popup, "00579e02-4", {
          "k": "popup"
        }),
        g: common_vendor.p({
          type: "message"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/23877/Desktop/毕设/点餐小程序/order-system/pages/Cart/index.vue"]]);
wx.createPage(MiniProgramPage);
