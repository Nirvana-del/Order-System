import {request} from "@/utils/request";

  // 获取分类列表的数据
export  function getCateListApi(){ 
	return request({
		url:'/worder/category/getCategory',
		method: 'get',
	})
}