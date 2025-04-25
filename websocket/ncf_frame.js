function NcfFrame(command, headers = {}, body = "") {
  this.command = command;
  headers['content-length'] = body.length;
  if (!headers['content-type']) headers['content-type'] = 'text'
  this.headers = headers;
  this.body = body;
}

NcfFrame.prototype.toString = function() {
  const rawHeaders = Object.entries(this.headers)
    .map(([key, value]) => `${key}:${value}`)
    .join('\n');
  return [this.command, rawHeaders, '', this.body].join('\n');
}

NcfFrame.parse = function(rawFrame = "") {
  const lines = rawFrame.split('\n');
  const command = lines[0].trim();
  
  let index = 1;
  const headers = {};

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

NcfFrame.createSubscribe = function(destination) {
  const headers = {
    'destination': destination
  };
  const requestFrame = new NcfFrame('SUBSCRIBE', headers, '');
  return requestFrame;
}

NcfFrame.createUnsubscribe = function(destination) {
  const headers = {
    'destination': destination
  };
  return new NcfFrame('UNSUBSCRIBE', headers, '');
}

NcfFrame.createSend = function(headers = {}, body = '') {
  return new NcfFrame('SEND', headers, body);
}

export default NcfFrame;