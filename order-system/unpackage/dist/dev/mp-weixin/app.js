"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/Login/index.js";
  "./pages/Home/index.js";
  "./pages/Menu/index.js";
  "./pages/Cart/index.js";
  "./pages/My/index.js";
  "./pages/Order/index.js";
  "./subpkg/order_detail/index.js";
  "./subpkg/dishes_detail/index.js";
  "./subpkg/my_collect/index.js";
}
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/23877/Desktop/毕设/点餐小程序/order-system/App.vue"]]);
common_vendor.index.$showMsg = function(title = "数据请求失败！", duration = 1500) {
  common_vendor.index.showToast({
    title,
    duration,
    icon: "none"
  });
};
function createApp() {
  const app = common_vendor.createSSRApp(App);
  store_index.setupStore(app);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
