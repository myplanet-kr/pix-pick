const http = require('http');
const url = require('url');
const handler = require('./../handler');

const requestListener = async function (req, res) {
  const { imgUrl } = url.parse(req.url, true).query;
  const { body } = await handler.fetchedPixelPic({ queryStringParameters: { imgUrl }});
  res.writeHead(200);
  res.end(body);
}

const server = http.createServer(requestListener);
server.listen(8080);