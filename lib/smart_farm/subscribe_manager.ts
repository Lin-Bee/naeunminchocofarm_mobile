import { getAccessToken } from "~/redux/store";
import { websocketUrl } from "../app_config";
import { NcfSocketClient } from "../websocket/ncf_socket_client";

type SettingsCallback = (data: any) => void;
type StatusCallback = (data: any) => void;
type SettingsSubscribers = {[key: string]: SettingsCallback[]};
type StatusSubscribers = {[key: string]: StatusCallback[]}

const sockets: {[key: string]: NcfSocketClient} = {};
const settingsSubscribers: SettingsSubscribers = {};
const statusSubscribers: StatusSubscribers = {};

function _requestCurrentSettings(socket: NcfSocketClient, destination: string) {
  socket.sendJson(destination, {'method': 'get-settings'});
}

function _requestCurrentStatus(socket: NcfSocketClient, destination: string) {
  socket.sendJson(destination, {'method': 'get-status'});
}

function _readySmartFarmSubscriber(farmUuid: string) {
  if (!sockets[farmUuid]) {
    const socketClient = new NcfSocketClient(websocketUrl);
    socketClient.accessTokenProvider = async () => {
      return await getAccessToken();
    };

    socketClient.onHandshakeSuccess = (client, frame) => {
      socketClient.subscribe(farmUuid);
    };

    socketClient.onSubscribeSuccess = frame => {
      _requestCurrentSettings(socketClient, farmUuid);
      _requestCurrentStatus(socketClient, farmUuid);
    };

    socketClient.onJson = frame => {
      const data = JSON.parse(frame.body);
      switch (data['method']) {
        case 'current-settings':
          settingsSubscribers[farmUuid]?.forEach(cb => {
            cb(data['settings']);
          });
          break;
        case 'current-status':
          statusSubscribers[farmUuid]?.forEach(cb => {
            cb(data['status']);
          })
          break;
        default:
          break;
      }
    };

    sockets[farmUuid] = socketClient;
  }
  sockets[farmUuid].connect();
}

function _subscribe(farmUuid: string, subscribers: SettingsSubscribers | StatusSubscribers, callback: SettingsCallback | StatusCallback) {
  _readySmartFarmSubscriber(farmUuid);
  if (!subscribers[farmUuid]) {
    subscribers[farmUuid] = [];
  }
  subscribers[farmUuid].push(callback);
}

function _closeSubscriberIfEmpty(farmUuid: string) {
  const settingsSubscribersLength = settingsSubscribers[farmUuid]?.length;
  const statusSubscribersLength = statusSubscribers[farmUuid]?.length;

  if (
    (settingsSubscribersLength == undefined || settingsSubscribersLength == 0)
    && (statusSubscribersLength == undefined || settingsSubscribersLength == 0)
  ) {
    if (sockets[farmUuid]) {
      sockets[farmUuid].unsubscribe(farmUuid);
      sockets[farmUuid].close();
    }
  }
}

function _unsubscribe(farmUuid: string, subscribers: SettingsSubscribers | StatusSubscribers, callback: SettingsCallback | StatusCallback) {
  const index = subscribers[farmUuid]?.indexOf(callback);
  if (index == undefined || index == -1) {
    return;
  }
  subscribers[farmUuid].splice(index, 1);
  if (subscribers[farmUuid].length == 0) {
    delete subscribers[farmUuid];
    _closeSubscriberIfEmpty(farmUuid);
  }
}

function _sendUpdateSettings(farmUuid: string, newSettings: any) {
  sockets[farmUuid].sendJson(farmUuid, {'method': 'update-settings', 'settings': newSettings});
}

export function subscribeFarmSettings(farmUuid: string, callback: SettingsCallback): [() => void, (newSttings: any) => void] {
  if (farmUuid === '') {
    throw new TypeError('farmUuid cannot be empty');
  }
  _subscribe(farmUuid, settingsSubscribers, callback);
  _requestCurrentSettings(sockets[farmUuid], farmUuid);
  return [() => _unsubscribe(farmUuid, settingsSubscribers, callback), (newSettings: any) => _sendUpdateSettings(farmUuid, newSettings)];
}

export function subscribeFarmStatus(farmUuid: string, callback: StatusCallback) {
  if (farmUuid === '') {
    throw new TypeError('farmUuid cannot be empty');
  }
  _subscribe(farmUuid, statusSubscribers, callback);
  _requestCurrentStatus(sockets[farmUuid], farmUuid);
  return () => _unsubscribe(farmUuid, statusSubscribers, callback);
}