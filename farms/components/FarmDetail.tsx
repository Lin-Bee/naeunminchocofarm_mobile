import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import memberApi from '~/apis/member_api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { subscribeFarmSettings, subscribeFarmStatus } from '~/lib/smart_farm/subscribe_manager';
import Loading from '~/app/loading';
import SensorTab from './SensorTab';
import FarmController from './FarmController';
import SectionArea from './SectionArea';
import FarmInfo from './FarmInfo';
import SensorData from './SensorData';

const SENSOR_TABS = [
  { key: "soil_moisture", label: "토양습도", unit: "" },
  { key: "air_temp", label: "기온", unit: "℃" },
  { key: "humidity", label: "습도", unit: "%" },
  { key: "ldr", label: "조도", unit: "lx" },
  { key: "motion", label: "움직임", unit: "" },
]

interface farmDetailProps {
  farmId:number 
}

const FarmDetail = ({farmId}:farmDetailProps) => { 
  const router = useRouter();
  const [farmUuid, setFarmUuid] = useState<string | undefined>(undefined);
  const [settings, setSettings] = useState<any>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const updateSettings = useRef<any>(undefined);
  const [activeTab, setActiveTab] = useState("soil_moisture");
  const cleanUpTasks = useRef([]);

  console.log('FarmInfo props:', farmId);

  useEffect(() => {
    memberApi.getFarmDetail(farmId)
      .then(res => {
        if (!res.data) {
          alert("스마트팜을 보유하고 있지 않습니다. 이전 화면으로 이동합니다.");
          router.back();
        }
        const disconnectFarm = connectFarm(res.data.uuid);
        cleanUpTasks.current.push(disconnectFarm);
      })
      .catch(e => console.error(e));

    return () => {
      cleanUpTasks.current.forEach(task => task());
    }
  }, [farmId]);


  function connectFarm(farmUuid: string) {
    const [unsubscribeSettings, _updateSettings] = subscribeFarmSettings(farmUuid, setSettings);
    // 탭내 컨트롤러에서 저장된 셋팅을 유지 저장
    updateSettings.current = _updateSettings;
    const unsubscribeStatus = subscribeFarmStatus(farmUuid, setStatus);
    return () => {
      unsubscribeSettings();
      updateSettings.current = undefined;
      unsubscribeStatus();
    }
  }

  if (!status || !settings) {
    return <Loading title={"스마트팜 정보를 불러오는 중입니다."} />;
  }

  //그 팜 내에서 컨트롤러 센서이름이 같은애들뿌려주기 
  function farmDataProvider(dataName:string) {
    const data = status.controllers?.map(c => c.sensor_datas?.find(s => s.name === dataName)?.value)?.find(x => true);
    return data;
  }
  return (
    <ScrollView className="px-4 py-4">
      <View>
        {/* <FarmInfo/> */}
        <SensorTab
          tabs={SENSOR_TABS}
          value={activeTab}
          onChange={setActiveTab}
          dataProvider={farmDataProvider}
          DataComponent={SensorData}
        />
        <FarmController dataName={activeTab} settings={settings} onChangeSettings={s => updateSettings.current?.(s)} />

        <SectionArea status={status} dataName={activeTab} />
      </View>
    </ScrollView>
  )
}

export default FarmDetail