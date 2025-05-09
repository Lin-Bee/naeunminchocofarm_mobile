import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusBadgeStyle } from '~/utils/StatusStyle';

interface SensorCardProps {
  name: string;
  value: string;
  unit?: string;
  statusLabel?: string;
  icon: React.ReactNode;
}

export default function SensorCard({ name, value, unit = '', statusLabel, icon }: SensorCardProps) {
  const badgeStyle = getStatusBadgeStyle(statusLabel);
   return (
    <View className="border p-4 rounded-md bg-white shadow-sm">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-2xl font-semibold text-gray-700">{name}</Text>

        {statusLabel && (
          <View style={[styles.badge, badgeStyle]}>
          <Text style={[styles.badgetext, { color: badgeStyle.color }]}>{statusLabel}</Text>
        </View>
        )}
      </View>

      <View className="flex-row justify-between items-end">
      <View className="w-10 h-10 items-end justify-end">
          <View style={styles.icon}>{icon}</View>
        </View>

        <Text style={styles.value}>
          {value}
          <Text style={styles.unit}>{unit}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
    marginTop: 2,
    marginBottom: -9,
    alignSelf: 'flex-end' 
  },
  value: {
    fontSize: 80,
    fontFamily: 'PaperlogyBold',
    color: '#1F2937',
  },
  unit: {
    fontSize: 40,
    color: '#6B7280',
    fontFamily: 'PaperlogyBold',
    marginLeft: 6,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: '#D1FAE5', // 예시: 정상
    borderColor: '#34D399',
  },
  badgetext: {
    fontSize: 12,
    fontWeight: '500',
    color: '#059669',
  },
});
