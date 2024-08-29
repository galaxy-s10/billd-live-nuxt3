import axios, { Axios, AxiosRequestConfig } from 'axios';
import { isBrowser } from 'billd-utils';

import { PROD_AXIOS_BASEURL } from '@/constant';
import { useUserStore } from '@/stores/user';
import { getToken } from '@/utils/localStorage/user';

export interface MyAxiosPromise<T = any>
  extends Promise<{
    code: number;
    data: T;
    message: string;
  }> {}

interface MyAxiosInstance extends Axios {
  (config: AxiosRequestConfig): MyAxiosPromise;

  (url: string, config?: AxiosRequestConfig): MyAxiosPromise;
}

class MyAxios {
  // axios 实例
  instance: MyAxiosInstance;

  constructor(config: AxiosRequestConfig) {
    // @ts-ignore
    this.instance = axios.create(config);

    // 请求拦截器
    this.instance.interceptors.request.use(
      (cfg) => {
        if (window) {
          const token = getToken();
          if (token) {
            cfg.headers.Authorization = `Bearer ${token}`;
          }
        }
        return cfg;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        // console.log('response.config.url', response.config.url);
        // console.log('response.data', response.data);
        return response.data;
      },
      (error) => {
        console.log('响应拦截到错误', error);
        if (error.message.includes('timeout')) {
          console.error(error.message);
          window?.$message.error('请求超时，请重试');
          return;
        }
        if (!error.response) return;
        const statusCode = error.response.status as number;
        const errorResponse = error.response;
        const errorResponseData = errorResponse.data;
        const whiteList = ['400', '401', '403', '404', '500'];
        if (error.response) {
          if (!whiteList.includes(`${statusCode}`)) {
            window?.$message.error(error.message);
            return Promise.reject(error.message);
          }
          if (statusCode === 400) {
            console.error(errorResponseData.message);
            window?.$message.error(errorResponseData.message);
            return Promise.reject(errorResponseData);
          }
          if (statusCode === 401) {
            console.error(errorResponseData.message);
            window?.$message.error(errorResponseData.message);
            const userStore = useUserStore();
            userStore.logout();
            return Promise.reject(errorResponseData);
          }
          if (statusCode === 403) {
            console.error(errorResponseData.message);
            window?.$message.error(errorResponseData.message);
            return Promise.reject(errorResponseData);
          }
          if (statusCode === 404) {
            console.error(errorResponseData.message);
            window?.$message.error(errorResponseData.message);
            return Promise.reject(errorResponseData);
          }
          if (statusCode === 500) {
            console.error(errorResponseData.error);
            window?.$message.error(errorResponseData.error);
            return Promise.reject(errorResponseData);
          }
        } else {
          // 请求超时没有response
          console.error(error.message);
          window?.$message.error(error.message);
          return Promise.reject(error.message);
        }
      }
    );
  }

  get<T = any>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): MyAxiosPromise<T> {
    return this.instance.get(url, config);
  }

  post<T = any>(
    url: string,
    data?: {} | undefined,
    config?: AxiosRequestConfig
  ): MyAxiosPromise<T> {
    return this.instance.post(url, data, config);
  }

  put<T = any>(
    url: string,
    data?: {} | undefined,
    config?: AxiosRequestConfig
  ): MyAxiosPromise<T> {
    return this.instance.put(url, data, config);
  }
}

let baseURL = '/';
let env = 'prod'; // prod,beta,dev

if (process.env.NODE_ENV === 'development') {
  env = 'dev';
} else if (process.env.NODE_ENV === 'production') {
  env = 'prod';
} else {
  env = 'beta';
}

switch (env) {
  case 'prod':
    baseURL = PROD_AXIOS_BASEURL; // 调用线上的接口
    break;
  case 'dev':
    if (isBrowser()) {
      // baseURL = AXIOS_BASEURL; // 客户端运行的时候，调用本地的/api，让其代理到实际的url
      baseURL = '/prod-api'; // 客户端运行的时候，调用本地的/api，让其代理到实际的url
    } else {
      baseURL = 'http://live-api.hsslive.cn'; // 服务端运行的时候直接代理到实际的url
      // baseURL = 'http://localhost:4300'; // 服务端运行的时候直接代理到实际的url
    }
    break;
  case 'beta':
    baseURL = PROD_AXIOS_BASEURL; // 调用线上的接口
    break;
}

export default new MyAxios({
  baseURL,
  // baseURL: AXIOS_BASEURL,
  // baseURL: '/prodapi',
  timeout: 1000 * 5,
});
