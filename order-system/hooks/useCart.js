import {
	addToCartApi,
	changeCartApi,
	clearCartApi,
	getCartApi
} from '@/api/cart/index.js'
import {
	computed,
	ref
} from 'vue';
const cart = ref({
	// 购物车下所有商品
	items: []
})
export const useCart = () => {
	const totalCount = computed(() => {
		return cart.value.items.reduce((pre, item) => pre + item.count, 0)
	})
	const totalPrice = computed(() => {
		return cart.value.items.reduce((pre, item) => item.selected ? (pre + item.dishes.originPrice * item.count) : pre, 0);
	})
	async function getCart() {
		const res = await getCartApi();
		console.log(res)
		cart.value.items = res.cartList.map(item => ({
			...item,
			selected: true
		}))
	}
	async function addToCart(dishesId) {
		try {
			await addToCartApi(dishesId)
			uni.$showMsg('添加至购物车成功！')
			getCart()
		} catch (err) {
			uni.$showMsg(err.message)
		}
	}

	async function changeCart(id, count) {
		try {
			await changeCartApi(id, count)
			// ElMessage.success('添加至购物车成功！')
			getCart()
		} catch (err) {
			uni.$showMsg(err.message)
		}
	}
	async function removeFromCart(id) {
		try {
			await removeFromCartApi(id)
			// ElMessage.success('添加至购物车成功！')
			getCart()
		} catch (err) {
			uni.$showMsg(err.message)
		}
	}
	async function cartDetail(id) {
		try {
			await cartDetailApi(id)
		} catch (err) {
			uni.$showMsg(err.message)
		}
	}
	async function clearCart(id) {
		try {
			await clearCartApi(id)
			getCart()
		} catch (err) {
			uni.$showMsg(err.message)
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
	}
}