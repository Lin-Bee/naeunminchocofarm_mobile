class NcfFrame {
  command: string;
  headers: {[key: string]: string};
  body: string;

  constructor(command: string, headers: {[key: string]: string} = {}, body = "") {
    this.command = command;
    headers['content-length'] = body.length.toString();
    if (!headers['content-type']) {
      headers['content-type'] = 'text';
    }
    this.headers = headers;
    this.body = body;
  }

  public toString(): string {
    const rawHeaders = Object.entries(this.headers)
      .map(([key, value]) => `${key}:${value}`)
      .join('\n');
    return [this.command, rawHeaders, '', this.body].join('\n');
  }

  public static parse(rawFrame: string) {
    const lines = rawFrame.split('\n');
    const command = lines[0].trim();

    let index = 1;
    const headers: {[key: string]: string} = {};

    while (index < lines.length) {
      const rawHeader = lines[index].trim();
      index += 1;

      if (rawHeader == "") {
        break;
      }

      const [key, value] = rawHeader.split(":");
      headers[key] = value;
    }

    let body = '';
    if (index < lines.length) {
      body = lines.slice(index).join('\n').trim();
    }

    return new NcfFrame(command, headers, body);
  }

  public static createSubscribe(destination: string) {
    const headers = {
      'destination': destination
    };
    return new NcfFrame('SUBSCRIBE', headers, '');
  }

  public static createUnsubscribe(destination: string) {
    const headers = {
      'destination': destination
    };
    return new NcfFrame('UNSUBSCRIBE', headers, '');
  }

  public static createSend(headers: {[key: string]: string} = {}, body: string = '') {
    return new NcfFrame('SEND', headers, body);
  }
}

export default NcfFrame;