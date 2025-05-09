import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SenserTabProps } from '~/@types/farm';

const SensorTab = ({ tabs, value, onChange, dataProvider, DataComponent }: SenserTabProps) => {
  return (
    <View className="p-4 flex flex-wrap flex-row justify-between mb-3">
      {tabs.map(({ key, label, unit }) => (
        <Pressable
          key={key}
          style={styles.btn}
          className={`rounded-md text-sm items-center ${
            value === key
              ? 'bg-green-600'
              : 'bg-gray-200'
          }`}
          onPress={() => onChange(key)}
        >
          <Text className={`mb-1 text-sm ${value === key ? 'text-white' : 'text-gray-700'}`}>
            {label}
          </Text>

          {DataComponent && (
            <View className="w-4/5 mb-2 py-0.5 bg-white border items-center rounded text-xs font-semibold text-gray-700">
              <DataComponent name={key} value={dataProvider(key)} />
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default SensorTab;

const styles = StyleSheet.create({
  btn: {
    width:'18.5%',
    shadowColor: '#000',
    elevation: 3, // 안드로이드 그림자
  }

});
