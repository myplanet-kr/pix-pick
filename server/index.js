const http = require('http');
const url = require('url');
const handler = require('./../handler');

const requestListener = async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if ( req.method === 'OPTIONS' ) {
    res.writeHead(200);
    res.end();
    return;
  }
  const { imgUrl } = url.parse(req.url, true).query;
  const { body } = await handler.fetchedPixelPic({ queryStringParameters: { imgUrl }});
  res.writeHead(200);
  res.end(body);
}

const server = http.createServer(requestListener);
server.listen(8080); 
console.log('img server works');