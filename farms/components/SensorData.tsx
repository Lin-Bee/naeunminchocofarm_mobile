import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SensorDataProps } from '~/@types/farm';
import SensorCard from './SensorCard';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

type SensorDataDetailProps = SensorDataProps& {
  statusLabel?: string;
  icon?: React.ReactNode;
};

export function SensorData({ name, value, statusLabel }: SensorDataDetailProps) {
  const color = getSensorColor(statusLabel); 
  const icon = getSensorIcon(name, color); 

  switch (name) {
    case 'air_temp':
      return <SensorCard name="온도" value={String(value)} unit="℃" statusLabel={statusLabel} icon={icon} />;
    case 'humidity':
      return <SensorCard name="습도" value={String(value)} unit="%" statusLabel={statusLabel} icon={icon} />;
    case 'ldr':
      return <SensorCard name="조도" value={String(value)} unit="lx" statusLabel={statusLabel} icon={icon} />;
    case 'soil_moisture':
      return <SensorCard name="토양습도" value={String(value)} unit="%" statusLabel={statusLabel} icon={icon} />;
      case 'motion': {
        const isDetected = value === 'detected';
        const motionLabel = isDetected ? '감지' : '없음';
        return (
          <SensorCard
            name="움직임"
            value={motionLabel}
            unit=""
            statusLabel={statusLabel}
            icon={icon}
          />
        );
      }
    default:
      return null;
  }
}

export const getSensorColor = (statusLabel?: string): string => {
  switch (statusLabel) {
    case '정상':
      return '#059669'; 
    case '고온':
    case '위험':
    case '건조':
      return '#DC2626'; 
    case '저온':
    case '과습':
      return '#2563EB'; 
    default:
      return '#9CA3AF'; 
  }
};

export const getSensorIcon = (name: string, color: string): React.ReactNode => {
  switch (name) {
    case 'air_temp':
      return <FontAwesome5 name="temperature-low" size={70} color={color} />;
    case 'humidity':
      return <Ionicons name="water-outline" size={70} color={color} />;
    case 'ldr':
      return <FontAwesome5 name="sun" size={70} color={color} />;
    case 'soil_moisture':
      return <Ionicons name="water" size={70} color={color} />;
    case 'motion':
      return <FontAwesome5 name="walking" size={70} color={color} />;
    default:
      return <FontAwesome5 name="spinner" size={70} color={color} />;
  }
};

export function SensorDataSimple({ name, value }: SensorDataProps) {
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
  <Text className='font-semibold'>{value}℃</Text>
);

const HumidityData = ({ value }: { value: any }) => (
  <Text className='font-semibold'>{value}%</Text>
);

const LdrData = ({ value }: { value: any }) => (
  <Text className='font-semibold'>{value}</Text>
);

const SoilMoistureData = ({ value }: { value: any }) => (
  <Text className='font-semibold'>{value}</Text>
);

const MotionData = ({ value }: { value: any }) => {
  const isDetected = value === 'detected';
  const label = isDetected ? '감지' : '없음';
  const textColor = isDetected ? 'text-green-600' : 'text-gray-800';

  return (
    <Text className={`font-semibold ${textColor}`}>
      {label}
    </Text>
  );
};

