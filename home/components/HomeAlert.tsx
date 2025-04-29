import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeAlert = () => {
  return (
    <>
      <View className="mt-6 px-4">
        <View className="align-center flex-row justify-between">
          <Text className="semibold mb-2 font-semibold text-xl">알림 / 이슈</Text>
          <Pressable className="mt-2">
            <Text className="text-green-600">전체 보기 +</Text>
          </Pressable>
        </View>
        <View className="mt-1">
          <Pressable className="border-red flex-row items-center justify-between rounded border bg-white p-4">
            <Text className="font-semibold">1구역 a존 온도 상승 중!</Text>
            <Text className="font-bold">자세히 +</Text>
          </Pressable>
        </View>
      </View>

      <View className="flex-row items-center gap-4 rounded-lg bg-yellow-100 p-4">
        <View className="flex-1">
          <Text className="font-semibold text-sm text-yellow-800">봄철 온도차 주의</Text>
          <Text className="mt-1 text-xs text-yellow-700">
            농장별 기온 변동을 주기적으로 확인하세요.
          </Text>
        </View>
      </View>
    </>
  )
}

export default HomeAlert

const styles = StyleSheet.create({})