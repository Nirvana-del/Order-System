import request from '@/utils/request';
import {AxiosPromise} from 'axios';

/**
 *
 * @returns
 */
export function getCateListApi(): AxiosPromise<any> {
  return request({
    url: '/worder/category/getCategory',
    method: 'get'
  });
}

/**
 *
 * @returns
 */
export function addCateApi(name: any): AxiosPromise<any> {
  return request({
    url: '/worder/category/addCategory',
    method: 'post',
    params: {
      name
    }
  });
}

/**
 *
 * @returns
 */
export function removeCateApi(id: any): AxiosPromise<any> {
  return request({
    url: `/worder/category/deleteCategory/${id}`,
    method: 'delete'
  });
}

/**
 *
 * @returns
 */
export function editCateApi(id: any, name: any): AxiosPromise<any> {
  return request({
    url: `/worder/category/updateCategory`,
    method: 'put',
    params: {
      id,
      name
    }
  });
}

/**
 *
 * @returns
 */
export function addDishesApi(data: any): AxiosPromise<any> {
  const {name, categoryId, originPrice, picUrl} = data
  return request({
    url: `/worder/dishes/addDishes`,
    method: 'post',
    params: {
      name,
      categoryId,
      originPrice,
      picUrl
    }
  });
}

/**
 *
 * @returns
 */
export function removeDishesApi(id: any): AxiosPromise<any> {
  return request({
    url: `/worder/dishes/deleteDishes/${id}`,
    method: 'delete'
  });
}

/**
 *
 * @returns
 */
export function updateDishesApi(data: any): AxiosPromise<any> {
  const {id, name, categoryId, originPrice, picUrl} = data
  return request({
    url: `/worder/dishes/updateDishes`,
    method: 'put',
    params: {
      id,
      name,
      categoryId,
      originPrice,
      picUrl
    }
  });
}
/**
 *
 * @returns
 */
export function getDishesListApi(): AxiosPromise<any> {
  return request({
    url: `/worder/dishes/getDishesList`,
    method: 'get'
  });
}

/**
 *
 * @returns
 */
export function getDishesDetailApi(id: any): AxiosPromise<any> {
  return request({
    url: `/worder/dishes/getByprimaryKey/${id}`,
    method: 'get'
  });
}

/**
 *
 * @returns
 */
export function getDishesByStatusApi(id?: any): AxiosPromise<any> {
  const url = id ? `/worder/dishes/buyerGetByCategory/${id}` : `/worder/dishes/buyerGetByCategory`
  return request({
    url,
    method: 'get'
  });
}

