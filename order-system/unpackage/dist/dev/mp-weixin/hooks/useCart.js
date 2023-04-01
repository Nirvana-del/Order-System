"use strict";
const common_vendor = require("../common/vendor.js");
const api_cart_index = require("../api/cart/index.js");
const cart = common_vendor.ref({
  // 购物车下所有商品
  items: []
});
const useCart = () => {
  const totalCount = common_vendor.computed(() => {
    return cart.value.items.reduce((pre, item) => pre + item.count, 0);
  });
  const totalPrice = common_vendor.computed(() => {
    return cart.value.items.reduce((pre, item) => item.selected ? pre + item.dishes.originPrice * item.count : pre, 0);
  });
  async function getCart() {
    const res = await api_cart_index.getCartApi();
    console.log(res);
    cart.value.items = res.cartList.map((item) => ({
      ...item,
      selected: true
    }));
  }
  async function addToCart(dishesId) {
    try {
      await api_cart_index.addToCartApi(dishesId);
      common_vendor.index.$showMsg("添加至购物车成功！");
      getCart();
    } catch (err) {
      common_vendor.index.$showMsg(err.message);
    }
  }
  async function changeCart(id, count) {
    try {
      await api_cart_index.changeCartApi(id, count);
      getCart();
    } catch (err) {
      common_vendor.index.$showMsg(err.message);
    }
  }
  async function removeFromCart(id) {
    try {
      await removeFromCartApi(id);
      getCart();
    } catch (err) {
      common_vendor.index.$showMsg(err.message);
    }
  }
  async function cartDetail(id) {
    try {
      await cartDetailApi(id);
    } catch (err) {
      common_vendor.index.$showMsg(err.message);
    }
  }
  async function clearCart(id) {
    try {
      await api_cart_index.clearCartApi(id);
      getCart();
    } catch (err) {
      common_vendor.index.$showMsg(err.message);
    }
  }
  return {
    cart,
    getCart,
    addToCart,
    changeCart,
    removeFromCart,
    cartDetail,
    clearCart,
    totalCount,
    totalPrice
  };
};
exports.useCart = useCart;
