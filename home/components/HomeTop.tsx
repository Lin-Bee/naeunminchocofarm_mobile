import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeTop = () => {
  return (
    <>
      <View style={styles.greenBox}>
        <Text className="font-semibold text-2xl text-white ">name님</Text>
        <Text className="mt-1 font-light text-sm text-white">
          오늘도 스마트하게 농장을 관리해보세요!
        </Text>
      </View>
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
});

export default HomeTop;
