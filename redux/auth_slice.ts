import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import * as SecureStore from 'expo-secure-store';

// 로그인 정보 타입 정의
export interface LoginInfo {
  id: number;
  roleName: string;
  roleFlag: string;
  email: string;
  tell: string;
  loginId: string;
  name: string;
}

// 상태 타입
interface AuthState {
  accessToken: string | null;
  loginInfo: LoginInfo | null;
}

// SecureStore 키 상수
const ACCESS_TOKEN_KEY = 'accessToken';
const LOGIN_INFO_KEY = 'loginInfo';

// 토큰 저장
async function _setAccessToken(token: string) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

// 토큰 조회
async function _getAccessToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

// 토큰 삭제
async function _deleteAccessToken() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}

// 로그인 정보 저장
async function _setLoginInfo(loginInfo: LoginInfo) {
  await SecureStore.setItemAsync(LOGIN_INFO_KEY, JSON.stringify(loginInfo));
}

// 로그인 정보 조회
async function _getLoginInfo(): Promise<LoginInfo | null> {
  try {
    const stored = await SecureStore.getItemAsync(LOGIN_INFO_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    await _deleteLoginInfo();
    return null;
  }
}

// 로그인 정보 삭제
async function _deleteLoginInfo() {
  await SecureStore.deleteItemAsync(LOGIN_INFO_KEY);
}

// 상태 초기화 함수 (초기값은 null로 설정하고 useEffect에서 갱신)
function _initAuthState(): AuthState {
  return { accessToken: null, loginInfo: null };
}

// Slice 생성
const authSlice = createSlice({
  name: 'auth',
  initialState: _initAuthState(),
  reducers: {
    loginReducer: (state, action: PayloadAction<{ accessToken: string; loginInfo: LoginInfo }>) => {
      const { accessToken, loginInfo } = action.payload;
      state.accessToken = accessToken;
      state.loginInfo = loginInfo;
    },
    logoutReducer: (state) => {
      state.accessToken = null;
      state.loginInfo = null;
    },
  },
});

// Selector 함수들
export const accessTokenSelector = (state: RootState) => state.auth.accessToken;
export const loginInfoSelector = (state: RootState) => state.auth.loginInfo;

interface LoginParams {
  accessToken: string;
  loginInfo: LoginInfo;
}

// 로그인 함수
export function loginAction(dispatch: Function, { accessToken, loginInfo }: LoginParams) {
  // 비동기 저장은 컴포넌트에서 처리
  dispatch(authSlice.actions.loginReducer({ accessToken, loginInfo }));
}

// 로그아웃 함수
export function logoutAction(dispatch: Function) {
  dispatch(authSlice.actions.logoutReducer());
}

// 리듀서 export
export default authSlice;
