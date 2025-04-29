import axios, { AxiosResponse } from "axios";
import { axiosInstance } from "./axios_instance";

// 로그인 요청에 사용하는 데이터 구조
export interface LoginData {
  loginId: string;
  password: string;
}

// 로그인 응답 구조
export interface LoginResponse {
  id: number;
  loginId: string;
  name: string;
  email: string;
  tell: string;
  roleFlag: string;
  roleName: string;
}

// 농장 정보
export interface Farm {
  id: number;
  memberId: number;
  name: string;
  uuid: string;
  useDate: string;
  cropName: string;
  address: string;
  status: string;
  member : LoginResponse;
}

// 센서 정보
// export interface FarmUuid {
//   id: number;
//   memberId: number;
//   name: string;
//   farmUuid: string;
//   useDate: string;
//   cropName: string;
//   address: string;
//   status: string;
//   member : LoginResponse;
// }

const memberApi = {
  // 로그인 요청
  login: function (loginData: LoginData) {
    return axiosInstance.post("/app/login", loginData,);
  },

  // 로그아웃
  logout: function() {
    return axiosInstance.delete("/member/refresh");
  },

  // 농장 목록 조회
  getFarms: function () {
    return axiosInstance.get("/member/farms");
  },
  // 농장 상세 조회
  getFarmDetail : function (farmId: number){
    return axiosInstance.get(`/member/farms/${farmId}`);
  }
};

export default memberApi;
