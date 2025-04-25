import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface FarmBasicProps {
  farmName: string;
  uuid: string;
  farmAddr: string;
  useDate: string;
  crop: string;
  status: string;
}

const FarmInfo = ({ farmName, uuid, farmAddr, useDate, crop, status }: FarmBasicProps) => {
  return (
    <View className="px-4 py-2 bg-white p-4">
      <View className="border-b-4 p-4" >
        <Text className="text-sm text-gray-400">상태: {status}</Text>
        <Text className="text-2xl font-bold">{farmName}dd</Text>
        <Text className="text-sm text-gray-400">UUID: {uuid}</Text>
        <Text className="text-sm text-gray-400">주소: {farmAddr}</Text>
        <Text className="text-sm text-gray-400">등록일: {useDate}</Text>
        <Text className="text-sm text-gray-400">작물 종류: {crop}</Text>
        <View className='w-full h-[2px] bg-gray'></View>
      </View>
    </View>
  )
}

export default FarmInfo