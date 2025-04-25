import { useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import { subscribeFarmSettings, subscribeFarmStatus } from "../smart_farm/subscribe_manager";

const farmUuid = "0bbd8aa9-02af-4dc6-af0e-c1c5aaa45790";

export default function NcfSubscriberTestComponent() {
  const [settings, setSettings] = useState<any>(undefined);
  const [status, setStatus] = useState<any>(undefined);
  const updateSettings = useRef<(s: any) => void>(undefined);
  
  useEffect(() => {
    const [unsubscribeSettings, _updateSettings] = subscribeFarmSettings(farmUuid, setSettings);
    const unsubscribeStatus = subscribeFarmStatus(farmUuid, setStatus);
    updateSettings.current = _updateSettings;
    return () => {
      unsubscribeSettings();
      unsubscribeStatus();
    }
  }, []);

  return(
    <>
      <Text>status: {JSON.stringify(status)}</Text>
      <Text>settings: {JSON.stringify(settings)}</Text>
    </>
  );
}