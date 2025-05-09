import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import ToggleButton from '~/components/common/ToogleButton';
import { StyleSheet } from 'react-native';
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
    <View className="min-w-100 p-4">
      <Text className='font-semibold font-lg mb-2'>상세 조정</Text>
        <View style={styles.container}>
        {fields.map(({ label, key, parser }, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.label}>{label}</Text>

            <View style={styles.inputGroup}>
              <Pressable style={styles.button}
                onPress={()=>{
                  onChangeSettings({
                    ...settings,
                    [key]:parser(String((Number(settings[key]) || 0) - 1))
                  })
                }}>
                <Text style={styles.buttonText}>-</Text>
              </Pressable>

              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(settings[key] ?? '')}
                onChangeText={(v) =>
                  onChangeSettings({ ...settings, [key]: parser(v) })
                }
              />

              <Pressable
                style={styles.button}
                onPress={() =>
                  onChangeSettings({
                    ...settings,
                    [key]: parser(String((Number(settings[key]) || 0) + 1)),
                  })
                }
              >
                <Text style={styles.buttonText}>+</Text>
              </Pressable>
            </View>
          </View>
        ))}

          <View style={styles.row}>
            <Text style={styles.label}>자동제어</Text>
            <ToggleButton
              value={settings[toggleKey]}
              onChange={(v) => onChangeSettings({ ...settings, [toggleKey]: v })}
            />
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb', // gray-200
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // gray-200
  },
  label: {
    fontSize: 14,
    color: '#374151', // gray-700
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#9ca3af', // gray-400
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827', // gray-900
  },
  input: {
    height: 32,
    width: 80,
    borderRadius: 6,

    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop:13,
    lineHeight: 1, // height와 동일하게
    paddingVertical: 0, // 내부 padding 제거
    includeFontPadding: false,
    textAlignVertical: 'center', // Android용
  },
});

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