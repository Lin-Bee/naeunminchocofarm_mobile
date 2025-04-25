import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

//각각들 key label unit드갈거
interface SensorTabItem{
  key: string;
  label: string;
  unit: string;
}

//넘겨줄 영역들
interface SenserTabProps{
  tabs:SensorTabItem[];
  value:string;
  onChange:(key:string)=>void;
  dataProvider:(key:string)=>number;
  DataComponent?: React.ComponentType<{ name: string; value: any }>;
}


const SensorTab = ({ tabs, value, onChange, dataProvider, DataComponent }: SenserTabProps) => {
  return (
    <View className="flex flex-wrap gap-2 mb-3">
      {tabs.map(({ key, label, unit }) => (
        <Pressable
          key={key}
          className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
            value === key
              ? 'bg-green-600'
              : 'bg-gray-100'
          }`}
          onPress={() => onChange(key)}
        >
          <Text className={`text-sm ${value === key ? 'text-white' : 'text-gray-700'}`}>
            {label}
          </Text>

          {DataComponent && (
            <View className="ml-2 px-2 py-0.5 bg-white border rounded text-xs font-semibold text-gray-700 min-w-8">
              <DataComponent name={key} value={dataProvider(key)} />
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default SensorTab;
