import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';
const loadingImg =  require('~/assets/images/content/ico-m-sec2-1.png');

interface LoadingProps {
  title?: string;
}

export default function Loading({ title }: LoadingProps) {
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
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="mb-6 font-semibold text-lg text-gray-700">{title}</Text>

      <Image
        source={loadingImg}
        className="mb-6 h-32 w-32"
        resizeMode="contain"
      />

      <View className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
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
