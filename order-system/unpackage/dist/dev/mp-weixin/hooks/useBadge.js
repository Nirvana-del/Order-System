"use strict";
const common_vendor = require("../common/vendor.js");
const hooks_useCart = require("./useCart.js");
const {
  totalCount,
  getCart
} = hooks_useCart.useCart();
const useBadgeHook = () => {
  function setBadge() {
    common_vendor.index.setTabBarBadge({
      index: 2,
      text: totalCount.value + ""
    });
  }
  common_vendor.watch(totalCount, () => {
    setBadge();
  });
  common_vendor.onShow(() => {
    getCart();
    setBadge();
  });
};
exports.useBadgeHook = useBadgeHook;
