import NcfFrame from './ncf_frame';

const MAX_RECONNECT_DELAY = 30000;
const MIN_RECONNECT_DELAY = 1000;

export class NcfSocketClient {
  webSocketUrl: string;
  accessTokenProvider: (() => string) | (() => Promise<string>);
  socket?: WebSocket;
  reconnectDelay: number;
  onOpen: (e: Event) => void;
  onHandshakeSuccess: (client: NcfSocketClient, frame: NcfFrame) => void;
  onHandshakeFailed: (frame: NcfFrame) => void;
  isExit: boolean;
  destinations: string[];
  onText: (frame: NcfFrame) => void;
  onJson: (frame: NcfFrame) => void;
  onSubscribeSuccess: (frame: NcfFrame) => void;
  onSubscribeFailed: (frame: NcfFrame) => void;
  onError: (e: Event) => void;
  onClose: (e: Event) => void;

  constructor(webSocketUrl: string) {
    this.webSocketUrl = webSocketUrl;
    this.accessTokenProvider = () => '';
    this.socket = undefined;
    this.reconnectDelay = MIN_RECONNECT_DELAY;
    this.onOpen = (e) => {};
    this.onHandshakeSuccess = (client, frame) => {};
    this.onHandshakeFailed = (frame) => {};
    this.isExit = false;
    this.destinations = [];
    this.onText = (frame) => {};
    this.onJson = (frame) => {};
    this.onSubscribeSuccess = (frame) => {};
    this.onSubscribeFailed = (frame) => {};
    this.onError = (e) => {};
    this.onClose = (e) => {};
  }

  public sendFrame(frame: NcfFrame) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(frame.toString());
    }
  }

  private handshake() {
    (async () => {
      const accessToken = await Promise.resolve(this.accessTokenProvider());
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const frame = new NcfFrame('AUTHENTICATE', headers, '');
      this.sendFrame(frame);
    })();
  }

  public unsubscribe(destination: string) {
    this.sendFrame(NcfFrame.createUnsubscribe(destination));
  }

  public close() {
    this.isExit = true;
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.destinations.forEach((x) => this.unsubscribe(x));
      this.destinations = [];
      this.socket.close();
      this.socket = undefined;
    }
  }

  public connect() {
    console.log('trying connect websocket');
    this.destinations = [];
    this.socket = new WebSocket(this.webSocketUrl);
    this.socket.onopen = (e) => {
      this.reconnectDelay = MIN_RECONNECT_DELAY;
      console.log('websocket is opened');
      this.onOpen(e);
      this.handshake();
    };

    this.socket.onmessage = (e) => {
      const frame = NcfFrame.parse(e.data);
      switch (frame.command) {
        case 'AUTH_SUCCESS':
          console.log('handshake success');
          this.onHandshakeSuccess(this, frame);
          break;
        case 'AUTH_FAIL':
          this.close();
          console.log('handshake failed');
          this.onHandshakeFailed(frame);
          break;
        case 'MESSAGE':
          switch (frame.headers['content-type']) {
            case 'text':
              this.onText(frame);
              break;
            case 'json':
              this.onJson(frame);
              break;
            default:
              break;
          }
          break;
        case 'SUBSCRIBE_SUCCESS':
          this.destinations.push(frame.headers['destination']);
          this.onSubscribeSuccess(frame);
          break;
        case 'SUBSCRIBE_FAILED':
          this.onSubscribeFailed(frame);
          break;
        default:
          break;
      }
    };

    this.socket.onerror = this.onError;
    this.socket.onclose = (e) => {
      console.log('websocket is closed');
      this.onClose(e);
      if (this.isExit) {
        return;
      }
      console.log(`reconnect after ${this.reconnectDelay / 1000} seconds...`);
      setTimeout(() => {
        this.reconnectDelay = Math.min(this.reconnectDelay * 2, MAX_RECONNECT_DELAY);
        this.connect();
      }, this.reconnectDelay);
    };

    this.isExit = false;
  }

  public subscribe(destination: string) {
    (async () => {
      const accessToken = await Promise.resolve(this.accessTokenProvider());
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        destination: destination,
      };
      const frame = new NcfFrame('SUBSCRIBE', headers, '');
      this.sendFrame(frame);
    })();
  }

  public sendText(destination: string, text: string) {
    const headers = {
      destination: destination,
      'content-type': 'text',
    };
    this.sendFrame(NcfFrame.createSend(headers, text));
  }

  public sendJson(destination: string, dict: { [key: string]: string }) {
    const headers = {
      destination: destination,
      'content-type': 'json',
    };
    this.sendFrame(NcfFrame.createSend(headers, JSON.stringify(dict)));
  }

  public getReadyState() {
    return this.socket?.readyState ?? WebSocket.CLOSED;
  }
}
