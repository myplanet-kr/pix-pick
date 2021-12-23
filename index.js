// const gm = require('gm')
// const axios = require('axios')

// const header = Buffer.from('474946383961', 'hex');
// const logicalScreenDescriptor = Buffer.from('01000100800100', 'hex');
// const imageDescriptor = Buffer.from('2c000000000100010000', 'hex');
// const imageData = Buffer.from('0202440100', 'hex');

// function pixelPick(target) {
//   return new Promise((resolve, reject) => {
//     gm(target)
//       .resize(250, 250)
//       .colors(1)
//       .toBuffer('RGB', function (err, buffer) {
//         if (err) return reject(err);
//           const gif = [
//               header,
//               logicalScreenDescriptor,
//               buffer.slice(0, 3),
//               Buffer.from([0, 0, 0]),
//               imageDescriptor,
//               imageData
//           ];
//           const minimized = `data:image/gif;base64,${Buffer.from(gif).toString('base64')}`;
//           return resolve(minimized);
//       });
//   })
// }

// function fetchedPixelPic(url) {
//   return axios.get(encodeURI(url), { responseType: 'stream' }).then(r => pixelPick(r.data));
// }

// fetchedPixelPic('https://d6j35gv9ux3qi.cloudfront.net/img/2019지혜진개인전수정_A52_1614608066518.jpg');

const handler = require('./handler');
handler.fetchedPixelPic({ queryStringParameters: { imgUrl: 'https://static.lookpin.co.kr/20211201111258-86c2/3c81d36637884619d10f10fdd372f8ab.jpg'}}).then(console.log)