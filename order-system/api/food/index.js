
import {request} from "@/utils/request";
export  function foodListApi(){ 
	return request({
		url:'/worder/dishes/getDishesList',
		method: 'get'
	})
}
export  function foodDetailApi(id){ 
	return request({
		url:`/worder/dishes/getByprimaryKey/${id}`,
		method: 'get'
	})
}
export  function foodListByCateApi(id){ 
	return request({
		url:`/worder/dishes/buyerGetByCategory/${id}`,
		method: 'delete'
	})
}
export  function carouselApi(id){ 
	return request({
		url:`/worder/carousel/getAllCarousel`,
		method: 'get'
	})
}