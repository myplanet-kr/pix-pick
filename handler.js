'use strict';

const gm = require('gm')
const { exec } = require('child_process');
const axios = require('axios')
const header = Buffer.from('474946383961', 'hex');
const logicalScreenDescriptor = Buffer.from('01000100800100', 'hex');
const imageDescriptor = Buffer.from('2c000000000100010000', 'hex');
const imageData = Buffer.from('0202440100', 'hex');

module.exports.fetchedPixelPicForServer = fetchedPixelPic;
module.exports.fetchedPixelPic = async (event) => {
  const { queryStringParameters } = event;
  const imgUrl = queryStringParameters.imgUrl;

  if (!imgUrl) {
    const err = new CustomError();
    return {
      statusCode: err.statusCode,
      meesage: err.message
    };
  }
  try {
    const miniMadenImage = await fetchedPixelPic(imgUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'success',
          image: {
            origin: imgUrl,
            minimized: miniMadenImage
          }
        },
        null,
        2
      ),
    };
  } catch(e) {
    return {
      statusCode: 401,
      body: { message: JSON.stringify(e) }
    }
  }
};

function pixelPick(target) {
  return new Promise((resolve) => {
    gm(target)
      .resize(250, 250)
      .colors(1)
      .toBuffer(function (err, buffer) {
        console.error(err);
        console.log('buff ', buffer);
        if (err) throw err;
          const gif = [
              header,
              logicalScreenDescriptor,
              buffer.slice(0, 3),
              Buffer.from([0, 0, 0]),
              imageDescriptor,
              imageData
          ];
          const minimized = `data:image/gif;base64,${Buffer.concat(gif).toString('base64')}`;
          return resolve(minimized);
      });
  })
}

async function fetchedPixelPic(url) {
  return axios.get(encodeURI(url), { responseType: 'stream' }).then(r => pixelPick(r.data));
}

class CustomError {
  statusCode = 403;
  message = 'param error';

  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}