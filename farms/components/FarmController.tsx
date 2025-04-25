import React from 'react';
import { Text, TextInput, View } from 'react-native';
import ToggleButton from '../../components/common/ToogleButton';

interface SensorSettings {
  [key: string]: any;
}

interface SensorControllerProps {
  settings: SensorSettings;
  onChangeSettings: (s: SensorSettings) => void;
  fields: {
    label: string;
    key: string;
    parser: (v: string) => any;
  }[];
  toggleKey: string;
}

export default function FarmController({
  dataName,
  settings,
  onChangeSettings,
}: {
  dataName: string;
  settings: Record<string, SensorSettings>;
  onChangeSettings: (next: Record<string, SensorSettings>) => void;
}) {
  const sensorSettings = settings[dataName];

  function handleChangeSensorSettings(nextSensorSettings: SensorSettings) {
    onChangeSettings({ ...settings, [dataName]: nextSensorSettings });
  }

  switch (dataName) {
    case 'air_temp':
      return (
        <AirTempController
          settings={sensorSettings}
          onChangeSettings={handleChangeSensorSettings}
        />
      );
    case 'humidity':
      return (
        <HumidController
          settings={sensorSettings}
          onChangeSettings={handleChangeSensorSettings}
        />
      );
    case 'ldr':
      return (
        <LdrController
          settings={sensorSettings}
          onChangeSettings={handleChangeSensorSettings}
        />
      );
    case 'soil_moisture':
      return (
        <SoilMoistureController
          settings={sensorSettings}
          onChangeSettings={handleChangeSensorSettings}
        />
      );
    case 'motion':
      return (
        <MotionController
          settings={sensorSettings}
          onChangeSettings={handleChangeSensorSettings}
        />
      );
    default:
      return null;
  }
}

function SensorController({
  settings,
  onChangeSettings,
  fields,
  toggleKey,
}: SensorControllerProps) {
  return (
    <View className="min-w-100 border border-gray-200 mb-4 p-4">
      <View className="flex-row items-center justify-between">
        <View className="w-3/4 flex-row flex-wrap gap-4 items-center justify-around">
          {fields.map(({ label, key, parser }, i) => (
            <View key={i}>
              <Text className="text-sm text-gray-700 mb-1">{label}</Text>
              <TextInput
                className="border border-gray-300 rounded px-2 py-1 w-20 text-right text-lg font-bold"
                keyboardType="numeric"
                value={String(settings[key] ?? '')}
                onChangeText={(v) =>
                  onChangeSettings({ ...settings, [key]: parser(v) })
                }
              />
            </View>
          ))}
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-medium text-gray-800">자동제어</Text>
          <ToggleButton
            value={settings[toggleKey]}
            onChange={(v) => onChangeSettings({ ...settings, [toggleKey]: v })}
          />
        </View>
      </View>
    </View>
  );
}

function AirTempController({
  settings,
  onChangeSettings,
}: {
  settings: SensorSettings;
  onChangeSettings: (s: SensorSettings) => void;
}) {
  return (
    <SensorController
      settings={settings}
      onChangeSettings={onChangeSettings}
      fields={[
        { label: '최저 기온(℃)', key: 'min', parser: parseFloat },
        { label: '최고 기온(℃)', key: 'max', parser: parseFloat },
      ]}
      toggleKey="enable"
    />
  );
}

function HumidController({
  settings,
  onChangeSettings,
}: {
  settings: SensorSettings;
  onChangeSettings: (s: SensorSettings) => void;
}) {
  return (
    <SensorController
      settings={settings}
      onChangeSettings={onChangeSettings}
      fields={[
        { label: '최저 습도(%)', key: 'min', parser: parseFloat },
        { label: '최고 습도(%)', key: 'max', parser: parseFloat },
      ]}
      toggleKey="enable"
    />
  );
}

function LdrController({
  settings,
  onChangeSettings,
}: {
  settings: SensorSettings;
  onChangeSettings: (s: SensorSettings) => void;
}) {
  return (
    <SensorController
      settings={settings}
      onChangeSettings={onChangeSettings}
      fields={[
        { label: '최저 조도', key: 'min', parser: parseInt },
        { label: '최고 조도', key: 'max', parser: parseInt },
      ]}
      toggleKey="enable"
    />
  );
}

function SoilMoistureController({
  settings,
  onChangeSettings,
}: {
  settings: SensorSettings;
  onChangeSettings: (s: SensorSettings) => void;
}) {
  return (
    <SensorController
      settings={settings}
      onChangeSettings={onChangeSettings}
      fields={[
        { label: '최저 토양습도', key: 'min', parser: parseInt },
        { label: '최고 토양습도', key: 'max', parser: parseInt },
      ]}
      toggleKey="enable"
    />
  );
}

function MotionController({
  settings,
  onChangeSettings,
}: {
  settings: SensorSettings;
  onChangeSettings: (s: SensorSettings) => void;
}) {
  return (
    <SensorController
      settings={settings}
      onChangeSettings={onChangeSettings}
      fields={[]}
      toggleKey="enable"
    />
  );
}
