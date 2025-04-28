import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { useCustomFonts } from '~/hook/useCustomFonts';
import Loading from './loading';
import '~/global.css';

export default function RootLayout() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) return <Loading/>

  return (
  <>
    <Stack screenOptions={{headerShown:false}} />
    <StatusBar />
  </>
  );
}
