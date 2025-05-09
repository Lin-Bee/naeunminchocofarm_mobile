import axios, { InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { apiHost } from '~/lib/app_config';

export const axiosInstance = axios.create({
  baseURL: Platform.OS === 'ios' ? 'http://localhost:8081' : 'http://10.0.2.2:8081'
  // baseURL: Platform.OS === 'ios' ? apiHost : apiHost,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    // 헤더가 없을 경우 초기화
    config.headers = config.headers ?? {};

    // 서버가 app인지 web인지 구분하기 위한 코드
    // config.headers['clientType'] = 'app';

    // accessToken 가져오기
    const token: string | null = await SecureStore.getItemAsync('accessToken');

    // 요청 시 요청헤더에 토큰을 담아서 서버에 전달
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

