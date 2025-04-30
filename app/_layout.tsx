import { StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useCustomFonts } from '~/hook/useCustomFonts';
import Loading from './loading';
import '~/global.css';
import { goLogin, loadLoginInfo, store } from '../redux/store'; // store 가져오기
import { Provider, useSelector } from 'react-redux'; // Provider 가져오기
import { useEffect, useState } from 'react';
import { accessTokenSelector } from '~/redux/auth_slice';

export default function RootLayout() {
  const fontsLoaded = useCustomFonts();
  const router = useRouter();

  // 앱 시작할 때 로그인 정보 복구
  useEffect(() => {
    (async () => {
      await loadLoginInfo(); 
    })();
  }, []);

  
  useEffect(() => {
    (async () => {
      await goLogin(); 
    })();
  }, []);


  if (!fontsLoaded) return <Loading />;

  return (
    <Provider store={store}>
      <>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar />
      </>
    </Provider>
  );
}
