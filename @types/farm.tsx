import React from "react";

export interface SensorDataProps {
  name: string;
  value: any;
}

export interface ControllerType {
  name?: string;
  sensor_datas?: SensorDataProps[];
}

export interface Status {
  controllers?: ControllerType[];
}


//센서 탭각각들 key label unit드갈거
export interface SensorTabItem{
  key: string;
  label: string;
  unit: string;
}

//넘겨줄 영역들
export interface SenserTabProps{
  tabs:SensorTabItem[];
  value:string;
  onChange:(key:string)=>void;
  dataProvider:(key:string)=>number;
  DataComponent ?: React.ComponentType<{ name: string; value: any }>;
}