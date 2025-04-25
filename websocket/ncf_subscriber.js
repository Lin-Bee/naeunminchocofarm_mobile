import NcfFrame from "./ncf_frame";

const MAX_RECONNECT_DELAY = 30000;
const MIN_RECONNECT_DELAY = 1000;

function NcfSubscriber(webSocketPath, destination) {
  this.webSocketPath = webSocketPath;
  this.destination = destination;
  this.socket = undefined;
  this.onOpen = _ => {};
  this.onMessage = _ => {};
  this.onJson = _ => {};
  this.onSubscribeFaild = _ => {};
  this.onSubscribeSuccess = _ => {};
  this.onClose = _ => {};
  this.onError = _ => {};
  this.reconnectDelay = MIN_RECONNECT_DELAY;
}

function _send(socket, message) {
  if (socket && socket.readyState == WebSocket.OPEN) {
    socket.send(message);
  }
}

NcfSubscriber.prototype.connect = function() {
  console.log('trying connect websocket');

  this.socket = new WebSocket(this.webSocketPath);
  this.socket.onopen = e => {
    console.log('websocket is opened');
    this.onOpen(e);
    this.reconnectDelay = MIN_RECONNECT_DELAY;
  };
  this.socket.onmessage = e => {
    const frame = NcfFrame.parse(e.data);

    switch (frame.command) {
      case 'MESSAGE':
        switch (frame.headers['content-type']) {
          case 'text':
            this.onMessage(frame);
            break;
          case 'json':
            this.onJson(frame);
            break;
          default:
            break;
        }
        this.onMessage(frame);
        break;
      case 'SUBSCRIBE_SUCCESS':
        this.onSubscribeSuccess(frame);
        break;
      case 'SUBSCRIBE_FAILD':
        this.onSubscribeFaild(frame);
        break;
      default:
        break;
    };
  };
  this.socket.onerror = e => {
    this.onError(e);
  };
  this.socket.onclose = e => {
    console.log('websocket is closed')
    this.onClose(e);
    console.log(`reconnect after ${this.reconnectDelay / 1000} seconds...`)
    setTimeout(() => {
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, MAX_RECONNECT_DELAY);
      this.connect();
    }, this.reconnectDelay);
  }
}

NcfSubscriber.prototype.subscribe = function() {
  _send(this.socket, NcfFrame.createSubscribe(this.destination).toString());
}

NcfSubscriber.prototype.unsubscribe = function() {
  _send(this.socket, NcfFrame.createUnsubscribe(this.destination).toString());
}

NcfSubscriber.prototype.send = function(message = '', headers = {}) {
  headers['destination'] = this.destination;
  _send(this.socket, NcfFrame.createSend(headers, message).toString());
}

NcfSubscriber.prototype.sendJson = function(dict = {}, headers = {}) {
  headers['destination'] = this.destination;
  headers['content-type'] = 'json';
  _send(this.socket, NcfFrame.createSend(headers, JSON.stringify(dict)).toString());
}

NcfSubscriber.prototype.close = function() {
  if (this.socket && this.socket.readyState === WebSocket.OPEN) {
    this.unsubscribe();
    this.socket.close();
  }
}

NcfSubscriber.prototype.getReadyState = function() {
  return this.socket.readyState;
}

export default NcfSubscriber;