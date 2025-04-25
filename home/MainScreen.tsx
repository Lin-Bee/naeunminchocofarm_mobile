import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MainScreen = () => {
  return (
    <>
    <View>
        <View className="bg-green-500 px-4 pt-24 pb-6">
          <Text className="text-white text-lg font-bold">홍길동님</Text>
          <Text className="text-white mt-1">오늘도 스마트하게 농장을 관리해보세요!</Text>
        </View>

        <View className="mt-6 px-4 space-y-3">
          <View className="flex-row space-x-3 mb-">
            <View className="flex-1 bg-white mr-2 shadow rounded-2xl p-4">
              <Text className="font-semibold">운영 농장 수</Text>
              <Text className="text-xl font-bold text-green-600 mt-1">3개</Text>
            </View>
            <View className="flex-1 bg-white ml-2 shadow rounded-2xl p-4">
              <Text className="font-semibold">이슈 발생</Text>
              <Text className="text-xl font-bold text-red-500 mt-1">1건</Text>
            </View>
          </View>

            
          <View className="bg-white shadow mb-4 rounded-2xl p-4">
            <Text className="font-bold text-lg mb-2">내 농장 리스트</Text>
            <Text>농장 A</Text>
            <Text>농장 B</Text>
            <TouchableOpacity className="mt-2">
              <Text className="text-green-600">전체 보기 &gt;</Text>
            </TouchableOpacity>
          </View>

          
        </View>
        
        

        <View className="mt-6 px-4">
          <Text className="text-lg font-bold mb-2">알림 / 이슈</Text>
          <Pressable className="bg-gray-100 flex-row justify-between rounded-2xl p-4 items-center">
            <Text className="font-bold">1구역 a존 온도 상승 중! </Text>
            <Text className="font-bold">더보기 </Text>
          </Pressable>
        </View>

        <View className="bg-yellow-100 p-4 rounded-lg flex-row items-center gap-4">
          <Image
            source={require('../assets/images/content/ico-m-sec2-1.png')}
            className="w-6 h-6"
            resizeMode="contain"
          />
          <View className="flex-1">
            <Text className="text-sm font-semibold text-yellow-800">봄철 온도차 주의</Text>
            <Text className="text-xs text-yellow-700 mt-1">농장별 기온 변동을 주기적으로 확인하세요.</Text>
          </View>
        </View>
        <View className="mt-6 px-4 mb-10">
          <View className="bg-green-100 rounded-2xl p-4 items-center">
            <Text className="text-base font-bold">🌽 5월의 작물 추천: 옥수수!</Text>
          </View>
        </View>
    </View>
    </>
  )
}

export default MainScreen
