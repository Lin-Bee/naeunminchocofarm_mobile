import NcfFrame from "./ncf_frame";

const MAX_RECONNECT_DELAY = 30000;
const MIN_RECONNECT_DELAY = 1000;

function _send(socket: WebSocket, message: string) {
  if (socket && socket.readyState == WebSocket.OPEN) {
    socket.send(message);
  }
}

class NcfSubscriber {
  webSocketPath: string;
  destination: string;
  socket?: WebSocket;
  onOpen: (e:Event) => void;
  onMessage: (f: NcfFrame) => void;
  onJson: (f: NcfFrame) => void;
  onSubscribeFaild: (f: NcfFrame) => void;
  onSubscribeSuccess: (f: NcfFrame) => void;
  onError: (e: Event) => void;
  onClose: (e: Event) => void;
  reconnectDelay: number;

  constructor(webSocketPath: string, destination: string) {
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

  public connect() {
    console.log('trying connect websocket');

    this.socket = new WebSocket(this.webSocketPath);
    this.socket.onopen = e => {
      console.log('websocket is opened');
      this.onOpen(e);
      this.reconnectDelay = MIN_RECONNECT_DELAY;
    };
    this.socket.onmessage = e => {
      const frame = NcfFrame.parse(e.data);
      switch(frame.command) {
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
          break;
        case 'SUBSCRIBE_SUCCESS':
          this.onSubscribeSuccess(frame);
          break;
        case 'SUBSCRIBE_FAILD':
          this.onSubscribeFaild(frame);
          break;
        default:
          break;
      }
    };
    this.socket.onerror = e => {
      this.onError(e);
    };
    this.socket.onclose = e => {
      console.log('websocket is closed');
      this.onClose(e);
      console.log(`reconnect after ${this.reconnectDelay / 1000} seconds...`)
      setTimeout(() => {
        this.reconnectDelay = Math.min(this.reconnectDelay * 2, MAX_RECONNECT_DELAY);
        this.connect();
      }, this.reconnectDelay);
    }
  }

  public subscribe() {
    if (!this.socket) {
      return;
    }
    _send(this.socket, NcfFrame.createSubscribe(this.destination).toString());
  }

  public unsubscribe() {
    if (!this.socket) {
      return;
    }
    _send(this.socket, NcfFrame.createUnsubscribe(this.destination).toString());
  }

  public send(message: string, headers: {[key: string]: string} = {}) {
    if (!this.socket) return;

    headers['destination'] = this.destination;
    _send(this.socket, NcfFrame.createSend(headers, message).toString());
  }

  public sendJson(dict: {[key: string]: any} = {}, headers: {[key: string]: any} = {}) {
    if (!this.socket) return;
    headers['destination'] = this.destination;
    headers['content-type'] = 'json';
    _send(this.socket, NcfFrame.createSend(headers, JSON.stringify(dict)).toString());
  }

  public close() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.unsubscribe();
      this.socket?.close();
    }
  }

  public getReadyState() {
    return this.socket?.readyState;
  }
}

export default NcfSubscriber;