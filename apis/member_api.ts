import axios from "axios";
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
// 프로필 이미지 정보
export interface MemberImgDTO {
  imgId?: number;
  memberId?: number;
  originFileName: string;
  attachedFileName: string;
}

const memberApi = {
  // 로그인 요청
  login: function (loginData: LoginData) {
    return axiosInstance.post("/app/login", loginData,);
  },

  // 로그아웃
  logout() {
    return axiosInstance.delete("/member/refresh");
  },

  // 농장 목록 조회
  getFarms() {
    return axiosInstance.get("/member/farms");
  },

  // 농장 상세 조회
  getFarmDetail(farmId: number) {
    return axiosInstance.get(`/member/farms/${farmId}`);
  },

  // 프로필 이미지 조회 (204/404 처리)
  getProfileImg: async function (): Promise<MemberImgDTO | null> {
    try {
      const res = await axiosInstance.get<MemberImgDTO>("/member/profile-img");
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 204 || status === 404) {
          return null;
        }
      }
      throw error;
    }
  },

  // 프로필 이미지 등록
  insertProfileImg(data: Omit<MemberImgDTO, "imgId" | "memberId">) {
    return axiosInstance.post("/member/profile-img", data);
  },

  // 프로필 이미지 수정
  updateProfileImg(data: MemberImgDTO) {
    return axiosInstance.put("/member/profile-img", data);
  },

  // 프로필 이미지 삭제
  deleteProfileImg() {
    return axiosInstance.delete("/member/profile-img");
  },

  // 프로필 이미지 업로드 (MultipartFile)
  uploadProfileImg(file: {
    uri: string;
    name: string;
    type: string;
  }) {
    const formData = new FormData();
    formData.append("file", file as any);

    return axiosInstance.post("/member/profile-img/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default memberApi;
