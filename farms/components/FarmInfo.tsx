import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Farm } from '~/apis/member_api';

interface FarmInfoProps {
  farm : Farm;
}

const FarmInfo = ({ farm }: FarmInfoProps) => {
  console.log('이곳 팜'+farm);
  return (
    <View className="px-4 py-2 bg-white p-4">
      <View className="border-b-4 p-4" >
        <Text className="text-sm text-gray-400">상태: {farm.status}</Text>
        <Text className="text-2xl font-bold">{farm.name}</Text>
        <Text className="text-sm text-gray-400">UUID: {farm.uuid}</Text>
        <Text className="text-sm text-gray-400">주소: {farm.address}</Text>
        <Text className="text-sm text-gray-400">등록일: {farm.useDate}</Text>
        <Text className="text-sm text-gray-400">작물 종류: {farm.cropName}</Text>
      </View>
    </View>
  )
}

export default FarmInfo