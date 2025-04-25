const webSocketPaths = {
  production: "ws://192.168.30.128:8080/ws",
  local: "ws://localhost:8081/ws",
  dev: "ws://192.168.30.128:8081/ws",
  eun: "ws://192.168.30.78:8081/ws",
};

const subscribePaths = {
  motionDetecting: "motion-detecting",
  awning: "awning",
  heatLamp: "heat-lamp",
  testUserFarmUuid: "0bbd8aa9-02af-4dc6-af0e-c1c5aaa45790"
};

export { webSocketPaths, subscribePaths };
