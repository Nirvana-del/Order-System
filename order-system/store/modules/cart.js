import {
	defineStore
} from 'pinia'
import {
	computed,
	ref
} from "vue";
import {store} from '@/store';

export const useCartStore = defineStore('cart', () => {
	// 购物车
	const cart = ref(JSON.parse(uni.getStorageSync('cart') || '[]'))
	const cartTotalAmount = computed(() => {
		return cart.value.reduce((total, item) => total += item.goods_count, 0)
	})
	const checkedCount = computed(() => {
		return cart.value.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
	})
	const checkedGoodsAmount = computed(() => {
		return cart.value.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count *
			item.goods_price, 0).toFixed(2)
	})
	// 持久化购物车数据
	function saveToStorage() {
		uni.setStorageSync('cart', JSON.stringify(cart.value))
	},
	// 添加菜品至购物车
	function addToCart(goods) {
		const findResult = cart.value.find(x => x.goods_id === goods.goods_id)

		if (!findResult) {
			cart.value.push(goods)
		} else {
			findResult.goods_count++
		}
		saveToStorage()
	}
	// 更新购物车中商品的勾选状态
	function updateGoodsState(goods) {
		const findResult = cart.value.find(x => x.goods_id === goods.goods_id)

		if (findResult) {
			findResult.goods_state = goods.goods_state
			saveToStorage()
		}
	},
	// 更新商品的数量
	function updateGoodsCount(goods) {
		const findResult = cart.value.find(x => x.goods_id === goods.goods_id)

		if (findResult) {
			findResult.goods_count = goods.goods_count
			
			saveToStorage()
		}
	},
	// 根据 Id 删除对应的商品
	function removeGoodsById(goods_id) {
		cart.value = cart.value.filter(x => x.goods_id !== goods_id)

		saveToStorage()
	},
	// 更新购物车中所有商品的勾选状态
	function updateAllGoodsState(newState) {
		cart.value.forEach(x => x.goods_state = newState)
		
		saveToStorage()
	}
	
	return {
		cart,
		cartTotalAmount,
		checkedCount,
		checkedGoodsAmount,
		addToCart,
		updateGoodsState,
		updateGoodsCount,
		removeGoodsById,
		updateAllGoodsState
	}
})
// 非setup
export function useCartStoreHook() {
  return useCartStore(store);
}


