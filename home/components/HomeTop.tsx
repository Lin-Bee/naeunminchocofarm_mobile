import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
const Mimg = require('~/assets/images/content/bg-home.png')

interface HomeTopProps{
  name:string;
}

const HomeTop = ({name}:HomeTopProps) => {
  return (
    <>
      <ImageBackground
        source={Mimg} style={styles.greenBox} imageStyle={styles.backgroundImage}>
        <Text className="font-semibold text-2xl text-white ">{name}님</Text>
        <Text className="mt-1 font-light text-sm text-white">
          오늘도 스마트하게 농장을 관리해보세요!
        </Text>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  greenBox: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingTop: 96,
    paddingBottom: 24,
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.8
  },
});

export default HomeTop;
