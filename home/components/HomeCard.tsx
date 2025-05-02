import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface HomeCardProps {
  title: string;
  value: string;
  unit: string;
  className?: string;
  colorType?: 'green' | 'warning'; 
}

const HomeCard = ({ title, value, unit, className, colorType = 'green' }: HomeCardProps) => {
  return (
    <View className={`bg-white p-4 shadow ${className || ''}`}
      style={styles.moreStyle}>
      <Text className="font-semibold semibold text-md">{title}</Text>

      <View className="flex-row items-center justify-end mt-1">
        <Text style={[styles[colorType],styles.size]} className="font-semibold">
          {value}
        </Text>
        <Text className="ml-1 font-semibold text-2xl"> {unit}</Text>
      </View>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  green: { color: '#22c55e' },
  warning: { color: 'red' },
  moreStyle:{
    width:'48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    elevation: 6,
    borderRadius:10
  },
  size:{
    fontSize:42
  }
});