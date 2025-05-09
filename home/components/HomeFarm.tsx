import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Farm } from '~/apis/member_api'
import { useRouter } from 'expo-router'
import ModalNcf from '~/components/common/ModalNcf'
import { Ionicons } from '@expo/vector-icons'

interface HomeFarmProps {
  farms:Farm[]
}


const HomeFarm = ({farms}:HomeFarmProps) => {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View className="mb-4 mt-4 space-y-3">
      <View className="items-center flex-row justify-between">
        <Text className="semibold mb-2 font-semibold text-xl">내 농장 리스트</Text>
        <Pressable onPress={() => router.push('/(tabs)/(farms)')}>
          <Text className='font-semibold'>전체 보기 +</Text>
        </Pressable>
      </View>

      {/* here */}
      {farms.length === 0 ? (
        <View className='p-4'>
          <Text>등록된 농장이 없습니다.</Text>
        </View>
      ) : (
        <View style = {styles.scrollArea} className='w-full '>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='py-2' >
          { farms.map((farm,i) => (
            <Pressable key={farm.id} style={styles.cardContainer} onPress={()=>{router.push(`/(tabs)/(farms)/detail/${farm.id}`)}}>
              <Text className={`text-xs text-green-500`}>
              운영중
              </Text>
              {/* 본문 영역 */}
              <View className="flex-row items-center">
                <View className="ml-2">
                  <Text className="mb-2 font-semibold text-2xl">{farm.name || `스마트팜 ${i + 1}`}</Text>
                  <Text className="text-sm text-gray-500 font-semibold">작물: {farm.cropName}</Text>
                  <Text className="mt-1 text-sm text-gray-500 font-semibold">주소: {farm.address}</Text>
                </View>
              </View>
            </Pressable>  
          ))
        }
          <Pressable onPress={()=>{setModalVisible(true)}}
            style={styles.cardContainer} className="items-center justify-center ">
            <Text className="text-4xl"><Ionicons name="add-circle" size={40} color="#22c55e" /></Text>
            <Text className="mt-2 text-center text-gray-700 font-semibold">스마트팜{'\n'}추가 신청하기</Text>
          </Pressable>
          <ModalNcf
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={()=> setModalVisible(false)}
            modalText="홈페이지 가서 신청하셈 ㄱㄱ"
          />
        </ScrollView>  
      </View>
      )}
    </View>
  )
}

export default HomeFarm

const styles = StyleSheet.create({
  scrollArea : {overflow:'hidden'},
  cardContainer : {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: '4%',
    width: '52%',
    flexShrink: 0,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
})