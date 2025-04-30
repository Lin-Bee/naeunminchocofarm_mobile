import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import SensorData from './SensorData';

interface SectionAreaProps {
  status: {
    controllers?: {
      name?: string;
      sensor_datas?: {
        name: string;
        value: string | number;
      }[];
      
    }[];
  };
  dataName: string;
}

export default function SectionArea({ status, dataName }: SectionAreaProps) {
  const controllers =
    status.controllers?.map((c, i) => ({
      name: c.name?.trim() || `구역 ${i + 1}`,
      sensorValue: c.sensor_datas?.find((x) => x.name === dataName)?.value,
    })) ?? [];

  const [openIndexes, setOpenIndexes] = useState<number[]>(
    controllers.map((_, i) => i) // 기본 전체 열림
  );

  const toggleSection = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <View className="flex flex-col p-4">
      <View className='mb-2'>
        <Text className='font-semibold'>총 <Text className='text-green-500'>{controllers.length}</Text> 개의 구역이 있습니다.</Text>
      </View>
      {controllers.map(({ name, sensorValue }, i) => (
        <View key={i} className="">
          <Pressable onPress={() => toggleSection(i)} className="p-3 border-b border-gray-200">
            <Text className="font-semibold text-gray-800">{name}</Text>
          </Pressable>

          {openIndexes.includes(i) && (
            <View className="border p-4 rounded-md bg-white shadow-sm">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm font-semibold text-gray-700">{name}</Text>

                <View className="px-2 py-1 rounded-full border border-yellow-400 bg-yellow-100">
                  <Text className="text-xs text-yellow-700 font-medium">온도상태변수</Text>
                </View>
              </View>

              <View className="items-center flex-row justify-between">
                <View className="w-10 h-10 mb-1">
                  <Text>아이콘</Text>
                </View>
                <View className="text-center">
                  <SensorData name={dataName} value={sensorValue} />
                </View>
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
