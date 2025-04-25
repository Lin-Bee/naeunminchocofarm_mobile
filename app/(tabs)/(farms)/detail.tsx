import memberApi from '../../../apis/memberApi';
import FarmInfo from '../../../farms/components/FarmInfo';
import PageLayout from '../../../components/PageLayout';
import SensorTab from '../../../farms/components/SensorTab';
import FarmController from '../../../farms/components/FarmController';
import SectionArea from '../../../farms/components/SectionArea';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import SensorData from '../../../farms/components/SensorData';
import Loading from '../../../app/loading';
import { subscribeFarmSettings, subscribeFarmStatus } from '../../../lib/smart_farm/subscribe_manager';

const SENSOR_TABS = [
  { key: "soil_moisture", label: "토양습도", unit: "" },
  { key: "air_temp", label: "기온", unit: "℃" },
  { key: "humidity", label: "습도", unit: "%" },
  { key: "ldr", label: "조도", unit: "lx" },
  { key: "motion", label: "움직임", unit: "" },
]


const detail = () => {
  //일단은 any로 잡아두지만 내가 상태/셋팅/업데이트에 뭐들어갈지 정해지면 수정하기
  const {farmId} = useLocalSearchParams() as {farmId : string};
  const [farmUuid, setFarmUuid] = useState<string | undefined>(undefined);
  const router = useRouter();
  const [settings, setSettings] = useState<any>(undefined);
  const [status, setStatus] = useState<any>(undefined);
  const updateSettings = useRef<any>(undefined);
  const [activeTab, setActiveTab] = useState("soil_moisture");

  function bindFarmUuid(farmId : string) {
    memberApi.getFarmDetail('help')
      .then(res => {
        if (!res.data) {
          alert("스마트팜을 보유하고 있지 않습니다. 이전 화면으로 이동합니다.");
          router(-1);
        }
        setFarmUuid(res.data.uuid);
      })
      .catch(e => console.error(e));
  }

  function connectFarm(farmUuid) {
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

  if (!farmUuid || !status || !settings) {
    return <Loading title={"스마트팜 정보를 불러오는 중입니다."} />;
  }

  //axios로 내팜불러가기
  useEffect(() => {
    bindFarmUuid(farmId);
  }, [farmId]);

  useEffect(() => {
    const disconnectFarm = connectFarm(farmUuid);
    return () => {
      disconnectFarm();
    }
  }, [farmUuid]);

  //그 팜 내에서 컨트롤러 센서이름이 같은애들뿌려주기 
  function farmDataProvider(dataName) {
    const data = status.controllers?.map(c => c.sensor_datas?.find(s => s.name === dataName)?.value)?.find(x => true);
    return data;
  }

 
  return (
    <>
      <PageLayout>
        {/* 스마트팜 상세 - 흰색배경에 언더바 회색 */}
        <FarmInfo/>
        {/* 탭 - 흰색배경 */} 
        <SensorTab
          tabs={SENSOR_TABS}
          value={activeTab}
          onChange={setActiveTab}
          dataProvider={farmDataProvider}
          DataComponent={SensorData}
        />
        {/* 컨트롤러  - 하단 라운드*/}
        <FarmController dataName={activeTab} settings={settings} onChangeSettings={s => updateSettings.current?.(s)} />
        {/* 구역별 센서LIST */}
        <SectionArea status={status} dataName={activeTab} />
      </PageLayout>
    </>
  )
}

export default detail