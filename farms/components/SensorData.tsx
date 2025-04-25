import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface SensorDataProps {
  name: string;
  value: any;
}

export default function SensorData({ name, value }: SensorDataProps) {
  switch (name) {
    case 'air_temp':
      return <AirTempData value={value} />;
    case 'humidity':
      return <HumidityData value={value} />;
    case 'ldr':
      return <LdrData value={value} />;
    case 'soil_moisture':
      return <SoilMoistureData value={value} />;
    case 'motion':
      return <MotionData value={value} />;
    default:
      return null;
  }
}

const AirTempData = ({ value }: { value: any }) => (
  <Text>{value}℃</Text>
);

const HumidityData = ({ value }: { value: any }) => (
  <Text>{value}%</Text>
);

const LdrData = ({ value }: { value: any }) => (
  <Text>{value}</Text>
);

const SoilMoistureData = ({ value }: { value: any }) => (
  <Text>{value}</Text>
);

const MotionData = ({ value }: { value: any }) => {
  const isDetected = value === 'detected';
  return (
    <View
      className={`rounded-full w-full aspect-square self-center ${
        isDetected ? 'bg-green-600' : 'bg-gray-200'
      }`}
    />
  );
};

