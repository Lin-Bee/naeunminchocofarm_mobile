import axios from "axios";
import { Platform } from "react-native";
const baseUrl =
  Platform.OS === "IOS" ? "http://localhost:8081" : "http://10.0.2.2:8081";

  const memberApi = {
    getFarms: function () {
      return axios.get(`${baseUrl}/member/farms`);
    },
    getFarmDetail: function(farmId) {
      return axios.get(`${baseUrl}/member/farms/${farmId}`)
    }
  };
  export default memberApi;