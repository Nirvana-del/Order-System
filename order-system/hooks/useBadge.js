import {
	onShow
} from "@dcloudio/uni-app"
import {
	computed,
	watch
} from 'vue'
// import {
// 	useCartStoreHook
// } from '../store/modules/cart'
import {
	useCart,
} from "./useCart"

const {
	totalCount,
	getCart
} = useCart()
export const useBadgeHook = () => {
	function setBadge() {
		uni.setTabBarBadge({
			index: 2,
			text: totalCount.value + ''
		})
	}
	watch(totalCount, () => {
		setBadge()
	})
	onShow(() => {
		getCart()
		setBadge()
	})
}