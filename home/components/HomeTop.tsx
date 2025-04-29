import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HomeTopProps{
  name:string;
}

const HomeTop = ({name}:HomeTopProps) => {
  return (
    <>
      <View style={styles.greenBox}>
        <Text className="font-semibold text-2xl text-white ">{name}님</Text>
        <Text className="mt-1 font-md text-sm text-white">
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
