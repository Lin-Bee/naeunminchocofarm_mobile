import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeBottom = () => {
  return (
    <View className="mb-10 mt-6 px-4">
      <View className="items-center rounded-2xl bg-green-100 p-4">
        <Text className="font-bold text-base">🌽 5월의 작물 추천: 옥수수!</Text>
      </View>
    </View>
  )
}

export default HomeBottom

const styles = StyleSheet.create({})