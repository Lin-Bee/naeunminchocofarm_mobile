import { ImageBackground, StyleSheet, Text, View } from 'react-native'
const alertBanner = require('~/assets/images/content/alert-banner.png')
import React from 'react'

const HomeBottom = () => {
  return (
    <View style={styles.greenBox} className="mt-2">
      <ImageBackground source={alertBanner} imageStyle={styles.backgroundImage}
      className="mt-2 f-full flex-row items-center gap-4 rounded-lg bg-yellow-100 p-4">
        <View className="flex-1">
          <Text className="font-semibold text-lg text-yellow-800">봄철 온도차 주의</Text>
          <Text className="mt-1 text-xs text-yellow-700">
            농장별 기온 변동을 주기적으로 확인하세요.
          </Text>
        </View>
      </ImageBackground>
    </View>
  )
}

export default HomeBottom

const styles = StyleSheet.create({
  greenBox: {
    width: '100%',
    backgroundColor: '#d6f7b2',
    borderRadius:10
  },
  backgroundImage: {
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    width:'100%',
  },
})