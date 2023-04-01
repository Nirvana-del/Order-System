"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createPinia();
function setupStore(app) {
  app.use(store);
}
exports.setupStore = setupStore;
exports.store = store;
