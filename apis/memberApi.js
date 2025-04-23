import axios from "axios";
import { Platform } from "react-native";
const baseUrl =
  Platform.OS === "IOS" ? "http://localhost:8081" : "http://10.0.2.2:8081";

export const api_login = (loginData) => {
  const response = axios.post(`${baseUrl}/members/login`, loginData);
  console.log(loginData);

  return response;
};
