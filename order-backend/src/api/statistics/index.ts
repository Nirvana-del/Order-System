import request from '@/utils/request';
import { AxiosPromise } from 'axios';

/**
 * 获取首页数据
 */
export function getStatisticApi(): AxiosPromise<any> {
  return request({
    url: '/worder/sellerStats',
    method: 'get'
  });
}
