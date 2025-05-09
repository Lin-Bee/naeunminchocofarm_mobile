import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SensorData} from './SensorData';

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
  settings:Record<string,{min?:number, max?:number}>
}

function getStatusLabel(value: number, setting?: { min?: number; max?: number }, name?: string) {
  if (!setting) return '정상';
  const { min, max } = setting;

  if (typeof min === 'number' && value < min) {
    return name === 'air_temp' ? '저온' : name === 'humidity' ? '건조' : '낮음';
  }
  if (typeof max === 'number' && value > max) {
    return name === 'air_temp' ? '고온' : name === 'humidity' ? '과습' : '높음';
  }
  return '정상';
}

export default function SectionArea({ status, dataName,settings }: SectionAreaProps) {
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
      {controllers.map(({ name, sensorValue }, i) => {
        const statusLabel =
          typeof sensorValue === 'number'
            ? getStatusLabel(sensorValue, settings[dataName], dataName)
            : undefined;

        return (
          <View key={i}>
            <Pressable onPress={() => toggleSection(i)} className="p-3 mb-2 border-b border-gray-200">
              <Text className="font-semibold text-gray-800">{name}</Text>
            </Pressable>

            {openIndexes.includes(i) && (
              <SensorData
                name={dataName}
                value={sensorValue}
                statusLabel={statusLabel} 
              />
            )}
          </View>
        );
      })}
    </View>
  );
}
