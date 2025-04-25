import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';

interface LoadingProps {
  title?: string;
}

export default function Loading({ title = '로딩중...' }: LoadingProps) {
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 100,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-lg font-semibold text-gray-700 mb-6">{title}</Text>

      <Image
        source={require('../../assets/images/content/ico-m-sec2-1.png')}
        className="w-24 h-24 mb-6"
        resizeMode="contain"
      />

      <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: '#4ade80',
            width: widthInterpolated,
          }}
        />
      </View>
    </View>
  );
}
