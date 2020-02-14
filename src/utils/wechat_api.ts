import axios, { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';

interface AxiosInstance {
  get(url: string, config?: AxiosRequestConfig): Promise<any>;

  post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;

  put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;

  delete(url: string, config?: AxiosRequestConfig): Promise<any>;

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
}

const request: AxiosInstance = axios.create({
  baseURL: 'https://api.weixin.qq.com',
  timeout: 10000,
});

request.interceptors.response.use(response => {
  return response.data;
});

const wechatApi = {
  auth: {
    async code2Session(code: string) {
      return await request.get(`/sns/jscode2session?appid=${config.appId}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`);
    },
  },
};

export default wechatApi;
