import { Ionicons } from '@expo/vector-icons'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'

const HomeAlert = () => {
  return (
    <>
      <View className="mt-6">
        <View className="items-center flex-row justify-between">
          <Text className="semibold mb-2 font-semibold text-xl">알림 / 이슈</Text>
          <Pressable className="mt-2">
            <Text className="text-green-600 font-semibold">전체 보기 +</Text>
          </Pressable>
        </View>
        <View className="mt-1">
          <Swiper
          autoplay
          autoplayTimeout={3}
          showsPagination={false}
          horizontal={false}
          height={80}
        >
          {[1, 2, 3].map((item, index) => (
            <View key={index} className="mt-1">
              <Pressable
                style={styles.redBorder}
                className="flex-row items-center justify-between rounded bg-white p-4"
              >
                <Text className="font-semibold text-red-900">🔔 {item} 구역 a존 온도 상승 중!</Text>
                <Text className="font-semibold"><Ionicons name="arrow-forward" size={24} color="#999" /></Text>
              </Pressable>
            </View>
          ))}
        </Swiper>
        </View>
      </View>
    </>
  )
}

export default HomeAlert

const styles = StyleSheet.create({
  redBorder: {
    borderWidth: 1,
    borderColor: 'red',
    textIndent:'red'
  }
});