import NcfSubscriber from "../websocket/ncf_subscriber";
import { webSocketPaths } from "../websocket/wobsocket_paths";

const sockets = {};
const settingsSubscribers = {};
const statusSubscribers = {};

function _readySmartFarmSubscriber(farmUuid) {
  if (sockets[farmUuid]) {
    return;
  }

  const subscriber = new NcfSubscriber(webSocketPaths.production, farmUuid);

  subscriber.onOpen = e => {
    subscriber.subscribe();
    _requestCurrentSettings(subscriber);
    _requestCurrentStatus(subscriber);
  }

  subscriber.onJson = frame => {
    const data = JSON.parse(frame.body)
    switch (data['method']) {
      case 'current-settings':
        settingsSubscribers[farmUuid]?.forEach(cb => {
          try {
            cb(data['settings']);
          }
          catch (err) {
            console.error(err);
          }
        });
        break;
      case 'current-status':
        statusSubscribers[farmUuid]?.forEach(cb => {
          try {
            cb(data['status']);
          }
          catch (err) {
            console.error(err);
          }
        })
        break;
      default:
        break;
    }
  }

  subscriber.connect();
  sockets[farmUuid] = subscriber;
}

function _subscribe(farmUuid, subscribers, callback) {
  _readySmartFarmSubscriber(farmUuid);
  if (!subscribers[farmUuid]) {
    subscribers[farmUuid] = []
  }
  subscribers[farmUuid].push(callback);
}

function _unsubscribe(farmUuid, subscribers, callback) {
  const index = subscribers[farmUuid]?.indexOf(callback);
  if (index == undefined || index == -1) {
    return;
  }
  subscribers[farmUuid].splice(index, 1);
  if (subscribers[farmUuid].length == 0) {
    delete subscribers[farmUuid];
  }
  _closeSubscriberIfEmpty(farmUuid);
}

function _requestCurrentSettings(socket) {
  socket?.sendJson({'method': 'get-settings'});
}

function _requestCurrentStatus(socket) {
  socket?.sendJson({'method': 'get-status'});
}

function subscribeFarmSettings(farmUuid, callback) {
  _subscribe(farmUuid, settingsSubscribers, callback);
  _requestCurrentSettings(sockets[farmUuid]);
  return [() => _unsubscribe(farmUuid, settingsSubscribers, callback), newSettings => _sendUpdateSettings(farmUuid, newSettings)];
}

function subscribeFarmStatus(farmUuid, callback) {
  _subscribe(farmUuid, statusSubscribers, callback);
  _requestCurrentStatus(sockets[farmUuid]);
  return () => _unsubscribe(farmUuid, statusSubscribers, callback);
}

function _closeSubscriberIfEmpty(farmUuid) {
  const settingsSubscriberLength = settingsSubscribers[farmUuid]?.length;
  const statusSubscriberLength = statusSubscribers[farmUuid]?.length;

  if (
    (settingsSubscriberLength == undefined || settingsSubscriberLength == 0)
    && (statusSubscriberLength == undefined || settingsSubscriberLength == 0)
  ) {
    if (sockets[farmUuid]) {
      sockets[farmUuid].unsubscribe();
      sockets[farmUuid].close();
      delete sockets[farmUuid];
    }
  }
}

function _sendUpdateSettings(farmUuid, newSettings) {
  sockets[farmUuid].sendJson({'method': 'update-settings', 'settings': newSettings});
}

export {
  subscribeFarmSettings,
  subscribeFarmStatus
}