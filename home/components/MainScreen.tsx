import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeTop from './HomeTop';
import { useState } from 'react';
import HomeCard from './HomeCard';
const farmImage = require('~/assets/images/content/ico-m-sec2-1.png');

const MainScreen = () => {
  const [farmCount, setFarmCount] = useState(0);
  const [warningCount, setwarningCount] = useState(0);
  return (
    <>
      <View>
        <HomeTop />

        <View className="mt-4 space-y-3 px-4">
          <View className="mb-4 flex-row justify-between space-x-2">
            <HomeCard title="운영 농장 수" value={String(farmCount)} unit="개" colorType="green" />
            <HomeCard
              title="이슈 발생"
              value={String(warningCount)}
              unit="건"
              colorType="warning"
            />
          </View>

          <View className="mb-4 mt-4">
            <View className='flex-row justify-between align-center'>
              <Text className="mb-2 font-bold text-lg">내 농장 리스트</Text>             <Pressable className="mt-2">
                <Text className="text-green-600">전체 보기 +</Text>
              </Pressable>
            </View>

            <Text>농장 A</Text>
            <Text>농장 B</Text>

          </View>
        </View>

        <View className="mt-6 px-4">
          <View className='flex-row justify-between align-center'>
              <Text className="mb-2 font-bold text-lg">알림 / 이슈</Text>             <Pressable className="mt-2">
                <Text className="text-green-600">전체 보기 +</Text>
              </Pressable>
            </View>
          <View className="mt-4">
            <Pressable className="border-red flex-row items-center justify-between rounded border bg-white p-4">
              <Text className="font-bold">1구역 a존 온도 상승 중!</Text>
              <Text className="font-bold">더보기</Text>
            </Pressable>
          </View>
        </View>

        <View className="flex-row items-center gap-4 rounded-lg bg-yellow-100 p-4">
          {/* <Image source={farmImage} className="h-4 w-4" resizeMode="contain" /> */}
          <View className="flex-1">
            <Text className="font-semibold text-sm text-yellow-800">봄철 온도차 주의</Text>
            <Text className="mt-1 text-xs text-yellow-700">
              농장별 기온 변동을 주기적으로 확인하세요.
            </Text>
          </View>
        </View>
        <View className="mb-10 mt-6 px-4">
          <View className="items-center rounded-2xl bg-green-100 p-4">
            <Text className="font-bold text-base">🌽 5월의 작물 추천: 옥수수!</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default MainScreen;
