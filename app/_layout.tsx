import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { useCustomFonts } from '~/hook/useCustomFonts';
import Loading from './loading';
import '~/global.css';
import { loadLoginInfo, store } from '../redux/store'; // store 가져오기
import { Provider } from 'react-redux'; // Provider 가져오기
import { useEffect } from 'react';

export default function RootLayout() {
  const fontsLoaded = useCustomFonts();

  // 앱 시작할 때 로그인 정보 복구
  useEffect(() => {
    (async () => {
      await loadLoginInfo(); 
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
