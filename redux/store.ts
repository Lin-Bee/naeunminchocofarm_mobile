import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './count_slice';
import authSlice, { loginInfoSelector, loginAction, logoutAction } from './auth_slice';
import memberApi, { LoginData } from '../apis/member_api';
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
// import farmSlice from './bak_farm_slice';

// 스토어 생성
export const store = configureStore({
  reducer: {
    signup: signupSlice.reducer,
    auth: authSlice.reducer,
    // farm:farmSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

// 로그인 정보
export function useLoginInfo() {
  const loginInfo = useSelector(loginInfoSelector);
  return loginInfo;
}

export async function getAccessToken() {
  return await SecureStore.getItemAsync('accessToken') ?? "";
}

// 로그인 함수
export async function login(loginData: LoginData) {
  const res = await memberApi.login(loginData);

  // accessToken은 headers에서 가져오기
  const accessToken = res.headers['authorization'];
  const loginInfo = res.data;

  // SecureStore에 저장
  await SecureStore.setItemAsync('accessToken', accessToken);
  await SecureStore.setItemAsync('loginInfo', JSON.stringify(loginInfo));

  // Redux 스토어에 저장
  loginAction(store.dispatch, { accessToken, loginInfo });

  return loginInfo;
}

//로그아웃 함수
export async function logout() {
  // SecureStore 비우기
  await SecureStore.deleteItemAsync('accessToken');
  await SecureStore.deleteItemAsync('loginInfo');

  // Redux 스토어 초기화
  logoutAction(store.dispatch);
}

// 앱 시작 시 저장된 로그인 정보를 복구하는 함수
export async function loadLoginInfo() {
  const accessToken = await SecureStore.getItemAsync('accessToken');
  const loginInfoStr = await SecureStore.getItemAsync('loginInfo');

  if (accessToken && loginInfoStr) {
    const loginInfo = JSON.parse(loginInfoStr);

    loginAction(store.dispatch, { accessToken, loginInfo });
  }
}


