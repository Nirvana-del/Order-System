import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { LoginData, LoginResult } from './types';

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
  return request({
    url: '/worder/auth/login',
    method: 'post',
    params: data
  });
}

/**
 * 注销API
 */
export function logoutApi() {
  return request({
    url: '/worder/auth/logout',
    method: 'delete'
  });
}
