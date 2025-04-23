import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export const useCustomFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      PaperlogyThin: require('../assets/fonts/Paperlogy-1Thin.ttf'),
      PaperlogyExtraLight: require('../assets/fonts/Paperlogy-2ExtraLight.ttf'),
      PaperlogyLight: require('../assets/fonts/Paperlogy-3Light.ttf'),
      PaperlogyRegular: require('../assets/fonts/Paperlogy-4Regular.ttf'),
      PaperlogyMedium: require('../assets/fonts/Paperlogy-5Medium.ttf'),
      PaperlogySemiBold: require('../assets/fonts/Paperlogy-6SemiBold.ttf'),
      PaperlogyBold: require('../assets/fonts/Paperlogy-7Bold.ttf'),
      PaperlogyExtraBold: require('../assets/fonts/Paperlogy-8ExtraBold.ttf'),
      PaperlogyBlack: require('../assets/fonts/Paperlogy-9Black.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  return fontsLoaded;
};