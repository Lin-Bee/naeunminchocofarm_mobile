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
          className={`rounded-md text-sm font-medium items-center ${
            value === key
              ? 'bg-green-600'
              : 'bg-gray-100'
          }`}
          onPress={() => onChange(key)}
        >
          <Text className={`mb-2 text-sm ${value === key ? 'text-white' : 'text-gray-700'}`}>
            {label}
          </Text>

          {DataComponent && (
            <View className="px-2 mb-2 py-0.5 bg-white border rounded text-xs font-semibold text-gray-700 min-w-8">
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
    width:'19%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    elevation: 3, // 안드로이드 그림자
  }

});
