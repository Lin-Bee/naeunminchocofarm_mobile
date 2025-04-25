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
    <View className="flex flex-col gap-2">
      {controllers.map(({ name, sensorValue }, i) => (
        <View key={i} className="border rounded-md bg-white shadow-sm">
          <Pressable onPress={() => toggleSection(i)} className="p-3 border-b border-gray-200">
            <Text className="font-semibold text-gray-800">{name}</Text>
          </Pressable>

          {openIndexes.includes(i) && (
            <View className="p-4">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm font-semibold text-gray-700">{name}</Text>

                <View className="px-2 py-1 rounded-full border border-yellow-400 bg-yellow-100">
                  <Text className="text-xs text-yellow-700 font-medium">고온</Text>
                </View>
              </View>

              <View className="items-center">
                <View className="w-10 h-10 mb-1">
                  {/* 아이콘 자리 */}
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
