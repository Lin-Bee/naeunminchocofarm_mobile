import { websocketUrl } from "../app_config";
import NcfSubscriber from "../websocket/ncf_subscriber";

type SettingsCallback = (data: any) => void;
type StatusCallback = (data: any) => void;
type SettingsSubscribers = {[key: string]: SettingsCallback[]};
type StatusSubscribers = {[key: string]: StatusCallback[]}

const sockets: {[key: string]: NcfSubscriber} = {};
const settingsSubscribers: SettingsSubscribers = {};
const statusSubscribers: StatusSubscribers = {};

function _requestCurrentSettings(socket: NcfSubscriber) {
  socket.sendJson({'method': 'get-settings'});
}

function _requestCurrentStatus(socket: NcfSubscriber) {
  socket.sendJson({'method': 'get-status'});
}

function _readySmartFarmSubscriber(farmUuid: string) {
  if (sockets[farmUuid]) {
    return;
  }

  const subscriber = new NcfSubscriber(websocketUrl, farmUuid);
  subscriber.onOpen = e => {
    subscriber.subscribe();
    _requestCurrentSettings(subscriber);
    _requestCurrentStatus(subscriber);
  }

  subscriber.onJson = frame => {
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
  }

  subscriber.connect();
  sockets[farmUuid] = subscriber;
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
      sockets[farmUuid].unsubscribe();
      sockets[farmUuid].close();
      delete sockets[farmUuid];
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
  sockets[farmUuid].sendJson({'method': 'update-settings', 'settings': newSettings});
}

export function subscribeFarmSettings(farmUuid: string, callback: SettingsCallback): [() => void, (newSttings: any) => void] {
  _subscribe(farmUuid, settingsSubscribers, callback);
  _requestCurrentSettings(sockets[farmUuid]);
  return [() => _unsubscribe(farmUuid, settingsSubscribers, callback), (newSettings: any) => _sendUpdateSettings(farmUuid, newSettings)];
}

export function subscribeFarmStatus(farmUuid: string, callback: StatusCallback) {
  _subscribe(farmUuid, statusSubscribers, callback);
  _requestCurrentStatus(sockets[farmUuid]);
  return () => _unsubscribe(farmUuid, statusSubscribers, callback);
}