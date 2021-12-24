const http = require('http');
const url = require('url');
const handler = require('./../handler');


const requestListener = async function (req, res) {
  const { imgUrl } = url.parse(req.url, true).query;
  const r =  await handler.fetchedPixelPicForServer(imgUrl);
  res.writeHead(200);
  res.end(JSON.stringify({ test: 'hello' }));
}

const server = http.createServer(requestListener);
server.listen(8080);